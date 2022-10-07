import s from "./styles.module.scss";
import React, { FC } from "react";

const TabDetails = () => {
  return (
    <div className={s.tabDetails}>
      <h3 className={s.title}>Investment Summary</h3>
      <ul className={s.investmentSummaryList}>
        <li className={s.investmentSummaryListItem}>
          <h4 className={s.investmentSummaryListItemTitle}>Total Investment</h4>
          <div className={s.investmentSummaryListItemValue}>$341,850</div>
        </li>
        <li className={s.investmentSummaryListItem}>
          <h4 className={s.investmentSummaryListItemTitle}>Token Price</h4>
          <div className={s.investmentSummaryListItemValue}>$50</div>
        </li>
        <li className={s.investmentSummaryListItem}>
          <h4 className={s.investmentSummaryListItemTitle}>Total Tokens</h4>
          <div className={s.investmentSummaryListItemValue}>9999</div>
        </li>
      </ul>
      <div>
        <h3 className={s.title}>About the property</h3>
        <div className={s.description}>
          This property is a recently renovated, fully occupied Duplex and is
          located in Lakewood, Ohio. Lakewood is a safe, affluent suburb of Ohio
          with great schools and a thriving rental market. The renovations were
          completed in the past few months and include adding a 4th bedroom to
          each unit, a brand new bathroom, one fully new kitchen with butcher
          block countertops and a breakfast bar, and much more.
        </div>
      </div>
    </div>
  );
};

export default TabDetails;
