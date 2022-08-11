import s from "./styles.module.scss";
import useDeals from "hooks/useDeals";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Info from "components/pages/deals/Info";
import InvestBlock from "components/pages/deals/InvestBlock";
import Gallery from "components/pages/deals/Gallery";
import { FC } from "react";

const DealPage: FC = () => {
  const { id } = useRouter().query;
  const item = useDeals({ id: id as string }).deals[0];

  if (!item) {
    return <div>Not found!!!</div>;
  }

  console.log("item", item);

  return (
    <div className={s.deal}>
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

export default DealPage;
