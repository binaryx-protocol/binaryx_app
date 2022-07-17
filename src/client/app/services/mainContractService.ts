import waitForContract from "utils/waitForContract";
import MainContract from "contracts/MainContract";
import { MAIN_CONTRACT_NAME } from "contracts/config";

const CONTRACT_KEY = "mainContract";

async function getContract(contractKey: string): Promise<MainContract> {
  return waitForContract(contractKey);
}

const mainContractService = {
  async init() {
    window.mainContract = await MainContract.new(MAIN_CONTRACT_NAME);

    return window.mainContract;
  },

  isSignedIn() {
    return window.mainContract?.walletConnection?.isSignedIn();
  },

  requestSignIn() {
    window.mainContract.walletConnection.requestSignIn(
      window.mainContract.contractName
    );
  },

  getContractAccountId(): string {
    return MAIN_CONTRACT_NAME;
  },

  async ft_total_supply(): Promise<string> {
    const mainContract = await getContract(CONTRACT_KEY);

    return mainContract.contract.ft_total_supply();
  },

  async ft_balance_of({ account_id }: { account_id: string }): Promise<string> {
    const mainContract = await getContract(CONTRACT_KEY);

    return mainContract.contract.ft_balance_of({ account_id });
  },

  async handleInvest() {
    if (this.isSignedIn()) {
    } else {
      this.requestSignIn();
    }
  },
};

export default mainContractService;
