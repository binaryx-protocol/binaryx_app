import { FC } from 'react';
import s from './style.module.scss';

const AccountMenu: FC = () => {
  return (
    <div className={s.accountMenu}>
      <img src="#" alt="company_logo" className="logo" />
      <div className={s.menuElement}>
        <a href="#">Assets Overview</a>
      </div>
      <div className={s.menuElement}>
        <a href="#">Marketplace</a>
      </div>
      <div className={s.menuElement}>
        <a href="#">Transaction History</a>
      </div>
    </div>
  );
};

export default AccountMenu;
