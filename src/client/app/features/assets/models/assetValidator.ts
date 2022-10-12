import ElegantValidator from 'elegant-validator'
import { TValidatorResult } from 'elegant-validator/src'
import defaultMessagesEn from 'elegant-validator/src/defaultMessagesEn'
import defaultValidators from 'elegant-validator/src/defaultValidators'

const ev = new ElegantValidator(defaultValidators, defaultMessagesEn)
const schema = {
  name: ['required', 'length:2:127'],
  symbol: ['required', 'length:2:127'],
  title: ['required', 'length:2:127'],
  description: ['required', 'length:2:127'],
}

export const assetValidator = {
  isNewValid(formData: unknown): Promise<TValidatorResult<unknown>> {
    return ev.isValid(formData, schema)
  },
}
