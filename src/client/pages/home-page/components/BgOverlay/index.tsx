import { FC } from 'react';
import classNames from 'classnames';
import s from './styles.module.scss';

type Props = {
  id?: string;
  isBgOverlayActive: boolean;
  isBgAnimationActive: boolean;
  isBgOverlayAbsolute?: boolean;
  paddingTop?: number;
  height?: number;
  className?: string;
};

const BgOverlay: FC<Props> = ({
  id,
  isBgOverlayActive,
  isBgAnimationActive,
  isBgOverlayAbsolute,
  paddingTop,
  height,
  className
}) => {
  return (
    <div
      id={id}
      className={classNames(s.bgOverlay, className, {
        [s.bgOverlayActive]: isBgOverlayActive,
        [s.bgOverlayAbsolute]: isBgOverlayAbsolute,
        // [s.bgOverlayDark]: isBgOverlayDark,
      })}
      style={{ top: paddingTop, height }}
    >
      <div
        className={classNames(s.bgOverlayItem, s.bgOverlayItem1, {
          [s.bgOverlayItemActive]: isBgAnimationActive,
        })}
      />
      <div
        className={classNames(s.bgOverlayItem, s.bgOverlayItem2, {
          [s.bgOverlayItemActive]: isBgAnimationActive,
        })}
      />
      <div
        className={classNames(s.bgOverlayItem, s.bgOverlayItem3, {
          [s.bgOverlayItemActive]: isBgAnimationActive,
        })}
      />
    </div>
  );
};

export default BgOverlay;
