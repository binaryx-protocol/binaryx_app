import { FC } from 'react';

type Props = {
  link: string;
  src: string;
  alt?: string;
  className?: string;
  width: number;
};

const NavSocialImage: FC<Props> = (props) => (
  <a href={props.link} target="_blank">
    <img
      width={props.width}
      src={props.src}
      alt={props.alt}
      className={props.className}
    />
  </a>
);

export default NavSocialImage;
