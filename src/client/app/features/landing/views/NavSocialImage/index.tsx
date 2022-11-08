import { FC, ReactNode } from 'react';
import s from './styles.module.scss';

type Props = {
  link: string;
  icon: ReactNode;
  style: any;
  newWindow?: boolean;
};

const NavSocialImage: FC<Props> = ({ link, style, icon, newWindow = true }) => (
  <a className={s.navSocialImage} href={link} style={style} target={newWindow ? "_blank" : undefined}>
    {icon}
  </a>
);

export default NavSocialImage;
