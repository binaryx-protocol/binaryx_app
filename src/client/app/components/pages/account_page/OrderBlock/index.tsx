import { FC, useEffect, useState } from 'react';
import Property from 'types/Property';
import OrderBlockView from './OrderBlockView';
import AssetContract from '../../../../contracts/AssetContract';
import mainContractService from '../../../../services/mainContractService';
import formatLongNumber from '../../../../utils/formatNumber';

type Props = {
  asset: Property;
  accountId: string;
};

const OrderBlock: FC<Props> = ({ asset, accountId }) => {
  const [tokenBalance, setTokenBalance] = useState('');
  const [rewardsAmount, setRewardsAmount] = useState(0);
  const [assetTotalRentEarned, setAssetTotalRentEarned] = useState(0);
  const [apr, setApr] = useState(0);

  useEffect(() => {
    const accountId = mainContractService.getAccountId() || '';
    fetchTokensLeft();
    fetchRewards({
      accountId,
    });
    fetchAssetTotalRentEarned({
      accountId,
      assetAccountId: asset.contractId,
    });
    fetchApr();
  }, []);

  async function fetchTokensLeft() {
    const assetContract = await AssetContract.getInstance(asset.contractId);
    const balance = await assetContract.contract.ft_balance_of({
      account_id: accountId,
    });
    setTokenBalance(balance);
  }

  async function fetchRewards({ accountId }: { accountId: string }) {
    const rewards = await mainContractService.calculate_available_asset_rewards(
      {
        account_id: accountId,
        asset_contract_id: asset.contractId,
      },
    );
    setRewardsAmount(rewards);
  }

  async function fetchAssetTotalRentEarned({
    accountId,
    assetAccountId,
  }: {
    accountId: string;
    assetAccountId: string;
  }) {
    const totalRentEarned =
      await mainContractService.get_asset_total_rent_earned({
        account_id: accountId,
        asset_contract_id: assetAccountId,
      });
    setAssetTotalRentEarned(totalRentEarned);
  }

  async function fetchApr() {
    const result = await mainContractService.get_apr_by_timestamp({
      asset_contract_id: asset.contractId,
      timestamp: Date.now() * 1000000,
    });
    console.log("result apr ", result);
    setApr(result);
  }

  const tokenAmount = tokenBalance ? parseInt(tokenBalance) : 0;

  return (
    <OrderBlockView
      title={asset.title}
      imageSrc={asset.images.images?.[0]?.src}
      tokens={{
        tokensUserHave: tokenAmount,
        tokensFullAmount: parseInt(asset.tokenTotalSupply),
      }}
      boughtHouseLink={'#'}
      cocReturn={formatLongNumber(apr || asset.coc, { toFixed: 2 })}
      currentValue={tokenAmount * (parseFloat(asset.tokenPrice) / 10 ** 18)}
      currentRentBalance={(rewardsAmount / 10 ** 18).toFixed(3)}
      // totalRentEarned={(assetTotalRentEarned / 10 ** 18).toFixed(3)}
    />
  );
};

export default OrderBlock;
