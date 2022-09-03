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

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner_id: AccountId,
    token: FungibleToken,
    token_metadata: LazyOption<FungibleTokenMetadata>,
    token_price: U128,
    main_contract_id: AccountId
}

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    AprWithingDateRanges,
    AccountsTrackingData,
}

const DATA_IMAGE_BNRX_LOGO: &str = "data:image/svg+xml;charset=UTF-8,%3csvg width='231' height='393' viewBox='0 0 231 393' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M166.667 242.412L83.3333 317.544L0 392.698V242.412V92.1055L83.3333 167.259L166.667 242.412Z' fill='url(%23paint0_linear_3_62)'/%3e%3cpath d='M63.5962 150.307L146.93 75.1535L230.263 0V150.307V300.592L146.93 225.439L63.5962 150.307Z' fill='url(%23paint1_linear_3_62)'/%3e%3cdefs%3e%3clinearGradient id='paint0_linear_3_62' x1='0' y1='242.412' x2='166.667' y2='242.412' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2300FFEE'/%3e%3cstop offset='0.01' stop-color='%2300FCED'/%3e%3cstop offset='0.26' stop-color='%2300C3CE'/%3e%3cstop offset='0.5' stop-color='%230096B6'/%3e%3cstop offset='0.71' stop-color='%230076A5'/%3e%3cstop offset='0.88' stop-color='%2300629B'/%3e%3cstop offset='1' stop-color='%23005B97'/%3e%3c/linearGradient%3e%3clinearGradient id='paint1_linear_3_62' x1='63.5962' y1='150.307' x2='230.263' y2='150.307' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%2300FFEE'/%3e%3cstop offset='1' stop-color='%23005B97'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e ";

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new_default_meta(
        owner_id: AccountId,
        token_total_supply: U128,
        token_price: U128,
        main_contract_id: AccountId
    ) -> Self {
        Self::new(
            owner_id,
            main_contract_id,
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
        )
    }

    #[init]
    pub fn new(
        owner_id: AccountId,
        main_contract_id: AccountId,
        token_total_supply: U128,
        token_price: U128,
        token_metadata: FungibleTokenMetadata,
    ) -> Self {
        assert!(!env::state_exists(), "Already initialized");

        let mut this = Self {
            owner_id: owner_id.clone(),
            main_contract_id,
            token: FungibleToken::new(b"a".to_vec()),
            token_metadata: LazyOption::new(b"m".to_vec(), Some(&token_metadata)),
            token_price,
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

    pub fn set_main_contract_id(&mut self, main_contract_id: AccountId) {
        self.main_contract_id = main_contract_id;
    }

    pub fn get_main_contract_id(&self) -> &AccountId {
        &self.main_contract_id
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

                self.token.internal_transfer(&self.owner_id, &sender_id, asset_token_mount, None);
                main_contract::ext(self.main_contract_id.clone())
                    .with_static_gas(Gas(10*TGAS))
                    .add_asset_investor(sender_id, env::current_account_id(), U128::from(asset_token_mount));
            }
            _ => (),
        }

        String::from("0")
    }

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
