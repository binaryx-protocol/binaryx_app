import { getConfig } from "contracts/config";
import {
  connect,
  Contract as NearContract,
  keyStores,
  Near,
  WalletConnection,
} from "near-api-js";

type ConstructorParams = {
  contractName: string;
  near: Near;
  walletConnection: WalletConnection;
  accountId: string;
  contract: NearContract;
};

type Options = { viewMethods: string[]; changeMethods: string[] };

class Contract {
  contractName: string;
  near: Near;
  walletConnection: WalletConnection;
  accountId: string;
  contract: any;

  constructor({
    contractName,
    near,
    walletConnection,
    accountId,
    contract,
  }: ConstructorParams) {
    this.contractName = contractName;
    this.near = near;
    this.walletConnection = walletConnection;
    this.accountId = accountId;
    this.contract = contract;
  }

  static async new(
    contractName: string,
    { viewMethods, changeMethods }: Options
  ) {
    const nearConfig = getConfig({
      env: process.env.NODE_ENV || "development",
      contractName,
    });
    const near = await connect(
      // @ts-ignore
      Object.assign(
        { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
        nearConfig
      )
    );
    // @ts-ignore
    const walletConnection = new WalletConnection(near);
    const accountId = walletConnection.getAccountId();
    const contract = await new NearContract(
      walletConnection.account(),
      nearConfig.contractName,
      {
        viewMethods,
        changeMethods,
      }
    );

    return new Contract({
      contractName,
      near,
      walletConnection,
      accountId,
      contract,
    });
  }

  // getAssetContractId() {
  //     return "asset.fundament.creator.testnet"
  // },
  // getBalanceOf(accountId: string) {
  //     return window.contract.tokens_left({ account_id: accountId })
  //         .then(contractBalance => {
  //             return contractBalance
  //         })
  //         .catch(error => console.error(error))
  // }
}

export default Contract;
