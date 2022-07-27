import React from 'react';
import { NextPage } from 'next';
import s from '../app/components/pages/account_page/StatisticBlock/styles.module.scss';

const Account: NextPage<{ data: string }> = (props) => {
  const { data } = props;

  return (
    <div className={s.account_page}>
      <h1>Account Page</h1>

      <section className={s.withdraw}>
        <div className="info">
          <p>Current Rent Balance (USD)</p>
          <h2>$0.29</h2>
        </div>
        <div>
          <button>Withdraw</button>
        </div>
      </section>

      <section className={s.statistics}>
        <div className="current-account-value">
          <p>Current Account Value</p>
          <h2>$50,29</h2>
        </div>
        <div className="total-rent-earned">
          <p>Total Rent Earned</p>
          <h2>$0,63</h2>
        </div>
        <div className="properties-earned">
          <p>Properties Owned</p>
          <h2>1</h2>
        </div>
        <div className="total-property-value">
          <p>Total property value</p>
          <h2>$50.00</h2>
        </div>
      </section>

      <section className={s.orders}>
        <img src="" alt="order" />
        <div className={s.boughtHouse}>
          <a href="#">Bought House</a>
          <div className={s.tokens}>
            <p>Tokens</p>
            <p>
              <strong>1</strong> of 8780 (0.01%)
            </p>
          </div>
          <div className={s.info}>
            <div className="coc-return">
              <p>Your CoC Return</p>
              <strong>7.90%</strong>
            </div>
            <div className="current-value">
              <p>Current Value</p>
              <strong>$50.00</strong>
            </div>
          </div>
        </div>
        <div className={s.totalRentBalance}>
          <div className="current-rent-balance">
            <p>Current Rent Balance</p>
            <strong>$0.30</strong>
          </div>
          <div className="total-rent">
            <p>Total Rent Earned</p>
            <strong>$0.64</strong>
          </div>
        </div>
      </section>
      {data}
    </div>
  );
};

export default Account;
