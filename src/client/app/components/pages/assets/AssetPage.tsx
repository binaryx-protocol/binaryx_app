import s from './styles.module.scss';
import useAssets from 'hooks/useAssets';
import { useRouter } from 'next/router';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Info from 'components/pages/assets/Info';
import InvestBlock from 'components/pages/assets/InvestBlock';
import Gallery from 'components/pages/assets/Gallery';
import { FC } from 'react';

const AssetPage: FC = () => {
  const { id } = useRouter().query;
  const item = useAssets({ id: id as string }).assets[0];

  if (!item) {
    return <div>Not found!!!</div>;
  }

  return (
    <div className={s.asset}>
      <Gallery />
      <Container maxWidth="lg">
        <Grid container spacing={0} maxWidth={1600}>
          <Grid item xs={8}>
            <Info />
          </Grid>
          <Grid item xs={3}>
            <InvestBlock />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AssetPage;
