import s from './styles.module.scss';
import Link from 'next/link'
import ProgressBar from '../../ProgressBar';
import classNames from 'classnames';
import {paths} from "../../../../../../../../pkg/paths";

type Props = {
  id: number
  status: string;
  image: {
    src: string;
  };
  title: string;
  subTitle: string;
  irr: number;
  coc: number;
  tokensLeft: number;
  tokensTotal: number;
  collected: number;
};

const imagePlaceholder =
  'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/marketplace/icons/image-placeholder.svg';

const AssetListItem = ({
   id,
   status,
   image,
   title,
   subTitle,
   irr,
   coc,
   tokensLeft,
   tokensTotal,
   collected,
 }: Props) => {
  return (
    <div className={s.assetListItem}>
      <Link href={paths.showAsset({ id })}>
        <div className={s.imageWrap}>
          <div className={classNames(s.status,
            { [s.status__active]: status?.toLowerCase() === "active" },
            { [s.status__upcoming]: status?.toLowerCase() === "upcoming" }
          )}>{status}</div>
          <div
            className={classNames(s.image, { [s.imagePlaceholder]: !image.src?.length })}
            style={{ backgroundImage: `url(${image.src || imagePlaceholder})` }}
          />
        </div>
      </Link>
      <div className={s.info}>
        <div className={s.generalInfo}>
          <div className={s.titles}>
            <h3 className={s.title}>{title}</h3>
            <p className={s.subTitle}>{subTitle}</p>
          </div>
          <div className={s.earnings}>
            <div className={s.irr}>
              IRR <strong className={s.irrValue}>{irr}%</strong>
            </div>
            <div className={s.coc}>
              CoC <strong className={s.cocValue}>{coc}%</strong>
            </div>
          </div>
        </div>
        <div className={s.tokenInfo}>
          <div className={s.tokenAmount}>
            <div className={s.tokensLeft}>Tokens Left: {tokensLeft}</div>
            <div className={s.tokensTotal}>Total: {tokensTotal} Tokens</div>
          </div>
          <div className={s.progressBarWrap}>
            <ProgressBar progress={collected} />
          </div>
          <div className={s.collected}>
            Collected: {collected}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetListItem;
