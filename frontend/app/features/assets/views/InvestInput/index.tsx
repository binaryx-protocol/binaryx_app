import s from './styles.module.scss'
import {useRef, useState} from "react";
import {tokenAmountValidator} from "../../models/tokenBuyValidator";
import clsx from "clsx";

type Props = {
  balance: number;
  tokensLeft: number;
  tokenPrice: number;
  setInvestAmount: (value: number) => void;
  setValidationInvestError: (value: string) => void
  validationInvestError: string;
}
export const InvestInput = (props: Props) => {
  const {balance, setInvestAmount, validationInvestError, setValidationInvestError, tokensLeft,tokenPrice} = props
  const inputRef = useRef(null);
  const setMax = () => {
    // @ts-ignore
    inputRef.current.value = balance
  }
  const validateInput = async (e: any) => {
    const amount = Number(e.target.value);
    const res = await tokenAmountValidator.isAmountValid({amount}, tokensLeft, balance, tokenPrice)
    if (typeof res === 'string') {
      setValidationInvestError(res);
    } else {
      setValidationInvestError('')
    }
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
