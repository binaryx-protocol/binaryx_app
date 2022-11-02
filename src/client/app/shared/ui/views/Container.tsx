import clsx from 'clsx'
import s from "./Container.module.scss";
import React from "react";

type Props = {
  children: React.ReactNode
  className?: string
}

export const Container = ({ className, children }: Props) => {
  return (
    // @ts-ignore
    <div className={clsx(s.container, className)}>
      {children}
    </div>
  )
}
