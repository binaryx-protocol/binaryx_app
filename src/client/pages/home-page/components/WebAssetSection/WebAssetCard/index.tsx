import { FC } from 'react';
import s from './styles.module.scss';

type WebAssetCard = {
  imageSrc: string;
  imageDescription: string;
  animationOrder: number;
};

const WebAssetCard: FC<WebAssetCard> = ({
  imageSrc,
  imageDescription,
  animationOrder,
}) => {
  return (
    <div
      style={{ '--order': animationOrder.toString() } as any}
      className={s.webAssetCard}
    >
      <img className={s.image} src={imageSrc} />
      <p className={s.description}>{imageDescription}</p>
    </div>
  );
};

export default WebAssetCard;
