import s from './styles.module.scss'
import {useRef} from "react";
import clsx from "clsx";

type Props = {
  balance: number;
  validationInvestError: string;
  validateInput: (e: any) => void;
  setInvestAmount: (value: number) => void;
}
export const InvestInput = (props: Props) => {
  const {balance, setInvestAmount, validationInvestError, validateInput} = props
  const inputRef = useRef(null);
  const setMax = () => {
    // @ts-ignore
    inputRef.current.value = balance
  }
  return (
    <>
      <form className={clsx(s.inputWrapper, !!validationInvestError && s.inputInvalid)}>
        <input placeholder={'Enter Amount'} className={s.input} ref={inputRef} onChange={e => {
          validateInput(e)
          setInvestAmount(Number(e.target.value))
        }}
               type={"number"}/>
        <p className={s.maxButton} onClick={setMax}>Max</p>
      </form>
      {!!validationInvestError && <p className={s.error}>{validationInvestError}</p>}
    </>
  )
}
