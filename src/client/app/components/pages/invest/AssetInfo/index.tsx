import s from "./styles.module.scss";
import { FC, useEffect, useState } from 'react';
import paymentService from '../../../../services/paymentService';
import usnContractService from '../../../../services/usnContractService';
import { useRouter } from 'next/router';
import Link from 'next/link';
import classNames from 'classnames';
import Button from '@mui/material/Button';
import useAssets from '../../../../hooks/useAssets';
import Property from '../../../../types/Property';

type Props = {
  asset: Property;
}

const AssetInfo: FC<Props> = ({ asset }) => {
  if (!asset) {
    return null;
  }

  return (
    <div className={s.assetInfo}>
      <div className={s.imageWrap}>
        <img src={asset.images.images[0]?.src} width={180} className={s.image} />
      </div>
      <div>
        <h3 className={s.assetTitle}>{asset.title}</h3>
        <div className={s.addressLine1}>
          {asset.line1} {asset.line2}
        </div>
        <div className={s.addressLine2}>
          {asset.city}, {asset.state} {asset.postalCode} {asset.country}
        </div>
      </div>
    </div>
  );
};

export default AssetInfo;
