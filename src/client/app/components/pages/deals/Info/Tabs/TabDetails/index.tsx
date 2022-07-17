import s from "./styles.module.scss";
import React, { FC } from "react";
import useDeals from "hooks/useDeals";
import { useRouter } from "next/router";

const TabDetails: FC = () => {
  const { deals } = useDeals();
  const { id } = useRouter().query;
  const item = deals?.find((deal) => deal.id === id);

  if (!item) {
    return null;
  }

  return (
    <div className={s.tabDetails}>
      <h3 className={s.title}>Investment Summary</h3>
      <ul className={s.investmentSummaryList}>
        <li className={s.investmentSummaryListItem}>
          <h4 className={s.investmentSummaryListItemTitle}>Total Investment</h4>
          <p className={s.investmentSummaryListItemValue}>$341,850</p>
        </li>
        <li className={s.investmentSummaryListItem}>
          <h4 className={s.investmentSummaryListItemTitle}>Token Price</h4>
          <p className={s.investmentSummaryListItemValue}>$50</p>
        </li>
        <li className={s.investmentSummaryListItem}>
          <h4 className={s.investmentSummaryListItemTitle}>Total Tokens</h4>
          <p className={s.investmentSummaryListItemValue}>9999</p>
        </li>
      </ul>
      <div>
        <h3 className={s.title}>About the property</h3>
        <p className={s.description}>
          This property is a recently renovated, fully occupied Duplex and is
          located in Lakewood, Ohio. Lakewood is a safe, affluent suburb of Ohio
          with great schools and a thriving rental market. The renovations were
          completed in the past few months and include adding a 4th bedroom to
          each unit, a brand new bathroom, one fully new kitchen with butcher
          block countertops and a breakfast bar, and much more.
        </p>
      </div>
    </div>
  );
};

export default TabDetails;
