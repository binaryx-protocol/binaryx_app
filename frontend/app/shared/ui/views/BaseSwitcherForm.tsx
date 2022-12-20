import {useState} from "react";
import clsx from "clsx";
import s from './BaseSwitcherForm.module.scss'

type Props = {
  leftTitle: string;
  rightTitle: string;
  name: string;
  onSwitch: any;
  title?: string;
  classname?: string;
}

export const BaseSwitcherForm = (props: Props) => {
  const {leftTitle, rightTitle,  onSwitch, name, title, classname = ''} = props
  const [leftSwitchActive, setLeftSwitchActive] = useState(true);
  const switchValue = (leftActive: boolean) => {
    setLeftSwitchActive(leftActive);
    const value = leftActive ? leftTitle : rightTitle;
    onSwitch(name, value)
  }
  return (
    <div className={classname}>
      {title &&  <p className={s.title}>{title}</p>}
      <div className={s.switcherWrapper}>
        <div className={clsx(s.switcherElem, leftSwitchActive ? s.active : s.inactive)}
             onClick={() => switchValue(true)}>
          <p>{leftTitle}</p>
        </div>
        <div className={clsx(s.switcherElem, !leftSwitchActive ? s.active : s.inactive)}
             onClick={() => switchValue(false)}>
          <p>{rightTitle}</p>
        </div>
      </div>
    </div>
  )
}
