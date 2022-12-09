import s from './styles.module.scss'
import {useRef} from "react";

type Props = {
  balance: number;
}
export const InvestInput = (props: Props) => {
  const {balance} = props
  const inputRef = useRef(null);
  const setMax = () => {
    // @ts-ignore
    inputRef.current.value = balance
  }
  return (
    <div className={s.inputWrapper}>
      <input placeholder={'Enter Amount'} className={s.input} ref={inputRef}/>
      <p className={s.maxButton} onClick={setMax}>Max</p>
    </div>
  )
}
