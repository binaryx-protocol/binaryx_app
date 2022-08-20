use std::convert::TryInto;
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap, UnorderedSet};
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault, BorshStorageKey, require, assert_self, log};
use near_sdk::serde::{Serialize, Deserialize};

pub mod external;

pub use crate::external::*;

type AssetAccountId = AccountId;

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    Assets,
    AssetOwners,
    AccountAssets { account_hash: Vec<u8> },
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub enum Status {
    Active,
    Inactive,
    Undefined,
}

// impl Status {
//     pub fn get_from_string(value: String) -> Status {
//         match value.as_str() {
//             "Active" => Status::Active,
//             "Inactive" => Status::Inactive,
//             _ => Status::Undefined
//         }
//     }
// }

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Asset {
    status: Status,
}


#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner_id: AccountId,
    assets: UnorderedMap<AssetAccountId, Asset>,
    asset_owners: LookupMap<AccountId, UnorderedSet<AssetAccountId>>
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
            asset_owners: LookupMap::new(StorageKeys::AssetOwners)
        };

        this
    }

    pub fn add_asset(&mut self, asset_account_id: AccountId, asset_status: Status) {
        assert_eq!(env::signer_account_id(), self.owner_id, "Only owner can add assets");
        let asset = Asset {
            status: asset_status,
        };
        self.assets.insert(&asset_account_id, &asset);
    }

    pub fn get_asset_addresses(&self) -> Vec<AssetAccountId> {
        self.assets.keys_as_vector().to_vec()
    }

    pub fn get_asset_status(&self, asset_id: AssetAccountId) -> Status {
        let asset = self.assets.get(&asset_id);
        require!(asset.is_some(), "Asset not found");
        let asset = asset.unwrap();

        asset.status
    }

    pub fn set_asset_status(&mut self, asset_id: AssetAccountId, status: Status) {
        let asset = self.assets.get(&asset_id);
        require!(asset.is_some(), "Asset not found");
        let mut asset = asset.unwrap();
        asset.status = status;
        self.assets.insert(&asset_id, &asset);
    }

    pub fn add_asset_owner(&mut self, owner_account_id: AccountId, asset_account_id: AssetAccountId) {
        let account_assets = self.asset_owners.get(&owner_account_id);

        match account_assets {
            Some(mut assets) => {
                assets.insert(&asset_account_id);
                self.asset_owners.insert(&owner_account_id, &assets);
            }
            None => {
                let mut assets = UnorderedSet::new(StorageKeys::AccountAssets { account_hash: env::sha256(owner_account_id.as_bytes()) });
                &assets.insert(&asset_account_id);
                self.asset_owners.insert(&owner_account_id, &assets);
            }
        }
    }

    pub fn remove_asset_owner(&mut self, owner_account_id: AccountId, asset_account_id: AssetAccountId) {
        let account_assets = self.asset_owners.get(&owner_account_id);

        match account_assets {
            Some(mut assets) => {
                assets.remove(&asset_account_id);
                self.asset_owners.insert(&owner_account_id, &assets);
            }
            None => {}
        }
    }

    pub fn get_account_assets(&self, account_id: AccountId) -> Vec<AssetAccountId> {
        let result = self.asset_owners.get(&account_id);

        match result {
            Some(assets) => {
                let values = assets.to_vec();
                log!("Found asset owner {}, - len {}", account_id, values.len());
                values
            }
            None => {
                log!("Not found asset owner {}", account_id);
                vec![]
            }
        }
    }
}

