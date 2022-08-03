import { FC } from 'react';
import s from './styles.module.scss';

interface Props {
  amountOfMoney: number;
}

const WithdrawBlock: FC<Props> = (data: Props) => {
  return (
    <section className={s.withdraw}>
      <div className="info">
        <p>Current Rent Balance (USD)</p>
        <h2>${data.amountOfMoney}</h2>
      </div>
      <div>
        <button className={s.withdrawBtn}>Withdraw</button>
      </div>
    </section>
  );
};

export default WithdrawBlock;
