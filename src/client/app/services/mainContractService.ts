import waitForContract from 'utils/waitForContract';
import MainContract from 'contracts/MainContract';
import { MAIN_CONTRACT_NAME } from 'contracts/config';

const CONTRACT_KEY = 'mainContract';

const mainContractService = {
  async init() {
    if (!window.mainContract) {
      // window.mainContract = await MainContract.new("main.fundament_creator.testnet");
      window.mainContract = await MainContract.new("dev-1660992653251-73267872066366");
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
  },

  getAccountId(): string | undefined {
    return window.mainContract?.accountId;
  },

  getContractAccountId(): string {
    return MAIN_CONTRACT_NAME;
  },

  async get_account_assets({ account_id }: { account_id: string }): Promise<string[]> {
    const mainContract = await this.getContract(CONTRACT_KEY);

    return mainContract.contract.get_account_assets({ account_id });
  },
};

export default mainContractService;
