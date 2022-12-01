import s from "./styles.module.scss";
import { ReactNode } from 'react';
import Link from "next/link";

type Props = {
  icon: ReactNode;
  title: string;
  url: string;
};


const SideMenuNavItem = ({
  icon,
  title,
  url
}: Props) => {
  return (
    <li className={s.sideMenuNavItem}>
      <Link href={url}>
        <a className={s.link}>
          <div className={s.iconWrap}>{icon}</div>
          <span className={s.title}>{title}</span>
        </a>
      </Link>
    </li>
  )
};

export default SideMenuNavItem;
