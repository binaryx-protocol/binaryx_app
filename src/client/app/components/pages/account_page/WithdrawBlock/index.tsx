import { FC } from 'react';
import s from './styles.module.scss';
import {truncateCents} from "../../../../utils/formatNumber";

type Props = {
  amountOfMoney: number
  onWithdraw: () => void
};

const WithdrawBlock: FC<Props> = ({ amountOfMoney, onWithdraw }: Props) => {
  return (
    <section className={s.withdraw}>
      <div className={s.info}>
        <p>Current Rent Balance (USD)</p>
        <div className={s.withdrawBottom}>
          <h2>${truncateCents(amountOfMoney)}</h2>
          <button className={s.withdrawBtn} onClick={onWithdraw}>Withdraw</button>
        </div>
      </div>
    </section>
  );
};

export default WithdrawBlock;
