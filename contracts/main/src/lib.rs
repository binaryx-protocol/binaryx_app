use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, UnorderedSet, Vector};
use near_sdk::{env, near_bindgen, AccountId, PanicOnDefault, BorshStorageKey, require, assert_self, log};
use near_sdk::serde::{Serialize, Deserialize};

pub mod external;

pub use crate::external::*;

type AssetAccountId = AccountId;

#[derive(BorshStorageKey, BorshSerialize)]
pub enum StorageKeys {
    Assets,
    AssetOwners { account_hash: Vec<u8> },
}

#[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize)]
#[serde(crate = "near_sdk::serde")]
pub enum Status {
    Active,
    Inactive,
    Undefined,
}

impl Status {
    pub fn get_from_string(value: String) -> Status {
        match value.as_str() {
            "Active" => Status::Active,
            "Inactive" => Status::Inactive,
            _ => Status::Undefined
        }
    }
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
// #[derive(Serialize, Deserialize, BorshDeserialize, BorshSerialize, PanicOnDefault)]
// #[serde(crate = "near_sdk::serde")]
pub struct Asset {
    status: Status,
    owners: UnorderedSet<AccountId>,
}

#[near_bindgen]
#[derive(BorshDeserialize, BorshSerialize, PanicOnDefault)]
pub struct Contract {
    owner_id: AccountId,
    assets: UnorderedMap<AssetAccountId, Asset>,
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
        };

        this
    }

    pub fn add_asset(&mut self, asset_account_id: AccountId, asset_status: String) {
        assert_eq!(env::signer_account_id(), self.owner_id, "Only owner can add assets");
        let asset = Asset {
            status: Status::get_from_string(asset_status),
            owners: UnorderedSet::new(StorageKeys::AssetOwners { account_hash: env::sha256(&asset_account_id.as_bytes()) }),
        };
        self.assets.insert(&asset_account_id, &asset);
    }

    pub fn add_owner_to_asset(&mut self, asset_id: AssetAccountId, owner_id: AccountId) {
        let asset = self.assets.get(&asset_id);
        require!(&asset.is_some(), "Asset not found");
        let mut asset = asset.unwrap();
        asset.owners.insert(&owner_id);
        self.assets.insert(&asset_id, &asset);
        // log!("Owners {}", asset.owners.iter().find(|o| o == &owner_id).unwrap_or(owner_id));
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

    pub fn get_all_owners(&self) -> Vec<AccountId> {
        let mut owners: Vec<AccountId> = Vec::new();
        for (_, asset) in self.assets.iter() {
            for owner in asset.owners.iter() {
                owners.push(owner);
            }
        }

        owners
    }

    pub fn get_assets_by_owner(&self, account_id: AccountId) -> Vec<AssetAccountId> {
        let mut assets: Vec<AssetAccountId> = Vec::new();
        for (asset_account_id, asset) in self.assets.iter() {
            for owner in asset.owners.iter() {
                if owner == account_id {
                    assets.push(asset_account_id.clone());
                }
            }
        }

        assets
    }
}

