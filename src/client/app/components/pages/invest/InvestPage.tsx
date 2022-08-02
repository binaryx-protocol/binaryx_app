import { FC } from 'react';
import s from './styles.module.scss';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const InvestPage: FC = () => {

  return (
    <div className={s.investPage}>
      <div className="">
        <Container maxWidth='lg'>
          <h1>Invest</h1>
          <div className={s.investmentSummary}>
            <Grid container spacing={0} maxWidth={1600}>
              <Grid item xs={8}>
                <h2>Investment Summary</h2>
              </Grid>
              <Grid item xs={3}>

              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default InvestPage;
