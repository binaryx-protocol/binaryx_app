import waitForContract from 'utils/waitForContract';
import { MAIN_CONTRACT_NAME } from 'contracts/config';
import UsnContract from '../contracts/UsnContract';

const CONTRACT_KEY: string = 'usnContract';

const usnContractService = {
  async init() {
    window.usnContract = await UsnContract.new("usdn.testnet");

    return window.usnContract;
  },

  async getContract(contractKey: string): Promise<UsnContract> {
    return waitForContract(contractKey);
  },

  getContractAccountId(): string {
    return "usdn.testnet";
  },

  isSignedIn(): boolean {
    return window.usnContract?.walletConnection?.isSignedIn();
  },

  async getCurrentAccountId() {
    const contract = await this.getContract(CONTRACT_KEY);

    return contract.walletConnection.getAccountId();
  },

  requestSignIn() {
    window.usnContract.walletConnection.requestSignIn(
      window.usnContract.contractName,
    );
  },

  async ft_balance_of({ account_id }: { account_id: string }): Promise<string> {
    const contract = await this.getContract(CONTRACT_KEY);

    return contract.contract.ft_balance_of({ account_id });
  },

  async ft_transfer_call(contractParams: {
    args: { receiver_id: string, amount: string, msg: string },
    callbackUrl: string,
    meta: string,
    gas: string,
    amount: string
  }): Promise<string> {
    const contract = await this.getContract(CONTRACT_KEY);

    return contract.contract.ft_transfer_call(contractParams).catch(error => console.error(error));
  },
};

export default usnContractService;
