import s from "./BaseModal.module.scss";
import {ReactNode} from "react";

type Props = {
    setIsOpen: (value: boolean) => void;
    children:ReactNode;
}

export const BaseModal = (props: Props)=>{
    const {setIsOpen,children} = props
    return(
        <div className={s.darkBg} onClick={() => setIsOpen(false)}>
            <div className={s.modal} onClick={e => {
                e.stopPropagation()
            }}>
                {children}
            </div>
        </div>
    )
}
