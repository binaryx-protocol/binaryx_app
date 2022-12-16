import s from './TextArea.module.scss'
import React from "react";
import debounce from "lodash.debounce";
import {ListAssetsFormsNames} from "../../../features/assets/types";
import {UiForm} from "../../../../pkg/formType";
import clsx from "clsx";

type Props = {
  placeholder: string;
  name: string;
  title: string;
  onChange: any;
  inputProps: any;
}
export const TextArea = (props: Props) => {
  const {placeholder, title, onChange, name, inputProps} = props
  return (
    <div>
      <p className={s.title}>{title}</p>
      <textarea className={clsx(s.textArea, inputProps['aria-invalid'] && s.invalidInput)} placeholder={placeholder}
                onChange={debounce(onChange, 1000)}
                name={name} aria-invalid={inputProps['aria-invalid']}/>
    </div>
  )
}
