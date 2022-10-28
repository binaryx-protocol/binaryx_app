import clsx from 'clsx'
import s from "./Button.module.scss";

type Props = {
  children: React.ReactNode
  className?: string
}

export const Button = (props: Props) => {
  const { className, children, ...rest } = props

  return (
    <button className={clsx(className, s.root)} {...rest}>
      {children}
    </button>
  )
}
