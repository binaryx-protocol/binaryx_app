import { atom } from 'jotai'
import * as metaMaskModel from "../../../models/metaMaskModel";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import {
  AssetAddress,
  AssetStatuses,
  UiNewAssetFormValues,
  UiNewAssetForm,
  UiNewAssetFormChangeArgs
} from "../types";
import {arbClient} from "./arbClient";
import {waitFor} from "../../../utils/pageLoadUtiils";
import {assetValidator} from "./assetValidator";

const assetAddressAttrs  = (): AssetAddress => ({
  country: 'UA',
  state: 'Che',
  city: 'Cherkassy',
  postalCode: '19600',
  addressLine1: 'Khreschatik 1',
  addressLine2: '5th floor',
})

const defaultAttrs = (): UiNewAssetFormValues => ({
  name: '',
  symbol: '',
  title: '',
  description: '',
  status: AssetStatuses.upcoming,
  originalOwner: '',
  legalDocuments: '',
  // propertyAddress: assetAddressAttrs(),
})

export const $form = atom<UiNewAssetForm>({
  values: defaultAttrs(),
  errors: {},
  touches: {},
  isValid: false,
  isSubmitTouched: false,
})

export const $doCreateAsset = atom(null, async (get) => {
  await waitFor(() => {
    return get(metaMaskModel.$walletReadiness) === 'ready' && !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  const $rpcConfig = get(rpcConfigModel.$rpcConfig)
  await arbClient.createAsset(
    $rpcConfig,
    defaultAttrs()
  );
})

export const $onFormChange = atom(null, (get, set, args: UiNewAssetFormChangeArgs) => {
  set($doUpdateFormValues, args)
  set($doValidateFormValues, args)
})

export const $doUpdateFormValues = atom(null, (get, set, args: UiNewAssetFormChangeArgs) => {
  const form = get($form)
  const newForm = {
    ...form,
    values: args.values,
    touches: args.touches,
  }
  set($form, newForm)
})

export const $doValidateFormValues = atom(null, (get, set, args: UiNewAssetFormChangeArgs) => {
  assetValidator.isNewValid(args.values)
    .then(({ errors, isValid }) => {
      const form = get($form)
      const newForm = {
        ...form,
        errors,
        isValid,
      }
      set($form, newForm)
    })
})

export const $onSubmit = atom(null, (get, set, e) => {
  const form = get($form)
  const newForm = {
    ...form,
    isSubmitTouched: true,
  }
  set($form, newForm)
  set($doValidateFormValues, form)
  // @ts-ignore
  e.preventDefault();
  return false
})
