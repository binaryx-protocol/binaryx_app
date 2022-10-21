import s from './styles.module.scss';
import LogoutIcon from '@mui/icons-material/Logout';
import WithdrawBlock from 'components/pages/account_page/WithdrawBlock';
import StatisticBlock from 'components/pages/account_page/StatisticBlock';
import OrderBlockView from "../../../../components/pages/account_page/OrderBlock/OrderBlockView";
import * as accountModel from "../../models/accountModel";
import {useAtomValue, useSetAtom} from "jotai";
import {useEffect} from "react";

export const AccountController = () => {
  const doLoadMyRewards = useSetAtom(accountModel.$doLoadMyRewards)
  const accountInfo = useAtomValue(accountModel.$accountInfo)

  useEffect(() => {
    doLoadMyRewards()
  }, []);
  const rewardsAmount = 500

  if (!accountInfo) {
    return null
  }

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
          totalRentEarned={-1}
          propertiesEarned={accountInfo.totalRewards}
          totalPropertyValue={'N/A'}
        />
      </div>

      <div className={s.orderSection}>
        {accountInfo.rewards.map((reward, i) => {
          return <OrderBlockView
            key={i}
            title={reward.asset.title}
            imageSrc="https://ns.clubmed.com/dream/RESORTS_3T___4T/Asie_et_Ocean_indien/Bali/169573-1lng9n8nnf-swhr.jpg"
            tokens={{
              tokensUserHave: -1,
              tokensFullAmount: reward.asset.tokenInfo_totalSupply,
            }}
            boughtHouseLink={'#'}
            cocReturn={reward.asset.tokenInfo_apr}
            currentValue={-1}
            currentRentBalance={reward.rewardAmount}
            totalRentEarned={-1}
          />;
        })}
      </div>
    </div>
  )
};
