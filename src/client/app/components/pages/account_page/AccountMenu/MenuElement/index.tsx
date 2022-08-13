import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  link: string;
  body: string;
  className?: string;
};

const MenuElement: FC<Props> = (props: Props) => {
  return (
    <a href={props.link} className={props.className}>
      {props.body}
    </a>
  );
};

export default MenuElement;
