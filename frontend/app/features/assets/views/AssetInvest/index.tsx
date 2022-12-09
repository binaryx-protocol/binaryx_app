import s from './styles.module.scss';
import Image from "next/image";
import detailsIcon from '../../../../../public/svg/details.svg'
import {ProgressBarText} from "../ProgressBar/ProgressBarText";
import {Button} from "../../../../shared/ui/views/Button";
import {InvestInput} from "../InvestInput";

type InvestBlockProps = {
  tokensLeft: number,
  progress: number,
  irr: number,
  coc: number,
  id: number,
  balance: number;
  account: string;
}

export const AssetInvest = ({progress, tokensLeft, irr, coc, id, balance, account}: InvestBlockProps) => {
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
      <ProgressBarText tokensLeft={4456} tokensTotal={10000}/>
      <Button className={s.buyTokensButton} disabled>
        Buy Tokens
      </Button>
    </div>
  );
};


// <div className={s.investBlock}>
//   <div className={s.progress}>
//     <LinearProgress
//       variant="buffer"
//       valueBuffer={100}
//       value={progress}
//       className={s.progressBar}
//     />
//     <div className={s.progressValues}>
//       <span className={s.progressValue}>{progress}%</span>
//       <span className={s.tokensLeft}>{tokensLeft} tokens left</span>
//     </div>
//   </div>
//   <div className={s.info}>
//     <div className={s.infoItem}>
//       <span className={s.infoItemTitle}>Projected IRR</span>
//       <span className={s.infoItemValue}>{irr}%</span>
//     </div>
//     <div className={s.infoItem}>
//       <span className={s.infoItemTitle}>CoC Return</span>
//       <span className={s.infoItemValue}>{coc}%</span>
//     </div>
//   </div>
//   <div className={s.invest}>
//     <Link href={paths.investAsset({ id })}>
//       <a className={s.investButton}>INVEST</a>
//     </Link>
//   </div>
// </div>
