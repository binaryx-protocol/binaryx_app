import mainContractService from './mainContractService';
import { USN } from '../constants/billingTypes';
import usnContractService from './usnContractService';

const paymentService = {
  async handleInvest(options: { tokenAmount: number, billingType: string }) {
    const { tokenAmount, billingType } = options;
    if (billingType === USN) {
      await usnContractService.init();

      if (usnContractService.isSignedIn()) {
        const tokenPrice = 5000000000000000000; //await mainContractService.token_price();
        usnContractService.ft_transfer_call({
          args: {
            receiver_id: mainContractService.getContractAccountId(),
            amount: `${tokenAmount * tokenPrice}`,
            msg: "buy_asset_tokens"
          },
          callbackUrl: window.location.origin + "/invest?success=true",
          meta: "success",
          gas: "300000000000000",
          amount: "1"
        });
      } else {
        usnContractService.requestSignIn();
      }
    }
  },
};

export default paymentService;
