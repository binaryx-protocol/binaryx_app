import s from './styles.module.scss';
import Image from "next/image";
import detailsIcon from '../../../../../public/svg/details.svg'
import {ProgressBarText} from "../ProgressBar/ProgressBarText";
import {Button} from "../../../../shared/ui/views/Button";
import {InvestInput} from "../InvestInput";
import {useState} from "react";

type InvestBlockProps = {
  tokensLeft: number,
  tokensTotalSupply: number,
  irr: number,
  coc: number,
  id: number,
  balance: number;
  account: string;
}

export const AssetInvest = ({ irr, coc, id, balance, account, tokensLeft,tokensTotalSupply}: InvestBlockProps) => {
  return (
    <div className={s.root}>
      <div className={s.tokenPrice}>
        <p className={s.tokenPrice_text}>Token Price</p>
        <p className={s.tokenPrice_text}><span className={s.tokenPrice_value}>50</span> USDT</p>
      </div>
      {account && <div className={s.investInput}>
        <InvestInput balance={balance}/>
        <p className={s.total}>Total: <span className={s.balance}>{balance.toFixed(2)} USDT</span></p>
      </div>}
      <div className={s.infoBlock}>
        <div className={s.infoBlockElem}>
          <div className={s.detailsElem}>
            <p className={s.detailsElem_text}>Projected IRR</p>
            <Image src={detailsIcon} alt={'detailsIcon'} className={s.detailsIcon}/>
          </div>
          <p className={s.detailsPercent}>{irr}%</p>
        </div>
        <div className={s.infoBlockElem}>
          <div className={s.detailsElem}>
            <p className={s.detailsElem_text}>Cash On Cash</p>
            <Image src={detailsIcon} alt={'detailsIcon'} className={s.detailsIcon}/>
          </div>
          <p className={s.detailsPercent}>{coc}%</p>
        </div>
      </div>
      <ProgressBarText tokensLeft={tokensLeft} tokensTotal={tokensTotalSupply}/>
      <Button className={s.buyTokensButton} disabled>
        Buy Tokens
      </Button>
    </div>
  );
};
