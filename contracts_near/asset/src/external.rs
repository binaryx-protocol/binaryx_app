use near_sdk::{AccountId, ext_contract};
use near_sdk::json_types::U128;

pub const TGAS: u64 = 1_000_000_000_000;
pub const NO_DEPOSIT: u128 = 0;
pub const XCC_SUCCESS: u64 = 1;

type AssetAccountId = AccountId;

// Interface of this contract, for callbacks
// #[ext_contract(this_contract)]
// trait Callbacks {
//     fn on_ft_transfer_callback(&mut self) -> String;
// }

// Validator interface, for cross-contract calls
#[ext_contract(main_contract)]
trait Main {
    fn add_asset_investor(&mut self, investor_account_id: AccountId, asset_account_id: AssetAccountId, token_amount: U128);
    fn remove_asset_investor(&mut self, investor_account_id: AccountId, asset_account_id: AssetAccountId);
}
