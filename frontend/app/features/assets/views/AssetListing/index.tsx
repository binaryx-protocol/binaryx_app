import s from './styles.module.scss'
import React, {useState} from "react";
import Image from "next/image";
import {AssetListingStatus} from "../../types";
import {WelcomeScreen} from "./WelcomeScreen";
import {LastScreen} from "./LastScreen";
import {StatusBar} from "./StatusBar";

export const AssetListing = () => {
  const [assetListingStatus, setAssetListingStatus] = useState<AssetListingStatus>(AssetListingStatus.welcome)
  console.log(assetListingStatus)
  return (
    <div className={s.root}>
      <div className={s.navigation}>
        <div className={s.navigationText}><span className={s.navigationDisabled}>Home</span> · <span
          className={s.navigationActive}>List Property</span></div>
        <div className={s.backButton}>
          <div className={s.backButtonIconWrapper}>
            <Image src={'/svg/arrow.svg'} alt={'paper'} width={15} height={15} className={s.backButtonIcon}/>
          </div>
          <p className={s.backText}>
            Add Property
          </p>
        </div>
      </div>
      {assetListingStatus === AssetListingStatus.welcome &&
        <div className={s.infoScreen}>
          <WelcomeScreen onStatusChange={setAssetListingStatus}/>
        </div>
      }
      {assetListingStatus > AssetListingStatus.welcome && assetListingStatus < AssetListingStatus.lastScreen &&
      <div className={s.mainForms}>
        <StatusBar assetListingStatus={assetListingStatus}/>

      </div>
      }
      {assetListingStatus === AssetListingStatus.lastScreen &&
        <div className={s.infoScreen}>
          <LastScreen onStatusChange={setAssetListingStatus}/>
        </div>
      }
    </div>
  )
}
