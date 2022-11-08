use near_sdk::{AccountId, ext_contract};
use near_sdk::json_types::U128;

pub const TGAS: u64 = 1_000_000_000_000;
pub const NO_DEPOSIT: u128 = 0;
pub const XCC_SUCCESS: u64 = 1;

// Interface of this contract, for callbacks
#[ext_contract(this_contract)]
trait Callbacks {
    fn on_ft_transfer_callback(&mut self) -> String;
}

// Validator interface, for cross-contract calls
#[ext_contract(asset)]
trait Asset {
    #[payable]
    fn ft_transfer(
        &mut self,
        receiver_id: AccountId,
        amount: U128,
        memo: Option<String>,
    );
}
