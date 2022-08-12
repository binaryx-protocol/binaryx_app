use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::UnorderedSet;
use near_sdk::json_types::U128;
use near_sdk::{
    assert_self, env, ext_contract, log, near_bindgen, AccountId, Balance, PanicOnDefault, Promise,
    PromiseOrValue, PromiseResult,
};
use std::convert::{From, TryFrom};

use near_contract_standards::fungible_token::metadata::{FungibleTokenMetadata, FungibleTokenMetadataProvider, FT_METADATA_SPEC};
use near_contract_standards::fungible_token::FungibleToken;
use near_sdk::collections::LazyOption;

pub mod external;
pub use crate::external::*;

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner_id: AccountId,
    asset_contracts: UnorderedSet<AccountId>,
}

#[near_bindgen]
impl Contract {

    #[init]
    pub fn new(
        owner_id: AccountId,
    ) -> Self {
        assert!(!env::state_exists(), "Already initialized");

        let mut this = Self {
            owner_id: owner_id.clone(),
            asset_contracts: UnorderedSet::new(b"u")
        };

        this
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
                // assert_eq!(env::predecessor_account_id(), AccountId::from_str("usdn.testnet").unwrap(), "Accepting only USN token");
                // if self.token.accounts.get(&sender_id).is_none() {
                //     self.token.internal_register_account(&sender_id);
                // };
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

            }
            _ => (),
        }

        String::from("0")
    }

    pub fn transfer_asset_token(&mut self, &receiver_id: AccountId, amount: u128) -> Promise {
        // asset::ext(self)

        // Create a promise to call HelloNEAR.set_greeting(message:string)
        hello_near::ext(self.hello_account.clone())
            .with_static_gas(Gas(5*TGAS))
            .set_greeting(new_greeting)
            .then( // Create a callback change_greeting_callback
                   Self::ext(env::current_account_id())
                       .with_static_gas(Gas(5*TGAS))
                       .change_greeting_callback()
            )
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

}
