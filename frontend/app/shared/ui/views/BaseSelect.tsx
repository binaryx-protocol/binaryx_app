import s from './BaseSelect.module.scss'
import {ArrowIconWithoutLine} from "./ArrowIconWithoutLine";
import React, {useRef, useState} from "react";
import clsx from "clsx";
import {ListAssetsFormsNames} from "../../../features/assets/types";
import {UiForm} from "../../../../pkg/formType";

type Props = {
  placeholder: string;
  title: string;
  optionArray: string[] | number[]
  onChange: (element: HTMLInputElement) => void;
  inputProps: any;
  classname?: string;
}

export const BaseSelect = (props: Props) => {
  const {placeholder, optionArray, inputProps, onChange, title, classname} = props;
  const [closeDropdown, setCloseDropdown] = useState(true);
  const inputRef = useRef<any>(null)
  const showElem = (value: string | number) => {
    // @ts-ignore
    inputRef.current.value = `${value}`;
    setCloseDropdown(true);
    onChange(inputRef.current)
  }
  return (
    <div className={clsx(s.selectWrapper, classname)}>
      <p className={s.title}>{title}</p>
      <div className={clsx(s.select, inputProps['aria-invalid'] && s.invalidInput)}
           onClick={() => setCloseDropdown(!closeDropdown)}>
        <input readOnly placeholder={placeholder} {...inputProps}
               ref={inputRef}/>
        <ArrowIconWithoutLine height={12} width={12}/>
      </div>
      <div className={clsx(s.option, closeDropdown && s.optionClosed)}>
        {optionArray.map((elem) => (
          <div key={elem} className={s.optionElem} onClick={() => showElem(elem)}>{elem}</div>
        ))}
      </div>
    </div>
  )
}
