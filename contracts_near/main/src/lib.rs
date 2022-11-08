use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap, Vector};
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault, BorshStorageKey, require, log, Timestamp};
use near_sdk::env::block_timestamp;
use near_sdk::json_types::U128;
use near_sdk::serde::{Serialize, Deserialize};

pub mod external;

pub use crate::external::*;

type AssetAccountId = AccountId;

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    Assets,
    AssetInvestors,
    AccountsTrackingData,
    AccountInvestors { account_hash: Vec<u8> },
    AprWithinDateRanges { account_hash: Vec<u8> },
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub enum Status {
    Active,
    Inactive,
    Undefined,
}

type DateFrom = Timestamp;
type DateTo = Timestamp;

type APR = u128;
type AprWithingDateRange = (DateFrom, DateTo, APR);

type TokenAmount = u128;

type TokenPrice = u128;

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Asset {
    status: Status,
    token_price: TokenPrice,
    apr_within_date_ranges: Vector<AprWithingDateRange>,
}

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct AssetInvestorData {
    created: Timestamp,
    token_amount: TokenAmount,
    total_rent_earned: u128,
    total_rent_earned_last_updated: Timestamp,
    accumulated_revenue: u128,
    accumulated_revenue_last_updated: Timestamp,
}

#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct AccountTrackingData {
    accumulated_revenue: u128,
    accumulated_revenue_last_updated: Timestamp,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner_id: AccountId,
    assets: UnorderedMap<AssetAccountId, Asset>,
    assets_by_investor: LookupMap<AccountId, UnorderedMap<AssetAccountId, AssetInvestorData>>,
}

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new(
        owner_id: AccountId,
    ) -> Self {
        assert!(!env::state_exists(), "Already initialized");

        let this = Self {
            owner_id: owner_id.clone(),
            assets: UnorderedMap::new(StorageKeys::Assets),
            assets_by_investor: LookupMap::new(StorageKeys::AssetInvestors),
        };

        this
    }

    #[private]
    fn assert_owner(&self) {
        assert_eq!(env::signer_account_id(), self.owner_id, "Only owner is allowed to call the method");
    }

    pub fn add_asset(&mut self, asset_account_id: &AccountId, asset_status: Status, token_price: TokenPrice) {
        self.assert_owner();
        let account_hash = env::sha256(format!("{}{}", "apr", asset_account_id).as_bytes());
        let asset = Asset {
            status: asset_status,
            token_price,
            apr_within_date_ranges: Vector::new(StorageKeys::AprWithinDateRanges { account_hash }),
        };
        self.assets.insert(&asset_account_id, &asset);
    }

    pub fn add_asset_investor(&mut self, investor_account_id: &AccountId, asset_account_id: &AssetAccountId, token_amount: U128) {
        let current_timestamp =  block_timestamp();
        let mut account_assets_invested = self.assets_by_investor
            .get(&investor_account_id)
            .unwrap_or(UnorderedMap::new(
                StorageKeys::AccountInvestors { account_hash: env::sha256(investor_account_id.as_bytes()) }
            ));
        let mut asset_investor_data = account_assets_invested
            .get(asset_account_id)
            .unwrap_or(AssetInvestorData {
                created: current_timestamp,
                token_amount: 0,
                total_rent_earned: 0,
                total_rent_earned_last_updated: current_timestamp,
                accumulated_revenue: 0,
                accumulated_revenue_last_updated: current_timestamp,
            });

        let calculated_rewards = self.calculate_available_asset_rewards(investor_account_id, asset_account_id);
        asset_investor_data.token_amount += token_amount.0;
        asset_investor_data.total_rent_earned += calculated_rewards;
        asset_investor_data.accumulated_revenue += calculated_rewards;
        asset_investor_data.total_rent_earned_last_updated = current_timestamp;
        asset_investor_data.accumulated_revenue_last_updated = current_timestamp;
        account_assets_invested.insert(&asset_account_id, &asset_investor_data);
        self.assets_by_investor.insert(&investor_account_id, &account_assets_invested);
    }

    pub fn set_asset_status(&mut self, asset_id: &AssetAccountId, status: Status) {
        let asset = self.assets.get(&asset_id);
        require!(asset.is_some(), "Asset not found");
        let mut asset = asset.unwrap();
        asset.status = status;
        self.assets.insert(&asset_id, &asset);
    }

    pub fn get_asset_addresses(&self) -> Vec<AssetAccountId> {
        self.assets.keys_as_vector().to_vec()
    }

    pub fn get_asset_status(&self, asset_id: &AssetAccountId) -> Status {
        let asset = self.assets.get(&asset_id);
        require!(asset.is_some(), "Asset not found");
        let asset = asset.unwrap();

        asset.status
    }

    pub fn remove_asset_investor(&mut self, investor_account_id: &AccountId, asset_account_id: &AssetAccountId) {
        let account_assets = self.assets_by_investor.get(&investor_account_id);

        match account_assets {
            Some(mut assets) => {
                assets.remove(&asset_account_id);
                self.assets_by_investor.insert(&investor_account_id, &assets);
            }
            None => {}
        }
    }

    pub fn get_account_assets(&self, account_id: &AccountId) -> Vec<AssetAccountId> {
        let result = self.assets_by_investor.get(&account_id);

        match result {
            Some(assets) => {
                let values = assets.keys_as_vector();
                log!("Found asset investor {}, - len {}", account_id, values.len());
                values.to_vec()
            }
            None => {
                log!("Not found asset investor {}", account_id);
                vec![]
            }
        }
    }

    pub fn get_token_balance(&self, investor_account_id: &AccountId, asset_account_id: &AssetAccountId) -> TokenAmount {
        if let Some(assets_invested) = self.assets_by_investor.get(&investor_account_id) {
            if let Some(asset_investor_data) = assets_invested.get(&asset_account_id) {
                return asset_investor_data.token_amount;
            }
        }
        let zero: u32 = 0;
        TokenAmount::from(zero)
    }

    pub fn get_token_price(&self, asset_account_id: &AssetAccountId) -> TokenPrice {
        if let Some(asset) = self.assets.get(&asset_account_id) {
            return asset.token_price;
        }
        let zero: u128 = 0;
        return TokenPrice::from(zero);
    }

    pub fn add_apr_within_date_range(&mut self, asset_account_id: &AssetAccountId, time_from: Timestamp, time_to: Timestamp, apr: APR) {
        if let Some(mut asset) = self.assets.get(asset_account_id) {
            asset.apr_within_date_ranges.push(&(time_from, time_to, apr));
            self.assets.insert(&asset_account_id, &asset);
        } else {
            log!("Asset not found, cannot add APR");
        }
    }

    pub fn get_asset_aprs(&self, asset_account_id: &AssetAccountId) -> Vec<AprWithingDateRange> {
        let asset = self.assets.get(asset_account_id);
        if asset.is_none() {
            log!("Empty APRs");
            return vec![];
        }
        let asset = asset.unwrap();

        return asset.apr_within_date_ranges.to_vec();
    }

    pub fn get_apr_by_timestamp(&self, asset_account_id: &AssetAccountId, timestamp: &Timestamp) -> APR {
        let asset = self.assets.get(asset_account_id);
        if asset.is_none() {
            let zero: u32 = 0;
            return APR::from(zero);
        }
        let asset = asset.unwrap();
        for (time_from, time_to, apr) in asset.apr_within_date_ranges.iter() {
            if timestamp > &Timestamp::from(time_from) && timestamp < &Timestamp::from(time_to) {
                return apr;
            }
        }
        let zero: u32 = 0;
        APR::from(zero)
    }

    fn update_investor_accumulated_rewards(&mut self, investor_account_id: &AccountId, asset_account_ids: Vec<&AssetAccountId>) {
        let investor_assets = self.assets_by_investor.get(investor_account_id);
        if investor_assets.is_none() {
            return;
        }
        let current_timestamp = block_timestamp();
        let mut investor_assets = investor_assets.unwrap();

        asset_account_ids.iter().for_each(|asset_account_id| {
            if let Some(mut asset_investor_data) = investor_assets.get(asset_account_id) {
                let calculated_rewards = self.calculate_available_asset_rewards(investor_account_id, &asset_account_id);
                asset_investor_data.accumulated_revenue += calculated_rewards;
                asset_investor_data.total_rent_earned += calculated_rewards;
                asset_investor_data.accumulated_revenue_last_updated = current_timestamp;
                asset_investor_data.total_rent_earned_last_updated = current_timestamp;
                investor_assets.insert(&asset_account_id, &asset_investor_data);
            }
        });
        self.assets_by_investor.insert(investor_account_id, &investor_assets);
    }

    pub fn calculate_available_asset_rewards(&self, investor_account_id: &AccountId, asset_account_id: &AssetAccountId) -> u128 {
        let assets_investors_data = self.assets_by_investor.get(investor_account_id);
        if assets_investors_data.is_none() {
            return 0;
        }
        let assets_investors_data = assets_investors_data.unwrap();
        let asset_investor_data = assets_investors_data.get(asset_account_id);
        if asset_investor_data.is_none() {
            return 0;
        }
        let current_timestamp = block_timestamp();
        let asset_investor_data = asset_investor_data.unwrap();
        let accumulated_revenue_last_updated = asset_investor_data.accumulated_revenue_last_updated;
        let apr = self.get_apr_by_timestamp(asset_account_id, &current_timestamp);
        let tokens = self.get_token_balance(investor_account_id, asset_account_id);
        let token_price = self.get_token_price(asset_account_id);
        let tokens_total_value: u128 = (u128::from(tokens)) * u128::from(token_price);
        let annual_revenue = (tokens_total_value / 1_000_000_000_000_000_000) * u128::from(apr / 1_000_000_000_000_000_000) / 100;
        let nanoseconds_in_year: u128 = 31536000 * 1_000_000_000;
        let timeframe_to_calculate: u128 = u128::from(current_timestamp) - u128::from(accumulated_revenue_last_updated);
        let timeframe_percentage: u128 = timeframe_to_calculate * 100 * 1_000_000_000_000_000_000 / nanoseconds_in_year;
        let timeframe_revenue = annual_revenue * timeframe_percentage / 100;

        asset_investor_data.accumulated_revenue + timeframe_revenue
    }

    pub fn calculate_available_total_rewards(&self, investor_account_id: &AccountId) -> u128 {
        let asset_account_ids = self.get_account_assets(investor_account_id);
        let total_rewards = asset_account_ids.iter().map(|asset_id| {
            self.calculate_available_asset_rewards(investor_account_id, asset_id)
        }).reduce(|acc, item| acc + item);

        total_rewards.unwrap_or(0)
    }

    pub fn get_asset_total_rent_earned(&self, investor_account_id: &AccountId, asset_account_id: &AssetAccountId) -> u128 {
        let assets_investors_data = self.assets_by_investor.get(investor_account_id);
        if assets_investors_data.is_none() {
            return 0;
        }
        let assets_investors_data = assets_investors_data.unwrap();
        let asset_investor_data = assets_investors_data.get(asset_account_id);
        if asset_investor_data.is_none() {
            return 0;
        }
        let asset_investor_data = asset_investor_data.unwrap();
        let available_asset_rewards = self.calculate_available_asset_rewards(investor_account_id, asset_account_id);

        asset_investor_data.total_rent_earned + available_asset_rewards
    }

    pub fn get_total_rent_earned(&self, investor_account_id: &AccountId) -> u128 {
        let asset_account_ids = self.get_account_assets(investor_account_id);
        let total_rewards = asset_account_ids.iter().map(|asset_id| {
            self.get_asset_total_rent_earned(investor_account_id, asset_id)
        }).reduce(|acc, item| acc + item);

        total_rewards.unwrap_or(0)
    }

    pub fn get_total_assets_value(&self) -> u128 {

    }
}
