import s from './styles.module.scss';
import Link from 'next/link'
import classNames from 'classnames';
import {paths} from "../../../../../../pkg/paths";
import {ProgressBarText} from "../../ProgressBar/ProgressBarText";

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
};

const imagePlaceholder =
  'https://binaryxestate.s3.eu-central-1.amazonaws.com/images/marketplace/icons/image-placeholder.svg';

const AssetListItemBoxView = ({
                                id,
                                status,
                                image,
                                title,
                                subTitle,
                                irr,
                                coc,
                                tokensLeft,
                                tokensTotal,
                              }: Props) => {

  return (
    <div className={s.assetListItem}>
      <Link href={paths.showAsset({id})}>
        <div className={s.imageWrap}>
          <div className={classNames(s.status,
            {[s.status__active]: status?.toLowerCase() === "active"},
            {[s.status__upcoming]: status?.toLowerCase() === "upcoming"}
          )}>{status}</div>
          <div
            className={classNames(s.image, {[s.imagePlaceholder]: !image.src?.length})}
            style={{backgroundImage: `url(${image.src || imagePlaceholder})`}}
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
        <ProgressBarText tokensLeft={tokensLeft} tokensTotal={tokensTotal}/>
      </div>
    </div>
  );
};

// TODO: finish after MVP
// const AssetListItemListView = ({
//                                  id,
//                                  status,
//                                  image,
//                                  title,
//                                  subTitle,
//                                  irr,
//                                  coc,
//                                  tokensLeft,
//                                  tokensTotal,
//                                }: Props) => {
//
//   return (
//     <div className={s.rootListView}>
//       <img src={image.src} onError={({currentTarget}) => {
//         currentTarget.onerror = null;
//         currentTarget.src = imagePlaceholder;
//       }} alt={'imageProperty'}
//            className={s.imageListView}/>
//       <div className={s.titlesListView}>
//         <p className={s.title}>{title}</p>
//         <p className={s.subTitle}>{subTitle}</p>
//       </div>
//     </div>
//   )
// }

const AssetListItem = (props: Props) => {
  return (
    <AssetListItemBoxView {...props}/>
  );
};

export default AssetListItem;

