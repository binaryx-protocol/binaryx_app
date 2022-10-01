import classNames from 'classnames';
import { FC } from 'react';
import s from './styles.module.scss';

type WebAssetCard = {
  imageSrc: string;
  imageDescription: string;
  animationOrder: number;
  className: string;
};

const WebAssetCard: FC<WebAssetCard> = ({
  imageSrc,
  imageDescription,
  animationOrder,
  className,
}) => {
  return (
    <div
      style={{ '--order': animationOrder.toString() } as any}
      className={classNames(s.webAssetCard, className)}
    >
      <img className={s.image} src={imageSrc} />
      <p className={s.description}>{imageDescription}</p>
    </div>
  );
};

export default WebAssetCard;
