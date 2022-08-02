import s from './styles.module.scss';

interface Props {
  amountOfMoney: number;
}

const WithdrawBlock = (data: Props) => {
  return (
    <section className={s.withdraw}>
      <div className="info">
        <p>Current Rent Balance (USD)</p>
        <h2>${data.amountOfMoney}</h2>
      </div>
      <div>
        <button>Withdraw</button>
      </div>
    </section>
  );
};

export default WithdrawBlock;
