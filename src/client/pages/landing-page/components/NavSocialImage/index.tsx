import { Link } from '@mui/material';
import { FC } from 'react';

type Props = {
  link: string;
  src: string;
  alt?: string;
  className?: string;
};

const NavSocialImage: FC<Props> = (props: Props) => (
  <Link>
    <a href={props.link}>
      <img src={props.src} alt={props.alt} className={props.className} />
    </a>
  </Link>
);

export default NavSocialImage;
