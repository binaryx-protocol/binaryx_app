//@ts-nocheck

import s from './styles.module.scss';
import WithdrawBlock from 'components/pages/account_page/WithdrawBlock';
import StatisticBlock from 'components/pages/account_page/StatisticBlock';
import OrderBlockView from '../../../../components/pages/account_page/OrderBlock/OrderBlockView';
import * as accountModel from '../../models/accountModel';
import {useAtomValue, useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {paths} from '../../../../../pkg/paths';
import {Container} from '../../../../shared/ui/views/Container';
import {useAccount} from "wagmi";
import {PropertyCard} from "../../../../shared/ui/views/PropertyCard";
import SideMenuNavItem from "../../../assets/views/SideMenu/SideMenuNavItem";
import IconProperty from "../../../assets/views/SideMenu/icons/IconProperty";
import IconCoins from "../../../assets/views/SideMenu/icons/IconCoins";
import IconGift from "../../../assets/views/SideMenu/icons/IconGift";
import IconHistory from "../../../assets/views/SideMenu/icons/IconHistory";
import SideMenuDivider from "../../../assets/views/SideMenu/SideMenuDivider";
import IconSettings from "../../../assets/views/SideMenu/icons/IconSettings";
import IconNotification from "../../../assets/views/SideMenu/icons/IconNotification";
import SideMenu from "../../../assets/views/SideMenu";

export const AccountController = () => {
  const doLoadMyRewards = useSetAtom(accountModel.$doLoadMyRewards);
  const doClaimMyRewards = useSetAtom(accountModel.$doClaimMyRewards);
  const accountInfo = useAtomValue(accountModel.$accountInfo);
  const {isConnected, address} = useAccount()

  useEffect(() => {
    if (isConnected) {
      doLoadMyRewards();
    }
  }, [isConnected]);

  const onWithdraw = () => {
    doClaimMyRewards();
  };

  // if (!address) {
  //   return <>Please connect your wallet first</>;
  // }

  return (
    <div className={s.root}>
      <SideMenu className={s.pageMenu}>
        <SideMenuNavItem icon={<IconProperty/>} title="Asset Overview" url="/account-v2"/>
        <SideMenuNavItem icon={<IconCoins/>} title="Marketplace" url="/assets-v2"/>
        <SideMenuNavItem icon={<IconGift/>} title="Refer and Earn" url="#"/>
        <SideMenuNavItem icon={<IconHistory/>} title="Transaction" url="#"/>
        <SideMenuDivider/>
        <SideMenuNavItem icon={<IconSettings/>} title="Settings" url="#"/>
        <SideMenuNavItem icon={<IconNotification/>} title="Notifications" url="#"/>
      </SideMenu>
     <div className={s.totalPropertyInfoWrapper}>
       <div className={s.navigation}>Home . Asset Overview</div>
       <div className={s.assetOverview}>Asset Overview</div>
       <div className={s.totalPropertyInfo}>
           <div className={s.totalRentInfo}>
             <p>Total Rent Balance</p>
             <div>
               <div>
                 <p>$1 380.37</p>
                 <div>USD</div>
               </div>
               <div>
                 <p>$1 380.37</p>
                 <div>USD</div>
               </div>
             </div>
         </div>
         <div>
           <PropertyCard/>
         </div>
       </div>
     </div>
    </div>



    // <div className={s.mainView}>
    //   <Container>
    //     <h1 className={s.heading}>Account</h1>
    //
    //     <div className={s.statisticSection}>
    //       <WithdrawBlock
    //         amountOfMoney={accountInfo.totalRewards}
    //         onWithdraw={onWithdraw}
    //       />
    //
    //       <StatisticBlock
    //         currentAccountValue={
    //           accountInfo.totalPropertyValue +
    //           accountInfo.totalRewards
    //         }
    //         totalRentEarned={accountInfo.totalEarned}
    //         propertiesEarned={accountInfo.rewards.length}
    //         totalPropertyValue={accountInfo.totalPropertyValue}
    //       />
    //     </div>
    //
    //     <div className={s.orderSection}>
    //       {accountInfo.rewards.map((reward, i) => {
    //         return (
    //           <OrderBlockView
    //             key={i}
    //             title={reward.asset.title}
    //             imageSrc="https://ns.clubmed.com/dream/RESORTS_3T___4T/Asie_et_Ocean_indien/Bali/169573-1lng9n8nnf-swhr.jpg"
    //             tokens={{
    //               tokensUserHave: reward.balance,
    //               tokensFullAmount: reward.asset.tokenInfo_totalSupply,
    //             }}
    //             boughtHouseLink={paths.showAsset({ id: reward.assetId })}
    //             cocReturn={reward.asset.tokenInfo_apr}
    //             currentValue={reward.computed.currentValue}
    //             currentRentBalance={reward.rewardAmountDe6}
    //             // totalRentEarned={-1}
    //           />
    //         );
    //       })}
    //     </div>
    //   </Container>
    // </div>

  );
};
