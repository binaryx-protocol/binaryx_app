import ElegantValidator, {TValidatorResult} from "elegant-validator";
import defaultValidators from "elegant-validator/src/defaultValidators";
import defaultMessagesEn from "elegant-validator/src/defaultMessagesEn";


const ev = new ElegantValidator(defaultValidators, defaultMessagesEn)

const schema= {
  amount: ['required'],
}
export const tokenAmountValidator = {
  isAmountValid(formData: {amount: number}, tokensLeft: number, userBalance: number, tokenPrice: number) {
    const tokenToBuy = tokenPrice * tokensLeft;
    if(formData.amount > userBalance){
      return 'Not enough balance!'
    }
    if(formData.amount > tokenToBuy){
      return `Tokens left: ${tokensLeft}. You want to buy: ${formData.amount / tokenPrice}`
    }
    return ev.isValid(formData, schema)
  },
}
