import clsx from "clsx";
import s from './styles.module.scss'

type Props = {
  classname: string;
  children: any;
}
export const IconWrapper = (props: Props) => {
  const {children, classname} = props
  console.log(classname)

  return (
    <div className={clsx(s.root, classname)}>
      {children}
    </div>
  )
}
