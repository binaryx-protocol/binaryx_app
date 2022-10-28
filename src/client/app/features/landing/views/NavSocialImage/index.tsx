import { FC, ReactNode } from 'react';
import s from './styles.module.scss';

type Props = {
  link: string;
  icon: ReactNode;
};

const NavSocialImage: FC<Props> = (props) => (
  <a className={s.navSocialImage} href={props.link} target="_blank">
    {props.icon}
  </a>
);

export default NavSocialImage;
