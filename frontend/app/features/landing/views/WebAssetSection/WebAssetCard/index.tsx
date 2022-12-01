import classNames from 'classnames';
import { FC, ReactChild } from 'react';
import s from './styles.module.scss';

type WebAssetCard = {
  imageSrc?: string;
  imageDescription: string;
  animationOrder: number;
  className: string;
  children?: ReactChild | ReactChild[];
};

const WebAssetCard: FC<WebAssetCard> = ({
  imageSrc,
  imageDescription,
  animationOrder,
  className,
}) => {
  return (
    <div
      style={{ '--order': animationOrder } as any}
      className={classNames(s.webAssetCard, className)}
    >
      <img src={imageSrc} />
      <p className={s.description}>{imageDescription}</p>
    </div>
  );
};

export default WebAssetCard;
