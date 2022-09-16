import { Link } from '@mui/material';
import { FC } from 'react';

type Props = {
  link: string;
  src: string;
  alt?: string;
  className?: string;
  width: number;
};

const NavSocialImage: FC<Props> = (props) => (
  <Link href={props.link}>
    <img
      width={props.width}
      src={props.src}
      alt={props.alt}
      className={props.className}
    />
  </Link>
);

export default NavSocialImage;
