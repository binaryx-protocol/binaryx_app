import {HeaderController} from "../header";

export const DefaultLayout = ({ children }: { children: any }) => {
  return (
    <>
      <HeaderController />
      {children}
    </>
  )
}
