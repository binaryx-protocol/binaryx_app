import LinearProgress from '@mui/material/LinearProgress';
import s from './styles.module.scss';
import Link from 'next/link';
import {paths} from "../../../../../pkg/paths";

type InvestBlockProps = {
  tokensLeft: number,
  progress: number,
  irr: number,
  coc: number,
  id: number,
}

export const InvestBlock = ({ progress, tokensLeft, irr, coc, id }: InvestBlockProps) => {
  return (
    <div className={s.investBlock}>
      <div className={s.progress}>
        <LinearProgress
          variant="buffer"
          valueBuffer={100}
          value={progress}
          className={s.progressBar}
        />
        <div className={s.progressValues}>
          <span className={s.progressValue}>{progress}%</span>
          <span className={s.tokensLeft}>{tokensLeft} tokens left</span>
        </div>
      </div>
      <div className={s.info}>
        <div className={s.infoItem}>
          <span className={s.infoItemTitle}>Projected IRR</span>
          <span className={s.infoItemValue}>{irr}%</span>
        </div>
        <div className={s.infoItem}>
          <span className={s.infoItemTitle}>CoC Return</span>
          <span className={s.infoItemValue}>{coc}%</span>
        </div>
      </div>
      <div className={s.invest}>
        <Link href={paths.investAsset({ id })}>
          <a className={s.investButton}>INVEST</a>
        </Link>
      </div>
    </div>
  );
};

