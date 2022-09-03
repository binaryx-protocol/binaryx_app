import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  amountOfMoney: number;
};

const WithdrawBlock: FC<Props> = (data: Props) => {
  return (
    <section className={s.withdraw}>
      <div className={s.info}>
        <p>Current Rent Balance (USD)</p>
        <div className={s.withdrawBottom}>
          <h2>${data.amountOfMoney}</h2>
          <button className={s.withdrawBtn}>Withdraw</button>
        </div>
      </div>
    </section>
  );
};

export default WithdrawBlock;
