import { Link } from '@mui/material';
import { FC } from 'react';
import s from './styles.module.scss';

type Props = {
  imgSrc: string;
  imgAlt?: string;
  personName: string;
  personPosition: string;
  socialLinkImage: string;
  socialLink: string;
  socialUserName: string;
};

const TeamBlock: FC<Props> = ({
  imgSrc,
  imgAlt,
  personName,
  personPosition,
  socialLinkImage,
  socialLink,
  socialUserName,
}) => (
  <div className={s.teamBlock}>
    <img className={s.person} src={imgSrc} alt={imgAlt} />
    <div className={s.personDescription}>
      <span className={s.personName}>{personName}</span>
      <span className={s.personPosition}>{personPosition}</span>
      <div className={s.socialLinkBlock}>
        <img className={s.socialLinkImage} src={socialLinkImage} />
        <span className={s.socialUsername}>
          <a className={s.socialLink} href={socialLink} target="_blank">
            /{socialUserName}
          </a>
        </span>
      </div>
    </div>
  </div>
);

export default TeamBlock;
