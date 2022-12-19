import s from './styles.module.scss';
import Image from "next/image";
import detailsIcon from '../../../../../public/svg/details.svg'
import {ProgressBarText} from "../ProgressBar/ProgressBarText";
import {Button} from "../../../../shared/ui/views/Button";
import {InvestInput} from "../InvestInput";
import {UiAssetInvestForm} from "../../types";

type InvestBlockProps = {
  tokensLeft: number,
  tokensTotalSupply: number,
  irr: number,
  coc: number,
  id: number,
  balance: number;
  account: string;
  form: UiAssetInvestForm,
  onChangeForm: ({
                   values,
                   touches
                 }: { values: UiAssetInvestForm['values'], touches: UiAssetInvestForm['touches'] }) => void;
  onFormSubmit: any;
}

export const AssetInvest = ({
                              irr,
                              coc,
                              id,
                              balance,
                              account,
                              tokensLeft,
                              tokensTotalSupply,
                              onChangeForm,
                              form,
                              onFormSubmit
                            }: InvestBlockProps) => {
  return (
    <div className={s.root}>
      <div className={s.tokenPrice}>
        <p className={s.tokenPrice_text}>Token Price</p>
        <p className={s.tokenPrice_text}><span className={s.tokenPrice_value}>50</span> USDT</p>
      </div>
      {account && <form className={s.investInput}>
        <InvestInput inputName={"amount"} tokensLeft={tokensLeft} form={form} onChange={onChangeForm}/>
        <p className={s.total}>Total: <span className={s.balance}>{balance.toFixed(2)} USDT</span></p>
      </form>}
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
      <Button className={s.buyTokensButton} onClick={onFormSubmit}>
        Buy Tokens
      </Button>
    </div>
  );
};
