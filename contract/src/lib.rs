use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedSet;
use near_sdk::json_types::U128;
use near_sdk::{
    assert_self, env, ext_contract, log, near_bindgen, AccountId, Balance, PanicOnDefault, Promise,
    PromiseOrValue, PromiseResult,
};
use std::convert::{From, TryFrom};

use near_contract_standards::fungible_token::metadata::{FungibleTokenMetadata, FT_METADATA_SPEC};
use near_contract_standards::fungible_token::FungibleToken;
use near_sdk::collections::LazyOption;

const TOKEN_DEFAULT_PRICE: U128 = U128(50000000000000000000);

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner_id: AccountId,
    investors: UnorderedSet<AccountId>,
    token: FungibleToken,
    token_metadata: LazyOption<FungibleTokenMetadata>,
    token_price: U128,
}

const DATA_IMAGE_SVG_NEAR_ICON: &str = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E";

#[near_bindgen]
impl Contract {
    #[init]
    pub fn new_default_meta(
        owner_id: AccountId,
        token_total_supply: U128,
        token_price: U128,
    ) -> Self {
        Self::new(
            owner_id,
            token_total_supply,
            token_price,
            FungibleTokenMetadata {
                spec: FT_METADATA_SPEC.to_string(),
                name: "Asset fungible token".to_string(),
                symbol: "BNXA1".to_string(),
                icon: Some(DATA_IMAGE_SVG_NEAR_ICON.to_string()),
                reference: None,
                reference_hash: None,
                decimals: 24,
            },
        )
    }

    #[init]
    pub fn new(
        owner_id: AccountId,
        token_total_supply: U128,
        token_price: U128,
        token_metadata: FungibleTokenMetadata,
    ) -> Self {
        assert!(!env::state_exists(), "Already initialized");

        let mut this = Self {
            owner_id: owner_id.clone(),
            investors: UnorderedSet::new(b"u"),
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

    pub fn get_investors(&self) -> Vec<AccountId> {
        self.investors.to_vec()
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
        self.investors.insert(&env::signer_account_id());
    }

    pub fn ft_on_transfer(&mut self, sender_id: AccountId, amount: String, msg: String) -> String {
        match msg.as_str() {
            "buy_asset_tokens" => {
                // assert_eq!(env::predecessor_account_id(), AccountId::from_str("usdn.testnet").unwrap(), "Accepting only USN token");
                let amount = match amount.parse::<u128>() {
                    Ok(i) => i,
                    Err(_e) => {
                        log!("Error parsing amount {}", amount);
                        0
                    }
                };
                let token_price: u128 = self.token_price().into();
                let token_price = token_price / 1000000000000000000;
                let amount_usd = amount / 1000000000000000000;
                let asset_token_mount = amount_usd / token_price;
                log!(
                    "Buy asset tokens! amount_usd: {}, asset_token_amount: {}, token_price: {}",
                    amount_usd,
                    asset_token_mount,
                    token_price
                );

                self.token.internal_transfer(&env::current_account_id(), &sender_id, asset_token_mount, None);
                self.investors.insert(&env::signer_account_id());
            }
            _ => (),
        }

        String::from("0")
    }

    #[private]
    pub fn register_account(&mut self, account_id: AccountId) {
        let balance = self.storage_balance_of(account_id.clone());
        if balance.is_none() || balance.unwrap().total.0 < 1250000000000000000000 {
            self.storage_deposit(
                Some(AccountId::try_from(account_id.clone().to_string()).unwrap()),
                Some(false),
            );
        }
    }

    #[private]
    pub fn callback_after_transfer(&mut self) -> bool {
        match env::promise_result(0) {
            PromiseResult::NotReady => {
                unreachable!()
            }
            PromiseResult::Successful(_) => {
                self.investors.insert(&env::signer_account_id());
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
