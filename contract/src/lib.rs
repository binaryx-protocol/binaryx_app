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

// const DATA_IMAGE_SVG_NEAR_ICON: &str = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 288 288'%3E%3Cg id='l' data-name='l'%3E%3Cpath d='M187.58,79.81l-30.1,44.69a3.2,3.2,0,0,0,4.75,4.2L191.86,103a1.2,1.2,0,0,1,2,.91v80.46a1.2,1.2,0,0,1-2.12.77L102.18,77.93A15.35,15.35,0,0,0,90.47,72.5H87.34A15.34,15.34,0,0,0,72,87.84V201.16A15.34,15.34,0,0,0,87.34,216.5h0a15.35,15.35,0,0,0,13.08-7.31l30.1-44.69a3.2,3.2,0,0,0-4.75-4.2L96.14,186a1.2,1.2,0,0,1-2-.91V104.61a1.2,1.2,0,0,1,2.12-.77l89.55,107.23a15.35,15.35,0,0,0,11.71,5.43h3.13A15.34,15.34,0,0,0,216,201.16V87.84A15.34,15.34,0,0,0,200.66,72.5h0A15.35,15.35,0,0,0,187.58,79.81Z'/%3E%3C/g%3E%3C/svg%3E";
const DATA_IMAGE_BNRX_LOGO: &str = "data:image/jpeg;base64,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";

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

#[near_bindgen]
impl FungibleTokenMetadataProvider for Contract {
    fn ft_metadata(&self) -> FungibleTokenMetadata {
        self.token_metadata.get().unwrap()
    }
}
