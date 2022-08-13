import { FC, ReactChild } from 'react';
import s from './style.module.scss';

type Props = {
  children: ReactChild | ReactChild[];
};

const AccountMenu: FC<Props> = (props: Props) => {
  return (
    <div className={s.sidebarMenu}>
      <img src="#" alt="company_logo" className={s.logo} />
      {props.children}
    </div>
  );
};

export default AccountMenu;
