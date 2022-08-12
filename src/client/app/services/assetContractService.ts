import waitForContract from 'utils/waitForContract';
import AssetContract from 'contracts/AssetContract';
import { MAIN_CONTRACT_NAME } from 'contracts/config';

const CONTRACT_KEY = 'assetContract';

const assetContractService = {
  async init(contractId: string) {
    window.assetContract = await AssetContract.new(contractId);

    return window.assetContract;
  },

  async getContract(contractKey: string): Promise<AssetContract> {
    return waitForContract(contractKey);
  },

  isSignedIn() {
    return window.assetContract?.walletConnection?.isSignedIn();
  },

  requestSignIn() {
    window.assetContract.walletConnection.requestSignIn(
      window.assetContract.contractName,
    );
  },

  getContractAccountId(): string {
    return MAIN_CONTRACT_NAME;
  },

  async ft_total_supply(): Promise<string> {
    const assetContract = await this.getContract(CONTRACT_KEY);

    return assetContract.contract.ft_total_supply();
  },

  async ft_balance_of({ account_id }: { account_id: string }): Promise<string> {
    const assetContract = await this.getContract(CONTRACT_KEY);

    return assetContract.contract.ft_balance_of({ account_id });
  },

  async storage_balance_of({ account_id }: { account_id: string }): Promise<string> {
    const assetContract = await this.getContract(CONTRACT_KEY);

    return assetContract.contract.storage_balance_of({ account_id });
  },

  async token_price(): Promise<number> {
    const assetContract = await this.getContract(CONTRACT_KEY);
    const result = await assetContract.contract.token_price();

    return typeof result === "number" ? result : (result && parseInt(result));
  },
};

export default assetContractService;
