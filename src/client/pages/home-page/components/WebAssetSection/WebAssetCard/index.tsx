import { FC } from 'react';
import s from './styles.module.scss';

type WebAssetCard = {
  imageSrc: string;
  imageWidth?: number;
  imageHeight?: number;
  imageDescription: string;
};

const WebAssetCard: FC<WebAssetCard> = ({
  imageSrc,
  imageWidth,
  imageHeight,
  imageDescription,
}) => {
  return (
    <div className={s.webAssetCard}>
      <img src={imageSrc} width={imageWidth || 50} height={imageHeight || 50} />
      <p>{imageDescription}</p>
    </div>
  );
};

export default WebAssetCard;
