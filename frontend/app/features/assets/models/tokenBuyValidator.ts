import ElegantValidator from "elegant-validator";
import defaultValidators from "elegant-validator/src/defaultValidators";
import defaultMessagesEn from "elegant-validator/src/defaultMessagesEn";


const ev = new ElegantValidator(defaultValidators, defaultMessagesEn)

const isValidAmount = (formData: any) =>{
  const {amount, tokensLeft, userBalance, tokenPrice} = formData.resource
  const tokenToBuyInUsd = tokenPrice * Number(amount);
  if(tokenToBuyInUsd > userBalance){
    return 'Not enough balance!'
  }
  if(amount > tokensLeft){
    return `Tokens left: ${tokensLeft}. You want to buy: ${amount}`
  }
}

const schema= {
  amount: ['required', isValidAmount],
}
export const tokenAmountValidator = {
  isAmountValid(formData: {amount: number,tokensLeft: number, userBalance: number, tokenPrice: number}) {
    return ev.isValid(formData, schema)
  },
}
