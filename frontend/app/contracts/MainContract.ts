import Contract from './Contract';

class MainContract extends Contract {
  static async new(contractName: string): Promise<MainContract> {
    return super.new(contractName, {
      viewMethods: [
        'get_account_assets',
        'calculate_available_asset_rewards',
        'calculate_available_total_rewards',
        'get_asset_total_rent_earned',
        'get_total_rent_earned',
        'get_apr_by_timestamp'
      ],
      changeMethods: [],
    });
  }

  // ft_total_supply(): Promise<string> {
  //     return this.contract.ft_total_supply()
  // }
}

export default MainContract;
