import s from './styles.module.scss';
import LogoutIcon from '@mui/icons-material/Logout';
import WithdrawBlock from 'components/pages/account_page/WithdrawBlock';
import StatisticBlock from 'components/pages/account_page/StatisticBlock';
import formatLongNumber from "../../../../utils/formatNumber";
import OrderBlockView from "../../../../components/pages/account_page/OrderBlock/OrderBlockView";
import * as accountModel from "../../models/accountModel";
import {useAtomValue, useSetAtom} from "jotai";
import {useEffect} from "react";

export const AccountController = (props) => {
  const doLoadMyRewards = useSetAtom(accountModel.$doLoadMyRewards)
  useEffect(() => doLoadMyRewards(), []);
  const rewardsAmount = 500

  return (
    <div className={s.mainView}>
      <header className={s.header}>
        <div className={s.accountId}>
          0x...
          <LogoutIcon
            className={s.logoutButton}
            role="button"
            onClick={() => {}}
          />
        </div>
      </header>
      <h1 className={s.heading}>Account</h1>

      <div className={s.statisticSection}>
        <WithdrawBlock amountOfMoney={rewardsAmount} />

        <StatisticBlock
          currentAccountValue={'N/A'}
          totalRentEarned={600}
          propertiesEarned={700}
          totalPropertyValue={'N/A'}
        />
      </div>

      <div className={s.orderSection}>
        {[{ title: "Title",  }].map((asset, i) => {
          return <OrderBlockView
            key={i}
            title={asset.title}
            imageSrc="https://ns.clubmed.com/dream/RESORTS_3T___4T/Asie_et_Ocean_indien/Bali/169573-1lng9n8nnf-swhr.jpg"
            tokens={{
              tokensUserHave: 500,
              tokensFullAmount: 2500,
            }}
            boughtHouseLink={'#'}
            cocReturn={14}
            currentValue={3000}
            currentRentBalance={500}
            totalRentEarned={2500}
          />;
        })}
      </div>
    </div>
  )
};
