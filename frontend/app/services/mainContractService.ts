import waitForContract from 'utils/waitForContract';
import MainContract from 'contracts/MainContract';
import { MAIN_CONTRACT_NAME } from 'contracts/config';

const CONTRACT_KEY = 'mainContract';

const mainContractService = {
  async init() {
    if (!window.mainContract) {
      // window.mainContract = await MainContract.new("main.fundament_creator.testnet");
      window.mainContract = await MainContract.new(
        'dev-1661494483209-68940616161192',
      );
    }

    return window.mainContract;
  },

  async getContract(contractKey: string): Promise<MainContract> {
    return waitForContract(contractKey);
  },

  isSignedIn() {
    return window.mainContract?.walletConnection?.isSignedIn();
  },

  requestSignIn() {
    window.mainContract?.walletConnection.requestSignIn(
      window.mainContract.contractName,
    );
  },

  signOut() {
    window.mainContract?.walletConnection?.signOut();
    setTimeout(() => {
      window.location.replace('/marketplace');
    }, 2000);
  },

  getAccountId(): string | undefined {
    return window.mainContract?.accountId;
  },

  getContractAccountId(): string {
    return MAIN_CONTRACT_NAME;
  },

  async get_account_assets({
    account_id,
  }: {
    account_id: string;
  }): Promise<string[]> {
    const mainContract = await this.getContract(CONTRACT_KEY);

    return mainContract.contract.get_account_assets({ account_id });
  },

  async calculate_available_asset_rewards({
    account_id,
    asset_contract_id,
  }: {
    account_id: string;
    asset_contract_id: string;
  }) {
    const mainContract = await this.getContract(CONTRACT_KEY);

    return mainContract.contract.calculate_available_asset_rewards({
      investor_account_id: account_id,
      asset_account_id: asset_contract_id,
    });
  },

  async calculate_available_total_rewards({
    account_id,
  }: {
    account_id: string;
  }) {
    const mainContract = await this.getContract(CONTRACT_KEY);

    return mainContract.contract.calculate_available_total_rewards({
      investor_account_id: account_id,
    });
  },

  async get_asset_total_rent_earned({
    account_id,
    asset_contract_id,
  }: {
    account_id: string;
    asset_contract_id: string;
  }) {
    const mainContract = await this.getContract(CONTRACT_KEY);

    return mainContract.contract.get_asset_total_rent_earned({
      investor_account_id: account_id,
      asset_account_id: asset_contract_id,
    });
  },

  async get_total_rent_earned({
    account_id,
  }: {
    account_id: string;
  }) {
    const mainContract = await this.getContract(CONTRACT_KEY);

    return mainContract.contract.get_total_rent_earned({
      investor_account_id: account_id,
    });
  },

  async get_apr_by_timestamp({
    asset_contract_id,
    timestamp
  }: {
    asset_contract_id: string;
    timestamp: number;
  }) {
    const mainContract = await this.getContract(CONTRACT_KEY);

    return mainContract.contract.get_apr_by_timestamp({
      asset_account_id: asset_contract_id,
      timestamp,
    });
  },
};

export default mainContractService;
