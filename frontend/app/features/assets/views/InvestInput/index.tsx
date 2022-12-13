import s from './styles.module.scss'
import clsx from "clsx";
import React from "react";

type Props = {
  validationInvestError: string;
  validateInput: (value: string) => void;
  investAmount: string;
  setInvestAmount: (value: string) => void;
  tokensLeft: number;
}
export const InvestInput = (props: Props) => {
  const {tokensLeft, setInvestAmount, validationInvestError, validateInput, investAmount} = props
  const setMax = () => {
    setInvestAmount(tokensLeft.toString());
  }
  const onlyNumbers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = /^[0-9\b]+$/;
    if (e.target.value === '' || regExp.test(e.target.value)) {
      setInvestAmount(e.target.value);
    }
  }

  return (
    <>
      <form className={clsx(s.inputWrapper, !!validationInvestError && s.inputInvalid)}>
        <input placeholder={'Enter LP Token Amount'} value={investAmount} className={s.input} onChange={e => {
          validateInput(investAmount)
          onlyNumbers(e)
        }}
        />
        <p className={s.maxButton} onClick={setMax}>Max</p>
      </form>
      {!!validationInvestError && <p className={s.error}>{validationInvestError}</p>}
    </>
  )
}
