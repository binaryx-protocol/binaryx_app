import { FC } from 'react';
import { truncateCents } from 'utils/formatNumber';
import s from './styles.module.scss';

type Props = {
  currentAccountValue: number;
  totalRentEarned: number | string;
  propertiesEarned: number | string;
  totalPropertyValue: number | string;
};

const StatisticBlock: FC<Props> = (data: Props) => {
  return (
    <section className={s.statistics}>
      <div className="current-account-value">
        <p>Current Account Value</p>
        <h2>${truncateCents(data.currentAccountValue)}</h2>
      </div>
      <div className="total-rent-earned">
        <p>Total Rent Earned</p>
        <h2>${data.totalRentEarned}</h2>
      </div>
      <div className="properties-earned">
        <p>Properties Owned</p>
        <h2>{data.propertiesEarned}</h2>
      </div>
      <div className="total-property-value">
        <p>Total property value</p>
        <h2>${data.totalPropertyValue}</h2>
      </div>
    </section>
  );
};

export default StatisticBlock;
