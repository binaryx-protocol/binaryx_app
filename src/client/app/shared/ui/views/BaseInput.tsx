import clsx from 'clsx'
import s from "./BaseInput.module.scss";
import React from "react";

type Props = {
 title: string;
 placeholder: string;
 className?: string
}

export const BaseInput = React.forwardRef((props: Props) => {
  const { className, title, placeholder } = props

  return (
  <div>
    <p className={s.title}>{title}</p>
    <input type="text" className={clsx(className, s.root)} placeholder={placeholder}/>
  </div>
  )
})
