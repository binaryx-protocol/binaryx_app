// @ts-nocheck

import { USN } from '../constants/billingTypes';
import usnContractService from './usnContractService';
import assetContractService from './assetContractService';
import { providers } from "near-api-js";

const paymentService = {
  async handleInvest(options: { assetId: string, assetContractId: string, tokenAmount: number, billingType: string }) {
    const { assetId, assetContractId, tokenAmount, billingType } = options;
    if (billingType === USN) {
      await usnContractService.init();
      await assetContractService.init(assetContractId);

      if (usnContractService.isSignedIn()) {
        const tokenPrice = await assetContractService.token_price(); //5000000000000000000
        const currentAccountId = usnContractService.getContractAccountId();
        console.log("tokenPrice", tokenPrice);
        try {
          usnContractService.ft_transfer_call({
            args: {
              receiver_id: assetContractId,
              amount: `${tokenAmount * tokenPrice}`,
              msg: "buy_asset_tokens"
            },
            callbackUrl: window.location.origin + `/invest?success=true&assetId=${assetId}&assetContractId=${assetContractId}`,
            meta: "success",
            gas: "300000000000000",
            amount: "1"
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        usnContractService.requestSignIn();
      }
    }
  },
  async checkTransactionStatus(txHash: string, accountId: any) {
    const connectionUrl = process.env.NODE_ENV === "development" ? "https://rpc.testnet.near.org" : "https://archival-rpc.mainnet.near.org"
    const provider = new providers.JsonRpcProvider(connectionUrl);
    const txStatus = await provider.txStatus(txHash, accountId);

    return txStatus.status;
  }
};

export default paymentService;
