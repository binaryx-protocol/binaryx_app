import { ReactChild } from 'react';
import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  children: ReactChild | ReactChild[];
};

const Navigation: FC<Props> = (props: Props) => {
  return <header className={s.header}>{props.children}</header>;
};

export default Navigation;
