import s from './styles.module.scss';
import * as accountModel from '../../models/accountModel';
import {useAtomValue, useSetAtom} from 'jotai';
import {useEffect} from 'react';
import {useAccount} from "wagmi";
import {PropertyCard} from "../../../../shared/ui/views/PropertyCard";
import {Button} from "../../../../shared/ui/views/Button";
import {ArrowIcon} from "../../views/svg/ArrowIcon";
import {DetailsTable} from "../../views/DetailsTable";
import {useWindowSize} from "../../../../hooks/useWindowSize";

export const AccountController = () => {
  const doLoadMyRewards = useSetAtom(accountModel.$doLoadMyRewards);
  const doClaimMyRewards = useSetAtom(accountModel.$doClaimMyRewards);
  const accountInfo = useAtomValue(accountModel.$accountInfo);
  const {isConnected, address} = useAccount()
  const {xs} = useWindowSize()

  useEffect(() => {
    if (isConnected) {
      doLoadMyRewards();
    }
  }, [isConnected]);

  const onWithdraw = () => {
    doClaimMyRewards();
  };

  if (!address || !accountInfo) {
    return <>Please connect your wallet first</>;
  }
  return (
    <>
      <div className={s.root}>
        <div className={s.totalPropertyInfoWrapper}>
          <div className={s.navigation}><span className={s.navigationHome}>Home</span> · <span
            className={s.navigationAsset}>Asset Overview</span></div>
          <div className={s.assetOverview_Text}>Asset Overview</div>
          <div className={s.totalPropertyInfo}>
            <div className={s.totalRentInfo}>
              <p className={s.totalRentInfo_text}>Total Rent Balance</p>
              <div className={s.rentBalanceClaim}>
                <p className={s.totalRentBalance_text}>${accountInfo.totalRewards.toFixed(2)}</p>
                <Button className={s.claimAllButton} onClick={onWithdraw}>
                  <div className={s.arrowWrapper}>
                    <ArrowIcon classname={s.arrowIcon} width={10} height={10}/>
                  </div>
                  <p>Claim All</p>
                </Button>
              </div>
              <div style={{marginTop: '40px'}}>
                <DetailsTable property={accountInfo}/>
              </div>
            </div>
            <div>
              {!xs && <p className={s.property}>Your Property</p>}
              {accountInfo && accountInfo.rewards.map((reward,i) =>(
                <PropertyCard property={reward} key={i}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
