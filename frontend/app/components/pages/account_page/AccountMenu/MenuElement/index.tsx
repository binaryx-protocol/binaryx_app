import { FC } from 'react';
import Link from 'next/link';

type Props = {
  link: string;
  body: string;
  className?: string;
};

const MenuElement: FC<Props> = (props: Props) => {
  return (
    <Link href={props.link}>
      <a className={props.className}>{props.body}</a>
    </Link>
  );
};

export default MenuElement;
