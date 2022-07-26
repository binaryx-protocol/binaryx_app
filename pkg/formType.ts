export type UiFormErrors<TValues> = {
  [Property in keyof TValues]?: string[]
}

export type UiFormTouches<TValues> = {
  [Property in keyof TValues]?: boolean
}

export type UiForm<TValues> = {
  values: TValues
  errors: UiFormErrors<TValues>
  touches: UiFormTouches<TValues>
  isValid: boolean
  isSubmitTouched: boolean
}

export type UiFormValidatorRules<TValues> = {
  [Property in keyof TValues]?: string[]
}
