import {useState} from "react";
import clsx from "clsx";
import s from './BaseSwitcher.module.scss'
import {ListAssetsFormsNames} from "../../../features/assets/types";
import {UiForm} from "../../../../pkg/formType";

type Props = {
  leftTitle: string;
  rightTitle: string;
  name: string;
  onSwitch: any;
  form: UiForm<any>;
  formType: ListAssetsFormsNames;
  title: string;
  classname?: string;
}

export const BaseSwitcher = (props: Props) => {
  const {leftTitle, rightTitle, formType, form, onSwitch, name, title, classname = ''} = props
  const [leftSwitchActive, setLeftSwitchActive] = useState(true);
  const switchValue = (leftActive: boolean) => {
    setLeftSwitchActive(leftActive);
    const value = leftActive ? leftTitle : rightTitle;
    onSwitch(formType, form, name, value)
  }
  return (
    <div className={classname}>
      <p className={s.title}>{title}</p>
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
