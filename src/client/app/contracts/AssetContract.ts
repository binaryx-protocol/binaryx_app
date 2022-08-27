import Contract from "./Contract";

type ContractName = string;

class AssetContract extends Contract {
  static instances: Record<ContractName, AssetContract> = {}

  static async new(contractName: string): Promise<AssetContract> {
    return super.new(contractName, {
      viewMethods: ["ft_total_supply", "ft_balance_of", "storage_balance_of", "token_price"],
      changeMethods: ["ft_transfer", "ft_transfer_call", "storage_deposit"],
    });
  }

  static async getInstance(contractName: string): Promise<AssetContract> {
    let contract = AssetContract.instances[contractName];
    if (contract) {
      return contract;
    }

    contract = await AssetContract.new(contractName);
    AssetContract.instances[contractName] = contract;

    return contract;
  }

  // ft_total_supply(): Promise<string> {
  //     return this.contract.ft_total_supply()
  // }
}

export default AssetContract;
