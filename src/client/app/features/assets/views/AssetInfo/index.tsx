import s from './styles.module.scss';
import React, { FC } from 'react';
import useAssets from 'hooks/useAssets';
import Tabs from './Tabs';
import { useRouter } from 'next/router';

type AssetInfoProps = {
  title: string,
  country: string,
  city: string,
  state: string,
  postalCode: string,
  line1: string,
  line2: string,
  infoItems: { type: string, value: string }[],
}

export const AssetInfo = ({ title, line1, line2, city, state, postalCode, country, infoItems }: AssetInfoProps) => {
  return (
    <div className={s.info}>
      <h2 className={s.title}>{title}</h2>
      <p className={s.addressLine1}>
        {line1} {line2}
      </p>
      <p className={s.addressLine2}>
        {city}, {state} {postalCode} {country}
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
