import React, { FC, useState } from 'react';
import s from './styles.module.scss';
import useDeals from 'hooks/useDeals';
import { useRouter } from 'next/router';
import classNames from 'classnames';
import Button from '@mui/material/Button';

const InvestPage: FC = () => {
  const { assetId = '' } = useRouter().query;
  const deal = useDeals({ id: assetId as string }).deals[0];
  const [tokenQuantity, setTokenQuantity] = useState(1);

  if (!deal) {
    return <div>Id not found</div>;
  }

  return (
    <div className={s.investPage}>
      <div className={s.container}>
        <div className=''>
          <h2>Invest</h2>
          <div className={s.main}>
            <div className={s.info}>
              <div className={s.infoMain}>
                <h3 className={s.investmentSummaryTitle}>Investment Summary</h3>
                <div className={s.assetInfo}>
                  <div className={s.imageWrap}>
                    <img
                      src={deal.images[0]?.src}
                      width={180}
                      className={s.image}
                    />
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
                    type='button'
                    className={classNames(s.tokenQuantityButton, s.tokenQuantityButtonRemove)}
                    onClick={() => setTokenQuantity(quantity => quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type='text'
                    className={s.tokenQuantityInput}
                    value={tokenQuantity}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      setTokenQuantity(isNaN(value) ? undefined : value);
                    }}
                  />
                  <button
                    type='button'
                    className={classNames(s.tokenQuantityButton, s.tokenQuantityButtonAdd)}
                    onClick={() => setTokenQuantity(quantity => quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div>{deal.tokenPrice} / Token</div>
                <div>{deal.tokensLeft} available</div>
              </div>
            </div>
            <div className={s.orderSummary}>
              <h3 className={s.orderSummaryTitle}>Order Summary</h3>
              <div className={s.orderTotal}>
                <span className={s.orderTotalTitle}>Order Total</span>
                <span className={s.orderTotalValue}>$50</span>
              </div>
              <div className={s.submitWrap}>
                <Button className={s.submitButton} variant='contained'>
                  Continue to Payment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestPage;
