import { FC } from 'react';
import s from './styles.module.scss';

type WebAssetCard = {
  imageSrc: string;
  imageDescription: string;
};

const WebAssetCard: FC<WebAssetCard> = ({ imageSrc, imageDescription }) => {
  return (
    <div className={s.webAssetCard}>
      <img className={s.image} src={imageSrc} />
      <p className={s.description}>{imageDescription}</p>
    </div>
  );
};

export default WebAssetCard;
