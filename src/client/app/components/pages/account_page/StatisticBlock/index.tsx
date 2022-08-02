import s from './styles.module.scss';

interface Props {
  currentAccountValue: number;
  totalRentEarned: number;
  propertiesEarned: number;
  totalPropertyValue: number;
}

const StatisticBlock = (data: Props) => {
  return (
    <section className={s.statistics}>
      <div className="current-account-value">
        <p>Current Account Value</p>
        <h2>${data.currentAccountValue}</h2>
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
