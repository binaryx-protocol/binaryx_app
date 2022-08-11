import { FC, useEffect, useState } from 'react';
import s from './styles.module.scss';
import useDeals from 'hooks/useDeals';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Button from '@mui/material/Button';
import mainContractService from '../../../services/mainContractService';
import paymentService from '../../../services/paymentService';
import formatLongNumber from '../../../utils/formatNumber';

const USN = 'USN';
// const NEAR = "NEAR";

const InvestPage: FC = () => {
  const router = useRouter();
  const { assetId = '', signMeta } = router.query;
  const deal = useDeals({ id: assetId as string }).deals[0];
  const [tokenQuantity, setTokenQuantity] = useState<number | string>(1);
  const [step, setStep] = useState(0);
  const [billingType, setBillingType] = useState('');

  useEffect(() => {
    if (signMeta === 'success') {
      setStep(2);
    }
  }, [signMeta]);

  if (!deal) {
    if (signMeta === 'success') {
      return renderResultStep();
    }
    return <div>Id not found</div>;
  }

  function handleSubmitButtonClick() {
    switch (step) {
      case 0:
        setStep(1);
        break;
      case 1:
        paymentService.handleInvest({
          tokenAmount: tokenQuantity,
          billingType,
        });
        break;
      case 2:
        router.push('/marketplace');
        break;
    }
  }


  function renderInitialStep() {
    return (
      <div className={s.info}>
        <div className={s.infoMain}>
          <h3 className={s.investmentSummaryTitle}>Investment Summary</h3>
          <div className={s.assetInfo}>
            <div className={s.imageWrap}>
              <img src={deal.images.images[0]?.src} width={180} className={s.image} />
            </div>
            <div>
              <h3 className={s.assetTitle}>{deal.title}</h3>
              <div className={s.addressLine1}>
                {deal.line1} {deal.line2}
              </div>
              <div className={s.addressLine2}>
                {deal.city}, {deal.state} {deal.postalCode} {deal.country}
              </div>
            </div>
          </div>
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
                  const newQuantity = quantity - 1;
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
                (isNaN(value) ? "" : value);
              }}
            />
            <button
              type="button"
              className={classNames(
                s.tokenQuantityButton,
                s.tokenQuantityButtonAdd,
              )}
              onClick={() => setTokenQuantity((quantity) => quantity + 1)}
            >
              +
            </button>
          </div>
          <div>${formatLongNumber(deal.tokenPrice)} / Token</div>
          <div>{deal.tokensLeft} available</div>
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
        Success
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
              <span className={s.orderTotalValue}>$50</span>
            </div>
            {renderButton()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestPage;
