use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, Vector};
use near_sdk::json_types::U128;
use near_sdk::{assert_self, env, log, near_bindgen, AccountId, Balance, PanicOnDefault, PromiseOrValue, PromiseResult, Timestamp, Gas, BorshStorageKey};
use std::convert::{From, TryFrom};
use near_sdk::serde::{Serialize, Deserialize};

use near_contract_standards::fungible_token::metadata::{FungibleTokenMetadata, FungibleTokenMetadataProvider, FT_METADATA_SPEC};
use near_contract_standards::fungible_token::FungibleToken;
use near_sdk::collections::LazyOption;
use near_sdk::env::block_timestamp;

pub mod external;
pub use crate::external::*;

// #[near_bindgen]
// #[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
// #[serde(crate = "near_sdk::serde")]
// pub struct Asset {
//     name: String,
//     address: String,
// }

// type DateFrom = Timestamp;
// type DateTo = Timestamp;
//
// type APR = u32;
// type AprWithingDateRange = (DateFrom, DateTo, APR);
//
// type TokenAmount = u32;
// type TokenAmountWithingDateRange = (DateFrom, DateTo, TokenAmount);
//
// #[near_bindgen]
// #[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
// pub struct AccountTrackingData {
//     accumulated_revenue: u128,
//     accumulated_revenue_last_updated: Timestamp,
//     token_amount_withing_date_ranges: Vector<TokenAmountWithingDateRange>
// }

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner_id: AccountId,
    token: FungibleToken,
    token_metadata: LazyOption<FungibleTokenMetadata>,
    token_price: U128,
    // asset: Asset,
    // apr_within_date_ranges: Vector<AprWithingDateRange>,
    // accounts_tracking_data: LookupMap<AccountId, AccountTrackingData>,

}

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    AprWithingDateRanges,
    AccountsTrackingData,
}

