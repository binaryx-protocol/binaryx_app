import s from './DefaultLayout.module.scss'
import {HeaderController} from "../header";
import {useAtomValue} from "jotai";
import {$errorMessages} from "../../core/models/metaMaskModel";

export const DefaultLayout = ({ children }: { children: any }) => {
  const errors = useAtomValue($errorMessages)

  return (
    <>
      <HeaderController />
      {
        errors && errors.length
        ? <div className={s.errors}>
            {errors[0]}
          </div>
          : null
      }
      {children}
    </>
  )
}
