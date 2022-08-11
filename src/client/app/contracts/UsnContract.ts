import Contract from "./Contract";

class UsnContract extends Contract {
  static async new(contractName: string) {
    return await Contract.new(contractName, {
      viewMethods: ["ft_balance_of"],
      changeMethods: ["ft_transfer_call"],
    });
  }

  // ft_total_supply(): Promise<string> {
  //     return this.contract.ft_total_supply()
  // }
}

export default UsnContract;
