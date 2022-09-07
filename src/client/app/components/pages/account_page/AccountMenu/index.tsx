import { FC, ReactChild } from 'react';
import s from './style.module.scss';
import Link from 'next/Link';

type Props = {
  children: ReactChild | ReactChild[];
};

const AccountMenu: FC<Props> = (props: Props) => {
  return (
    <div className={s.sidebarMenu}>
      <Link href="/marketplace">
        <a className={s.logoLink}>
          <img
            src="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/logo_black_horizontal.svg"
            alt="logo"
            className={s.logo}
          />
        </a>
      </Link>
      {props.children}
    </div>
  );
};

export default AccountMenu;
