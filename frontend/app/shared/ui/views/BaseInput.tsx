import clsx from 'clsx'
import s from "./BaseInput.module.scss";
import React from "react";

type Props = {
  title: string;
  placeholder: string;
  className?: string
  onChange: any
  onBlur: any;
  inputProps: any
}

export const BaseInput = ((props: Props) => {
  const {className, title, placeholder, onChange, onBlur, inputProps} = props

  return (
    <div>
      <p className={s.title}>{title}</p>
      <input type="text" className={clsx(className, s.root)} placeholder={placeholder} onChange={onChange}
             onBlur={onBlur} {...inputProps}/>
    </div>
  )
})
