import clsx from 'clsx'
import s from "./Button.module.scss";
import React from "react";

type Props = {
  children: React.ReactNode
  className?: string
  as?: 'a'
  color?: 'light'
}

export const Button = React.forwardRef((props: Props & React.HTMLProps<HTMLButtonElement>, ref) => {
  const { className, children, ...rest } = props

  const classes = {
    [s.light]: props.color === 'light'
  }

  const elementProps = {
    className: clsx(className, s.root, classes),
    ...rest,
  }

  const El = `${props.as || 'button'}` as keyof JSX.IntrinsicElements;

  return (
    // @ts-ignore
    <El {...elementProps} tabIndex={0} ref={ref}>
      {children}
    </El>
  )
})
