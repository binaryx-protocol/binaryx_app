import { atom } from 'jotai'
import * as metaMaskModel from "../../../models/metaMaskModel";
import * as rpcConfigModel from "../../../models/rpcConfigModel";
import router from 'next/router'
import {
  AssetStatuses,
  UiNewAssetFormValues,
  UiNewAssetForm,
  UiNewAssetFormChangeArgs
} from "../types";
import {arbClient} from "./arbClient";
import {waitFor} from "../../../utils/pageLoadUtiils";
import {assetValidator} from "./assetValidator";
import {SyntheticEvent} from "react";
import {paths} from "../../../../../../pkg/paths";
import {RpcConfig} from "../../../models/rpcConfigModel";

const defaultAttrs = (): UiNewAssetFormValues => ({
  name: '',
  symbol: '',
  title: '',
  description: '',
  status: AssetStatuses.upcoming,
  tokenInfo_totalSupply: 10_000, // decimals = 0
  tokenInfo_apr: 10, // percents
  tokenInfo_tokenPriceDe6: 5 * 1e6, // decimals = 6
})

export const $form = atom<UiNewAssetForm>({
  values: defaultAttrs(),
  errors: {},
  touches: {},
  isValid: false,
  isSubmitTouched: false,
})

export const $doCreateAsset = atom(null, async (get, set, form: UiNewAssetForm) => {
  await waitFor(() => {
    return get(metaMaskModel.$walletReadiness) === 'ready' && !!get(rpcConfigModel.$rpcConfig)
  }, 3)

  const $rpcConfig = get(rpcConfigModel.$rpcConfig) as RpcConfig
  const formValues = {
    ...form.values,
  }
  await arbClient.createAsset(
    $rpcConfig,
    formValues
  );
  alert("You will see your asset soon. Please, refresh the page.");
  router.push(paths.listAssets());
})

export const $onFormChange = atom(null, (get, set, args: UiNewAssetFormChangeArgs) => {
  set($doUpdateFormValues, args)
  set($doValidateFormValues, args)
})

export const $onMount = atom(null, (get, set) => {
  set($doValidateFormValues, get($form))
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

export const $onSubmit = atom(null, (get, set) => {
  set($form, f => ({ ...f, isSubmitTouched: true }))

  const form = get($form)
  if (form.isValid) {
    set($doCreateAsset, form)
  } else {
    console.log('form', form)
  }
})