// const DATA_IMAGE_SVG_NEAR_ICON: &str = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E";
const DATA_IMAGE_BNRX_LOGO: &str = "data:image/svg+xml;charset=UTF-8,%3csvg width='231' height='393' viewBox='0 0 231 393' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M166.667 242.412L83.3333 317.544L0 392.698V242.412V92.1055L83.3333 167.259L166.667 242.412Z' fill='url(%23paint0_linear_3_62)'/%3e%3cpath d='M63.5962 150.307L146.93 75.1535L230.263 0V150.307V300.592L146.93 225.439L63.5962 150.307Z' fill='url(%23paint1_linear_3_62)'/%3e%3cdefs%3e%3clinearGradient id='paint0_linear_3_62' x1='0' y1='242.412' x2='166.667' y2='242.412' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2300FFEE'/%3e%3cstop offset='0.01' stop-color='%2300FCED'/%3e%3cstop offset='0.26' stop-color='%2300C3CE'/%3e%3cstop offset='0.5' stop-color='%230096B6'/%3e%3cstop offset='0.71' stop-color='%230076A5'/%3e%3cstop offset='0.88' stop-color='%2300629B'/%3e%3cstop offset='1' stop-color='%23005B97'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_3_62' x1='63.5962' y1='150.307' x2='230.263' y2='150.307' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2300FFEE'/%3e%3cstop offset='1' stop-color='%23005B97'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e ";

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new_default_meta(
        owner_id: AccountId,
        token_total_supply: U128,
        token_price: U128,
        // asset: Asset,
    ) -> Self {
        Self::new(
            owner_id,
            token_total_supply,
            token_price,
            FungibleTokenMetadata {
                spec: FT_METADATA_SPEC.to_string(),
                name: "Villa Yapi".to_string(),
                symbol: "BNRXa1".to_string(),
                icon: Some(DATA_IMAGE_BNRX_LOGO.to_string()),
                reference: None,
                reference_hash: None,
                decimals: 0,
            },
            // asset,
        )
    }

    #[init]
    pub fn new(
        owner_id: AccountId,
        token_total_supply: U128,
        token_price: U128,
        token_metadata: FungibleTokenMetadata,
        // asset: Asset,
    ) -> Self {
        assert!(!env::state_exists(), "Already initialized");

        // let apr_within_date_ranges: Vector<AprWithingDateRange> = Vector::new(StorageKeys::AprWithingDateRanges);

        let mut this = Self {
            owner_id: owner_id.clone(),
            token: FungibleToken::new(b"a".to_vec()),
            token_metadata: LazyOption::new(b"m".to_vec(), Some(&token_metadata)),
            token_price,
            // asset,
            // apr_within_date_ranges,
            // accounts_tracking_data: LookupMap::new(StorageKeys::AccountsTrackingData)
        };

        this.token.internal_register_account(&owner_id);
        this.token
            .internal_deposit(&owner_id, token_total_supply.into());
        near_contract_standards::fungible_token::events::FtMint {
            owner_id: &owner_id,
            amount: &token_total_supply,
            memo: Some("Initial tokens supply is minted"),
        }
            .emit();
        this
    }

    // pub fn update_state(&mut self) {
    //     let apr_within_date_ranges: Vector<AprWithingDateRange> = Vector::new(StorageKeys::AprWithingDateRanges);
    //     self.apr_within_date_ranges = apr_within_date_ranges;
    //     self.accounts_tracking_data = LookupMap::new(StorageKeys::AccountsTrackingData);
    // }

    pub fn update_metadata(&mut self) {
        let token_metadata = FungibleTokenMetadata {
            spec: FT_METADATA_SPEC.to_string(),
            name: "Villa Yapi".to_string(),
            symbol: "BNRXa1".to_string(),
            icon: Some(DATA_IMAGE_BNRX_LOGO.to_string()),
            reference: None,
            reference_hash: None,
            decimals: 0,
        };
        self.token_metadata = LazyOption::new(b"m".to_vec(), Some(&token_metadata));
    }

    pub fn set_token_price(&mut self, token_price: U128) {
        assert_self();
        self.token_price = token_price;
    }

    pub fn token_price(&self) -> U128 {
        self.token_price
    }

    #[private]
    pub fn buy_asset_tokens(&mut self, receiver_id: AccountId, amount: U128) {
        // self.register_account(receiver_id.clone());
        self.ft_transfer(receiver_id, amount, None);
    }

    pub fn ft_on_transfer(&mut self, sender_id: AccountId, amount: String, msg: String) -> String {
        match msg.as_str() {
            "buy_asset_tokens" => {
                assert_eq!(env::predecessor_account_id(), AccountId::try_from("usdn.testnet".to_string()).unwrap(), "Accepting only USN token");
                if self.token.accounts.get(&sender_id).is_none() {
                    self.token.internal_register_account(&sender_id);
                };
                let amount = match amount.parse::<u128>() {
                    Ok(i) => i,
                    Err(_e) => {
                        log!("Error parsing amount {}", amount);
                        0
                    }
                };
                let token_price: u128 = self.token_price().into();
                let token_price = token_price / 1_000_000_000_000_000_000;
                let amount_usd = amount / 1_000_000_000_000_000_000;
                let asset_token_mount = amount_usd / token_price;
                log!(
                    "Buy asset tokens! amount_usd: {}, asset_token_amount: {}, token_price: {}",
                    amount_usd,
                    asset_token_mount,
                    token_price
                );

                self.token.internal_transfer(&env::current_account_id(), &sender_id, asset_token_mount, None);
                let main_contract_id = AccountId::try_from("main.fundament_creator.testnet".to_string()).unwrap();
                main_contract::ext(main_contract_id)
                    .with_static_gas(Gas(10*TGAS))
                    .add_asset_owner(sender_id, env::current_account_id());
            }
            _ => (),
        }

        String::from("0")
    }

    // pub fn add_apr_within_date_range(&mut self, time_from: Timestamp, time_to: Timestamp, apr: APR) {
    //     assert_self();
    //     self.apr_within_date_ranges.push(&(time_from, time_to, apr));
    // }
    //
    // pub fn get_apr_by_timestamp(&self, timestamp: Timestamp) -> APR {
    //     for (time_from, time_to, apr) in self.apr_within_date_ranges.iter() {
    //         if timestamp > time_from && timestamp < time_to {
    //             return apr;
    //         }
    //     }
    //     let zero: u32 = 0;
    //     APR::from(zero)
    // }

    // pub fn calculate_available_rewards(&self, account_id: AccountId) -> u128 {
    //     let current_timestamp = block_timestamp();
    //     let account_tracking_data = self.accounts_tracking_data.get(&account_id);
    //     if account_tracking_data.is_none() {
    //         return 0;
    //     }
    //
    //     let account_tracking_data = account_tracking_data.unwrap();
    //     let accumulated_revenue_last_updated = account_tracking_data.accumulated_revenue_last_updated;
    //     let apr = self.get_apr_by_timestamp(accumulated_revenue_last_updated);
    //     let tokens = self.ft_balance_of(account_id);
    //     let tokens_total_value = tokens.0 * self.token_price.0;
    //     let annual_revenue = tokens_total_value * u128::from(apr) / 100;
    //     let nanoseconds_in_year: u128 = 31536000 * 1_000_000_000;
    //     let timeframe_to_calculate: u128 = u128::from(current_timestamp) - u128::from(accumulated_revenue_last_updated);
    //     let timeframe_percentage = timeframe_to_calculate * 100 / nanoseconds_in_year;
    //     let timeframe_revenue = annual_revenue * timeframe_percentage / 100;
    //
    //     return account_tracking_data.accumulated_revenue + timeframe_revenue;
    // }

    #[private]
    pub fn callback_after_transfer(&mut self) -> bool {
        match env::promise_result(0) {
            PromiseResult::NotReady => {
                unreachable!()
            }
            PromiseResult::Successful(_) => {
                // log!("Investor added {}", &env::signer_account_id());
                // New account created and reward transferred successfully.
                true
            }
            PromiseResult::Failed => {
                // Weren't able to create the new account,
                //   reward money has been returned to this contract.
                false
            }
        }
    }

    fn on_account_closed(&mut self, account_id: AccountId, balance: Balance) {
        log!("Closed @{} with {}", account_id, balance);
    }

    fn on_tokens_burned(&mut self, account_id: AccountId, amount: Balance) {
        log!("Account @{} burned {}", account_id, amount);
    }
}

near_contract_standards::impl_fungible_token_core!(Contract, token, on_tokens_burned);
near_contract_standards::impl_fungible_token_storage!(Contract, token, on_account_closed);

#[near_bindgen]
impl FungibleTokenMetadataProvider for Contract {
    fn ft_metadata(&self) -> FungibleTokenMetadata {
        self.token_metadata.get().unwrap()
    }
}
