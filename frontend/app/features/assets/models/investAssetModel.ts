import {atom} from 'jotai'
import * as rpcConfigModel from "../../../core/models/rpcConfigModel";
import {
  BcAsset,
  UiAssetInvestForm,
  UiAssetInvestFormChangeArgs,
  UiNewAssetForm,
  UiNewAssetFormChangeArgs
} from "../types";
import {bnToInt} from "../../../utils/objectUtils";
import {$usdtBalance, $usdtSmartContractSigned, UsdtManager} from "../../../shared/usdtToken/smartContractsFactory";
import {$assetsTokenSmartContractSigned, AssetManager} from "./smartContractsFactory";
import {ChainInfo} from "../../../shared/walletsConnect";
import {tokenAmountValidator} from "./tokenBuyValidator";
import {$assetComputed} from "./assetDetailsModel";
import router from "next/router";
import {paths} from "../../../../pkg/paths";

export const $onSubmit = atom(null, async (get, set, {
  asset,
  id,
  amount,
  then
}: { asset: BcAsset, id: number, amount: number, then: () => void }) => {
  const rpcConfig = get(rpcConfigModel.$rpcConfig) as ChainInfo
  const usdtfTokenSigned = get($usdtSmartContractSigned) as UsdtManager
  const assetsTokenSigned = get($assetsTokenSmartContractSigned) as AssetManager

  // calc
  if (!amount) {
    throw new Error('amount is required')
  }
  const amountInMicro = estimateCost(asset, amount)
  if (!amountInMicro) {
    throw new Error('amountInMicro is required')
  }

  // TRX #1
  await usdtfTokenSigned.approve(rpcConfig.contractsAddresses.assetsTokenAddress, amountInMicro)

  // TRX #2
  await assetsTokenSigned.investUsingUsdt(id, amount)
  then()
})

export const $assetId = atom<number>(1);

export const $form = atom<UiAssetInvestForm>({
  values: {
    amount: '',
  },
  errors: {},
  touches: {},
  isValid: false,
  isSubmitTouched: false,
})

export const $onFormChange = atom(null, (get, set, args: UiAssetInvestFormChangeArgs) => {
  set($doUpdateFormValues, args)
  set($doValidateFormValues, args)
})

const $doUpdateFormValues = atom(null, (get, set, args: UiAssetInvestFormChangeArgs) => {
  const form = get($form)
  const newForm = {
    ...form,
    values: args.values,
    touches: args.touches,
  }
  set($form, newForm)
})

const $doValidateFormValues = atom(null, (get, set, args: UiAssetInvestFormChangeArgs) => {
  const usdtBalance = get($usdtBalance)
  const assetComputed = get($assetComputed)
  const balance = usdtBalance.state === 'hasData' ? usdtBalance.data : 0;
  const amount = Number(args.values.amount)
  const tokenPrice = 50
  if (assetComputed !== null) {
    tokenAmountValidator.isAmountValid({
      amount,
      tokensLeft: assetComputed.tokensLeft,
      userBalance: balance,
      tokenPrice
    })
      .then(({errors, isValid}) => {
        const form = get($form)
        const newForm = {
          ...form,
          errors,
          isValid,
        }
        set($form, newForm)
      })
  }
})

export const $onSubmitValue = atom(null, async(get, set) => {
  set($form, f => ({ ...f, isSubmitTouched: true }))
  const id = get($assetId)
  const form = get($form)
  if (form.isValid) {
    await router.push(paths.investAsset({id}))
  }
})


const estimateCost = (asset: BcAsset, tokensAmount: number) => bnToInt(asset.tokenInfo_tokenPriceDe6) * tokensAmount * 1e4;

