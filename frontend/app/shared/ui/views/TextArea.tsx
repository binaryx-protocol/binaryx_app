import s from './TextArea.module.scss'
import React from "react";
import debounce from "lodash.debounce";
import {ListAssetsFormsNames} from "../../../features/assets/types";
import {UiForm} from "../../../../pkg/formType";

type Props = {
  placeholder: string;
  name: string;
  title: string;
  onChange: any;
}
export const TextArea = (props: Props) => {
  const {placeholder, title, onChange, name} = props
  return (
    <>
      <p className={s.title}>{title}</p>
      <textarea className={s.textArea} placeholder={placeholder} onChange={debounce(onChange, 1000)} name={name}/>
    </>
  )
}
