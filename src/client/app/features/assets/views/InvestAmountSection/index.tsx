import { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Button from '@mui/material/Button';
import {useAtomValue, useSetAtom} from "jotai";
import * as assetDetailsModel from "../../models/assetDetailsModel";
import * as investAssetModel from "../../models/investAssetModel";
import {paths} from "../../../../../../../pkg/paths";
import Link from "next/link";
import {$usdtBalance} from "../../../../shared/usdtToken/smartContractsFactory";

const USDT = 'USDT';

export const InvestAmountSection = () => {
  const [tokenQuantity, setTokenQuantity] = useState<number | string>(1);
  const [step, setStep] = useState(0);
  const [billingType, setBillingType] = useState('');

  //
  const id = parseInt(useRouter().query.id as string);
  const $asset = useAtomValue(assetDetailsModel.$asset)
  const $assetComputed = useAtomValue(assetDetailsModel.$assetComputed)
  const $doLoadAsset = useSetAtom(assetDetailsModel.$doLoadAsset)
  const $onSubmit = useSetAtom(investAssetModel.$onSubmit)
  const usdtBalance = useAtomValue($usdtBalance)
  const balance = usdtBalance.state === 'hasData' ? usdtBalance.data : 0;

  useEffect(() => {
    if (Number.isInteger(id)) {
      $doLoadAsset({ id })
    }
  }, [id])

  if (!$asset || !$assetComputed) {
    return null;
  }

  function getTokenQuantity(qty = tokenQuantity): number {
    const result = typeof qty === "string" ? parseInt(qty) : qty;
    if (isNaN(result)) {
      return 0;
    }

    return result;
  }

  const onCtaClick = () => {
    if (step === 0) {
      setStep(1);
    }
    if (step === 1) {
      // setStep(2)
      $onSubmit({ asset: $asset, id, amount: getTokenQuantity(), then: () => setStep(2) })
    }
  }
  const tokenPriceInDollars = $asset.tokenInfo_tokenPriceDe6.toNumber() / 1e6
  const orderTotal = tokenPriceInDollars * getTokenQuantity();

  const assetMicroInfo = (
    <div className={s.assetMicroInfo}>
      <img className={s.assetMicroInfo__image} src="https://ns.clubmed.com/dream/RESORTS_3T___4T/Asie_et_Ocean_indien/Bali/169573-1lng9n8nnf-swhr.jpg" alt="" />
      <div className={s.assetMicroInfo__description}>
        <h4>
          {$asset.name}, {$asset.title}
        </h4>
        <div>
          Jl. Pantai Batu Bolong No.44
        </div>
        <small>
          {$asset.description}
        </small>
      </div>
    </div>
  )

  function renderInitialStep() {
    return (
      <div className={s.info}>
        <div className={s.infoMain}>
          <h3 className={s.investmentSummaryTitle}>Investment Summary</h3>
          {assetMicroInfo}
        </div>
        <div className={s.controls}>
          <div className={s.tokenQuantityTitle}>Token Quantity</div>
          <div className={s.tokenQuantityInputWrap}>
            <button
              type="button"
              className={classNames(
                s.tokenQuantityButton,
                s.tokenQuantityButtonRemove,
              )}
              onClick={() =>
                setTokenQuantity((quantity) => {
                  const newQuantity = getTokenQuantity(quantity) - 1;
                  return newQuantity > 0 ? newQuantity : 1;
                })
              }
            >
              -
            </button>
            <input
              type="text"
              className={s.tokenQuantityInput}
              value={tokenQuantity}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setTokenQuantity(isNaN(value) ? "" : value);
              }}
            />
            <button
              type="button"
              className={classNames(
                s.tokenQuantityButton,
                s.tokenQuantityButtonAdd,
              )}
              onClick={() => setTokenQuantity((quantity) => getTokenQuantity(quantity) + 1)}
            >
              +
            </button>
          </div>
          <div>${tokenPriceInDollars} / Token</div>
          <div>{$assetComputed?.tokensLeft} available</div>
        </div>
      </div>
    );
  }

  function renderBillingStep() {
    return (
      <div className={s.billingStep}>
        <div className={classNames(s.billingType, s['billingType--disabled'])}>
          <h5 className={s.billingTypeTitle}>NEAR</h5>
          <p className={s.billingTypeDesc}>
            NEAR protocol
            <br />
            native token (N)
            <br />(<i>temporary unavailable</i>)
          </p>
        </div>
        <div
          className={classNames(s.billingType, {
            [s['billingType--selected']]: billingType === USDT,
          })}
          onClick={() => setBillingType(USDT)}
        >
          <h5 className={s.billingTypeTitle}>USDT</h5>
          <p className={s.billingTypeDesc}>
            stable coin ($)
          </p>
          <div className={s.yourBalance}>Your balance: ${balance}</div>
        </div>
      </div>
    );
  }

  function renderResultStep() {
    return (
      <div className={s.tyStep}>
        <div className={s.tyStep__info}>
          <h2>Congratulations</h2>
          <div className={s.tyStep__message}>
            Tokens are on the way. Please check your account.
          </div>
          <div>
            <Link href={paths.account()} passHref>
              <Button variant="contained">
                My Account
              </Button>
            </Link>
          </div>
        </div>
        {assetMicroInfo}
      </div>
    );
  }

  function renderCurrentStep() {
    switch (step) {
      case 0:
      default:
        return renderInitialStep();
      case 1:
        return renderBillingStep();
      case 2:
        return renderResultStep();
    }
  }

  function renderButton() {
    let text;
    let disabled = false;

    switch (step) {
      case 0:
        text = 'Continue to Payment';
        disabled = orderTotal === 0 || isNaN(orderTotal);
        break;
      case 1:
        text = 'Pay' + (billingType ? ` With ${billingType}` : '');
        disabled = !billingType;
        break;
      case 2:
        text = 'Continue';
        break;
    }

    return (
      <div className={s.submitWrap}>
        <Button
          className={classNames(s.submitButton, {
            [s.submitButtonDisabled]: disabled,
          })}
          disabled={disabled}
          variant="contained"
          onClick={onCtaClick}
        >
          {text}
        </Button>
      </div>
    );
  }

  return (
    <div className={s.investPage}>
      <div className={s.container}>
        <h2>Invest</h2>
        <div className={s.main}>
          {renderCurrentStep()}
          {
            step < 2
              ?
              <div className={s.orderSummary}>
                <h3 className={s.orderSummaryTitle}>Order Summary</h3>
                <div className={s.orderTotal}>
                  <span className={s.orderTotalTitle}>Order Total</span>
                  <span className={s.orderTotalValue}>${isNaN(orderTotal) ? 0 : orderTotal}</span>
                </div>
                {renderButton()}
              </div>
              : null
          }
        </div>
      </div>
    </div>
  );
};
