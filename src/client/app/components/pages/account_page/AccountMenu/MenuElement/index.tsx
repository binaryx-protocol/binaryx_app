import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  link: string;
  body: string;
};

const MenuElement: FC<Props> = (props: Props) => {
  return (
    <div className={s.menuElement}>
      <a href={props.link}>{props.body}</a>
    </div>
  );
};

export default MenuElement;
