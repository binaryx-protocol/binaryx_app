import { atom } from 'jotai'
import router from 'next/router'
import {
  AssetStatuses,
  UiNewAssetFormValues,
  UiNewAssetForm,
  UiNewAssetFormChangeArgs
} from "../types";
import {assetValidator} from "./assetValidator";
import {paths} from "../../../../../../pkg/paths";
import { $assetsTokenSmartContractSigned, AssetManager} from "./smartContractsFactory";

const defaultAttrs = (): UiNewAssetFormValues => ({
  name: '',
  symbol: '',
  title: '',
  description: '',
  status: AssetStatuses.upcoming,
  tokenInfo_totalSupply: 10_000, // decimals = 0
  tokenInfo_apr: 10, // percents
  tokenInfo_tokenPriceDe6: 5, // decimals = 6
  propertyInfo_images: 'https://ns.clubmed.com/dream/RESORTS_3T___4T/Asie_et_Ocean_indien/Bali/169573-1lng9n8nnf-swhr.jpg',
})

// stores
export const $form = atom<UiNewAssetForm>({
  values: defaultAttrs(),
  errors: {},
  touches: {},
  isValid: false,
  isSubmitTouched: false,
})

// setters
const $doCreateAsset = atom(null, async (get, set, form: UiNewAssetForm) => {
  const formValues = {
    ...form.values,
    tokenInfo_tokenPriceDe6: form.values.tokenInfo_tokenPriceDe6 * 1e6
  }
  const manager = get($assetsTokenSmartContractSigned) as AssetManager
  await manager.createAsset(...Object.values(formValues));
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

const $doUpdateFormValues = atom(null, (get, set, args: UiNewAssetFormChangeArgs) => {
  const form = get($form)
  const newForm = {
    ...form,
    values: args.values,
    touches: args.touches,
  }
  set($form, newForm)
})

const $doValidateFormValues = atom(null, (get, set, args: UiNewAssetFormChangeArgs) => {
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
