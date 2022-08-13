import { FC, useEffect, useState } from 'react';
import s from './styles.module.scss';
import useAssets from 'hooks/useAssets';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Button from '@mui/material/Button';
import assetContractService from '../../../services/assetContractService';
import paymentService from '../../../services/paymentService';
import formatLongNumber from '../../../utils/formatNumber';
import Result from './Result';
import AssetInfo from './AssetInfo';

const USN = 'USN';
// const NEAR = "NEAR";

const InvestPage: FC = () => {
  const router = useRouter();
  const { assetId = '', signMeta } = router.query;
  const asset = useAssets({ id: assetId as string }).assets[0];
  const [tokenQuantity, setTokenQuantity] = useState<number | string>(1);
  const [step, setStep] = useState(0);
  const [billingType, setBillingType] = useState('');
  const orderTotal = (formatLongNumber(asset?.tokenPrice)) * getTokenQuantity();

  useEffect(() => {
    if (signMeta === 'success') {
      setStep(2);
    }
  }, [signMeta]);

  if (!asset) {
    return <div>Id not found</div>;
  }


  function handleSubmitButtonClick() {
    switch (step) {
      case 0:
        setStep(1);
        break;
      case 1:
        paymentService.handleInvest({
          assetId: asset.id,
          assetContractId: asset.contractId,
          tokenAmount: getTokenQuantity(),
          billingType,
        });
        break;
      case 2:
        router.push('/marketplace');
        break;
    }
  }

  function getTokenQuantity(qty = tokenQuantity): number {
    const result = typeof tokenQuantity === "string" ? parseInt(tokenQuantity) : tokenQuantity;
    if (isNaN(result)) {
      return 0;
    }

    return result;
  }

  function renderInitialStep() {
    return (
      <div className={s.info}>
        <div className={s.infoMain}>
          <h3 className={s.investmentSummaryTitle}>Investment Summary</h3>
          <AssetInfo asset={asset} />
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
          <div>${formatLongNumber(asset.tokenPrice)} / Token</div>
          <div>{asset.tokensLeft} available</div>
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
            [s['billingType--selected']]: billingType === USN,
          })}
          onClick={() => setBillingType(USN)}
        >
          <h5 className={s.billingTypeTitle}>USN</h5>
          <p className={s.billingTypeDesc}>
            NEAR protocol
            <br /> native stable-coin ($)
          </p>
        </div>
      </div>
    );
  }

  function renderResultStep() {
    return (
      <div className={s.resultStep}>
        <Result />
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
          onClick={handleSubmitButtonClick}
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
          <div className={s.orderSummary}>
            <h3 className={s.orderSummaryTitle}>Order Summary</h3>
            <div className={s.orderTotal}>
              <span className={s.orderTotalTitle}>Order Total</span>
              <span className={s.orderTotalValue}>${isNaN(orderTotal) ? 0 : orderTotal}</span>
            </div>
            {renderButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestPage;
