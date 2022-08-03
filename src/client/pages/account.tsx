import React from 'react';
import { NextPage } from 'next';
import s from '../app/components/pages/account_page/styles.module.scss';
import WithdrawBlock from 'components/pages/account_page/WithdrawBlock';
import StatisticBlock from 'components/pages/account_page/StatisticBlock';
import OrderBlock from 'components/pages/account_page/OrderBlock';

const Account: NextPage<{ data: string }> = (props) => {
  const { data } = props;

  return (
    <div className={s.account_page}>
      <h1 className={s.heading}>Account Page</h1>

      <WithdrawBlock amountOfMoney={0.14} />

      <StatisticBlock
        currentAccountValue={50}
        totalRentEarned={50}
        propertiesEarned={0.61}
        totalPropertyValue={13}
      />

      <OrderBlock
        imageSrc={''}
        tokens={{
          tokensUserHave: 1,
          tokensFullAmount: 8700,
        }}
        boughtHouseLink={'#'}
        cocReturn={7.29}
        currentValue={50}
        currentRentBalance={14}
        totalRentEarned={0.4}
      />
      <OrderBlock
        imageSrc={''}
        tokens={{
          tokensUserHave: 1,
          tokensFullAmount: 8700,
        }}
        boughtHouseLink={'#'}
        cocReturn={7.29}
        currentValue={50}
        currentRentBalance={14}
        totalRentEarned={0.4}
      />
      {data}
    </div>
  );
};

export default Account;
