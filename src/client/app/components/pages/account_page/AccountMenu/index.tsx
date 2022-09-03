import { FC, ReactChild } from 'react';
import OrderBlock from '../OrderBlock';
import s from './style.module.scss';

type Props = {
  children: ReactChild | ReactChild[];
};

const AccountMenu: FC<Props> = (props: Props) => {
  return (
    <div className={s.sidebarMenu}>
      <img
        src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg"
        alt="logo"
        className={s.logo}
      />
      {props.children}
    </div>
  );
};

export default AccountMenu;
