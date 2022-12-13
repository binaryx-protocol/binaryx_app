import s from './styles.module.scss'
import clsx from "clsx";
import {AssetListingStatus} from "../../../types";

type Props = {
  assetListingStatus: AssetListingStatus
}
export const StatusBar = (props: Props) => {
  const {assetListingStatus} = props;
  return (
    <div className={s.root}>
      <div className={clsx(s.statusElem)}>
        <div className={s.statusElemContent}>
          <div
            className={clsx(s.statusNumber, assetListingStatus === AssetListingStatus.generalInfo && s.activeNumber, assetListingStatus > AssetListingStatus.generalInfo && s.successNumber)}>1
          </div>
          <div className={s.line}></div>
        </div>
        <div
          className={clsx(s.description, assetListingStatus === AssetListingStatus.generalInfo && s.activeDescription, assetListingStatus > AssetListingStatus.generalInfo && s.successDescription)}>General
          Information
        </div>
      </div>
      <div className={clsx(s.statusElem)}>
        <div className={s.statusElemContent}>
          <div
            className={clsx(s.statusNumber, assetListingStatus === AssetListingStatus.legalInfo && s.activeNumber, assetListingStatus > AssetListingStatus.legalInfo && s.successNumber)}>2
          </div>
          <div className={s.line}></div>
        </div>
        <div
          className={clsx(s.description, assetListingStatus === AssetListingStatus.legalInfo && s.activeDescription, assetListingStatus > AssetListingStatus.legalInfo && s.successDescription)}>Legal
          Info
        </div>
      </div>
      <div className={clsx(s.statusElem)}>
        <div className={s.statusElemContent}>
          <div
            className={clsx(s.statusNumber, assetListingStatus === AssetListingStatus.investmentAndReturn && s.activeNumber, assetListingStatus > AssetListingStatus.investmentAndReturn && s.successNumber)}>3
          </div>
          <div className={s.line}></div>
        </div>
        <div
          className={clsx(s.description, assetListingStatus === AssetListingStatus.investmentAndReturn && s.activeDescription, assetListingStatus > AssetListingStatus.investmentAndReturn && s.successDescription)}>Investments
          & Return
        </div>
      </div>
      <div className={clsx(s.statusElem)}>
        <div className={s.statusElemContent}>
          <div
            className={clsx(s.statusNumber, assetListingStatus === AssetListingStatus.rentalAndManagement && s.activeNumber, assetListingStatus > AssetListingStatus.rentalAndManagement && s.successNumber)}>4
          </div>
        </div>
        <div
          className={clsx(s.description, assetListingStatus === AssetListingStatus.rentalAndManagement && s.activeDescription, assetListingStatus > AssetListingStatus.rentalAndManagement && s.successDescription)}>Rental
          & Management
        </div>
      </div>

    </div>
  )
}
