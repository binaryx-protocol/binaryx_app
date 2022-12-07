import s from './DefaultLayout.module.scss'
import {HeaderController} from "../header";
import {useAtomValue} from "jotai";
import {useConnect} from "wagmi";

export const DefaultLayout = ({ children }: { children: any }) => {
    const {isError, error} = useConnect()

  return (
    <div className={s.defaultLayout}>
      <HeaderController />
      {
          isError
        ? <div className={s.errors}>
            {`${error}`}
          </div>
          : null
      }
      {children}
    </div>
  )
}
