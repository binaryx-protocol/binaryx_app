import ElegantValidator, {TValidatorResult} from "elegant-validator";
import defaultValidators from "elegant-validator/src/defaultValidators";
import defaultMessagesEn from "elegant-validator/src/defaultMessagesEn";


const ev = new ElegantValidator(defaultValidators, defaultMessagesEn)

const schema= {
  amount: ['required', 'number'],
}
export const tokenAmountValidator = {
  isAmountValid(amount: number, tokensLeft: number, userBalance: number, tokenPrice: number) {
    const tokenToBuy = tokenPrice * amount;
    if(amount > userBalance){
      return 'Not enough balance!'
    }
    if(tokenToBuy > tokensLeft){
      return `Tokens left: ${tokensLeft}. You want to buy: ${tokenToBuy}`
    }
    return ev.isValid(amount, schema)
  },
}
