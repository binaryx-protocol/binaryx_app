import React, { FC } from 'react';
import s from './styles.module.scss';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import useDeals from '../../../hooks/useDeals';
import { useRouter } from 'next/router';

const InvestPage: FC = () => {
  const { assetId = "" } = useRouter().query;
  const deal = useDeals({ id: assetId as string }).deals[0];

  if (!deal) {
    return <div>Id not found</div>;
  }

  return (
    <div className={s.investPage}>
      <div className="">
        <Container maxWidth='lg'>
          <h1>Invest</h1>
          <div className={s.investmentSummary}>
            <Grid container spacing={0} maxWidth={1600}>
              <Grid item xs={8}>
                <h2>Investment Summary</h2>
                <div className={s.info}>
                  <div className={s.infoMain}>
                    <h3 className={s.assetTitle}>{deal.title}</h3>
                    <div className={s.addressLine1}>
                      {deal.line1} {deal.line2}
                    </div>
                    <div className={s.addressLine2}>
                      {deal.city}, {deal.state} {deal.postalCode} {deal.country}
                    </div>
                    <div className={s.imageWrap}>
                      <img
                        src={deal.images[0]?.src}
                        width={300}
                        className={s.image}
                      />
                    </div>
                  </div>
                  <div className={s.controls}>
                    <div className={s.tokenQuantityTitle}>Token Quantity</div>
                    <div className={s.tokenQuantityInputWrap}>
                      <button type="button" className={s.tokenQuantityButton}>-</button>
                      <input type="number" className={s.tokenQuantityInput} />
                      <button type="button" className={s.tokenQuantityButton}>+</button>
                    </div>
                    <div>{deal.tokenPrice} / Token</div>
                    <div>{deal.tokensLeft} available</div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={3}>
                Order Summary
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default InvestPage;
