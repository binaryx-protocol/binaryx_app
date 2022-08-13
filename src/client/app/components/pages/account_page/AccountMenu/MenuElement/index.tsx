import { FC } from 'react';

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
