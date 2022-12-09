import s from "./styles.module.scss";
import ProgressBar from "../index";
type Props = {
  tokensLeft: number;
  tokensTotal: number;
}

export const ProgressBarText = (props: Props) =>{
  const {tokensTotal,tokensLeft} = props
  const collected = (tokensTotal - tokensLeft) / tokensTotal * 100;
  const tokensLeftPercent = tokensLeft / tokensTotal * 100;
  return(
    <div className={s.root}>
      <div className={s.tokensLeft}>
        <p className={s.tokens}>
          Tokens Left: {tokensLeft}
        </p>
        <p>
          Total: {tokensTotal} Tokens
        </p>
      </div>
      <ProgressBar progress={tokensLeftPercent}/>
      <p className={s.collected}>Collected: {collected}%</p>
    </div>
  )
}
