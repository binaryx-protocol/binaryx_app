import { FC, useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import assetContractService from 'services/assetContractService';
import useAssets from 'hooks/useAssets';
import s from './styles.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';

const InvestBlock: FC = () => {
  const { id } = useRouter().query;
  const item = useAssets({ id: id as string }).assets[0];

  // useEffect(() => {
  //   fetchTotalSupply();
  //   fetchTokensLeft();
  // }, []);
  //
  // async function fetchTotalSupply() {
  //   const totalSupply = await assetContractService.ft_total_supply();
  //   totalSupply && setTotalSupply(totalSupply);
  // }
  //
  // async function fetchTokensLeft() {
  //   const tokensLeft = await assetContractService.ft_balance_of({
  //     account_id: assetContractService.getContractAccountId(),
  //   });
  //   tokensLeft && setTokensLeft(tokensLeft);
  // }

  if (!item) {
    return null;
  }

  const totalSupplyInt = parseInt(item.tokenTotalSupply);
  const progress = 100 - (item.tokensLeft * 100 / totalSupplyInt);

  return (
    <div className={s.investBlock}>
      <div className={s.progress}>
        <LinearProgress
          variant='buffer'
          valueBuffer={100}
          value={progress}
          className={s.progressBar}
        />
        <div className={s.progressValues}>
          <span className={s.progressValue}>{progress}%</span>
          <span className={s.tokensLeft}>{item.tokensLeft} tokens left</span>
        </div>
      </div>
      <div className={s.info}>
        <div className={s.infoItem}>
          <span className={s.infoItemTitle}>Projected IRR</span>
          <span className={s.infoItemValue}>{item.irr}%</span>
        </div>
        <div className={s.infoItem}>
          <span className={s.infoItemTitle}>CoC Return</span>
          <span className={s.infoItemValue}>{item.coc}%</span>
        </div>
      </div>
      <div className={s.invest}>
        <Link href={`/invest?assetId=${item.id}`}>
          <a className={s.investButton}>
            INVEST
          </a>
        </Link>
      </div>
    </div>
  );
};

export default InvestBlock;
