import s from './styles.module.scss'
import clsx from "clsx";
import React, {useRef} from "react";
import {UiInputChangeEvent} from "../../../../types/globals";
import {UiAssetInvestForm} from "../../types";
import {UiForm} from "../../../../../pkg/formType";

type Props = {
  tokensLeft: number;
  form: UiAssetInvestForm,
  onChange: ({values, touches}: { values: UiAssetInvestForm['values'], touches: UiAssetInvestForm['touches'] }) => void;
  inputName: keyof UiAssetInvestForm["values"];
}
export const InvestInput = (props: Props) => {
  const {tokensLeft, onChange, form, inputName} = props
  const inputRef = useRef<HTMLInputElement>(null);

  const setMax = () => {
    const values = {
      ...form.values,
      // @ts-ignore
      [inputRef.current.name]:tokensLeft.toString()
    };
    onChange({values, touches: form.touches})  }

  const onlyNumbers = (e: UiInputChangeEvent) => {
    const regExp = /^[0-9\b]+$/;
    if (e.target.value === '' || regExp.test(e.target.value)) {
      return e.target.value;
    } else{
      return ''
    }
  }

  const onChangeLocal = (e: UiInputChangeEvent) => {
    const values = {
      ...form.values,
      [e.target.name]: onlyNumbers(e),
    };
    onChange({values, touches: form.touches})
  }

  const inputProps = (form: UiForm<any>, name: keyof UiAssetInvestForm['values']) => {
    const props = {
      name,
      value: form.values[name],
      ariaInvalid: form.errors[name] && form.errors[name],
    };
    return props
  }
  return (
    <>
      <div className={clsx(s.inputWrapper, inputProps(form, inputName).ariaInvalid && s.inputInvalid)}>
        <input placeholder={'Enter LP Token Amount'} className={s.input}
               onChange={e => {
                 onChangeLocal(e)
               }}
               {...inputProps(form, 'amount')}
          ref={inputRef}
        />
        <p className={s.maxButton} onClick={setMax}>Max</p>
      </div>
      {inputProps(form, inputName).ariaInvalid && <p className={s.error}>{inputProps(form, inputName).ariaInvalid}</p>}
    </>
  )
}
