import { FC, useEffect, useState } from 'react';
import Property from 'types/Property';
import OrderBlockView from './OrderBlockView';
import AssetContract from '../../../../contracts/AssetContract';

type Props = {
  asset: Property;
  accountId: string;
};

const OrderBlock: FC<Props> = ({ asset, accountId }) => {
  const [tokenBalance, setTokenBalance] = useState("");

  useEffect(() => {
    fetchTokensLeft();
  }, []);

  async function fetchTokensLeft() {
    const assetContract = await AssetContract.getInstance(asset.contractId)
    const balance = await assetContract.contract.ft_balance_of({ account_id: accountId });
    setTokenBalance(balance);
  }

  // async function fetchApr() {
  //   const assetContract = await AssetContract.getInstance(asset.contractId)
  //   const balance = await assetContract.contract.ft_balance_of({ account_id: accountId });
  //   setTokenBalance(balance);
  // }

  console.log("tokenBalance", tokenBalance);

  return (
    <OrderBlockView
      title={asset.title}
      imageSrc={asset.images.images?.[0]?.src}
      tokens={{
        tokensUserHave: tokenBalance ? parseInt(tokenBalance) : 0,
        tokensFullAmount: parseInt(asset.tokenTotalSupply),
      }}
      boughtHouseLink={'#'}
      cocReturn={parseFloat(asset.coc)}
      currentValue={parseFloat(asset.tokenPrice) / 10**18}
      currentRentBalance={"N/A"}
      totalRentEarned={"N/A"}
    />
  );
};

export default OrderBlock;
