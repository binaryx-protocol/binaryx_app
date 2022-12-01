import ElegantValidator from 'elegant-validator'
import { TValidatorResult } from 'elegant-validator/src'
import defaultMessagesEn from 'elegant-validator/src/defaultMessagesEn'
import defaultValidators from 'elegant-validator/src/defaultValidators'
import {UiFormValidatorRules} from "../../../../../../pkg/formType";
import {UiNewAssetFormValues} from "../types";

const ev = new ElegantValidator(defaultValidators, defaultMessagesEn)
const schema: UiFormValidatorRules<UiNewAssetFormValues> = {
  name: ['required', 'length:2:127'],
  symbol: ['required', 'length:2:12'],
  title: ['required', 'length:2:127'],
  description: ['required', 'length:2:127'],
  tokenInfo_totalSupply: ['required'],
  tokenInfo_apr: ['required'],
  tokenInfo_tokenPriceDe6: ['required'],
  propertyInfo_images: ['required'],
}

export const assetValidator = {
  isNewValid(formData: unknown): Promise<TValidatorResult<unknown>> {
    return ev.isValid(formData, schema)
  },
}
