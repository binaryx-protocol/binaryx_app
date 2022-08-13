import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  imageSrc: string;
  tokens: {
    tokensUserHave: number;
    tokensFullAmount: number;
  };
  boughtHouseLink: string;
  cocReturn: number;
  currentValue: number;
  currentRentBalance: number;
  totalRentEarned: number;
};

const OrderBlock: FC<Props> = (data: Props) => {
  const percentageOfTokens =
    (data.tokens.tokensUserHave * 100) / data.tokens.tokensFullAmount;

  return (
    <section className={s.orders}>
      <img className={s.boughtHouseImage} src={data.imageSrc} alt="order" />
      <div className={s.boughtHouse}>
        <a href={data.boughtHouseLink}>Bought House</a>
        <div className={s.tokens}>
          <p>Tokens</p>
          <p>
            <strong>{data.tokens.tokensUserHave}</strong> of{' '}
            {data.tokens.tokensFullAmount} ({percentageOfTokens.toFixed(2)})
          </p>
        </div>
        <div className={s.info}>
          <div className="cocReturn">
            <p>Your CoC Return</p>
            <strong>{data.cocReturn}%</strong>
          </div>
          <div className="currentValue">
            <p>Current Value</p>
            <strong>${data.currentValue}</strong>
          </div>
        </div>
      </div>
      <div className={s.totalRentBalance}>
        <div className="currentRentBalance">
          <p>Current Rent Balance</p>
          <strong>${data.currentRentBalance}</strong>
        </div>
        <div className="totalRent">
          <p>Total Rent Earned</p>
          <strong>${data.totalRentEarned}</strong>
        </div>
      </div>
    </section>
  );
};

export default OrderBlock;
