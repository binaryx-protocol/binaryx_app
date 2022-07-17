import s from "./styles.module.scss";
import React, { FC } from "react";
import useDeals from "hooks/useDeals";
import Tabs from "./Tabs";
import { useRouter } from "next/router";

const InvestBlock: FC = () => {
  const { deals } = useDeals();
  const { id } = useRouter().query;
  const item = deals?.find((deal) => deal.id === id);

  if (!item) {
    return null;
  }

  const { infoItems } = item;

  return (
    <div className={s.info}>
      <h2 className={s.title}>{item.title}</h2>
      <p className={s.addressLine1}>
        {item.line1} {item.line2}
      </p>
      <p className={s.addressLine2}>
        {item.city}, {item.state} {item.postalCode} {item.country}
      </p>
      <ul className={s.infoItems}>
        {infoItems.map((infoItem) => (
          <li key={infoItem.type} className={s.infoItem}>
            {infoItem.value}
          </li>
        ))}
      </ul>
      <Tabs />
    </div>
  );
};

export default InvestBlock;
