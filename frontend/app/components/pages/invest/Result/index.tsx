import s from "./styles.module.scss";
import { useEffect, useState } from 'react';
import paymentService from '../../../../services/paymentService';
import usnContractService from '../../../../services/usnContractService';
import { useRouter } from 'next/router';
import useAssets from '../../../../hooks/useAssets';
import AssetInfo from '../AssetInfo';

async function handleTransactionResult(txHash: string) {
  await usnContractService.init();
  const currentAccountId = await usnContractService.getCurrentAccountId();
  console.log("currentAccountId", currentAccountId);
  let result: any = false;

  if (currentAccountId) {
    result = await paymentService.checkTransactionStatus(txHash, currentAccountId as any);
  }

  return result;
}

const Result = () => {
  const router = useRouter();
  const { transactionHashes, assetId } = router.query;
  const asset = useAssets({ id: assetId as string }).assets[0];
  const [txResult, setTxResult] = useState<any>();

  useEffect(() => {
    if (typeof transactionHashes === "string") {
      handleTransactionResult(transactionHashes).then(result => {
        setTxResult(result);
      });
    }
  }, []);

  return (
    <div>
      <h3 className={s.title}>{txResult?.SuccessValue ? "Congratulations! You purchased a property!" : "Something went wrong. Try again or contract us"}</h3>
      <AssetInfo asset={asset} />
    </div>
  );
};

export default Result;
