import Contract from "./Contract";

class AssetContract extends Contract {
  static async new(contractName: string): Promise<AssetContract> {
    return Contract.new(contractName, {
      viewMethods: ["ft_total_supply", "ft_balance_of", "storage_balance_of", "token_price"],
      changeMethods: ["ft_transfer", "ft_transfer_call", "storage_deposit"],
    });
  }

  // ft_total_supply(): Promise<string> {
  //     return this.contract.ft_total_supply()
  // }
}

export default AssetContract;
