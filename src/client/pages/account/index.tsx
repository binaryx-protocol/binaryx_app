import s from 'components/pages/account_page/styles.module.scss';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import WithdrawBlock from 'components/pages/account_page/WithdrawBlock';
import StatisticBlock from 'components/pages/account_page/StatisticBlock';
import OrderBlock from 'components/pages/account_page/OrderBlock';
import AccountMenu from 'components/pages/account_page/AccountMenu';
import MenuElement from 'components/pages/account_page/AccountMenu/MenuElement';
import mainContractService from 'services/mainContractService';
import LogoutIcon from '@mui/icons-material/Logout';
import useAssets from 'hooks/useAssets';

async function init() {
  await mainContractService.init();
  if (!mainContractService.isSignedIn()) {
    mainContractService.requestSignIn();
  }
}

const Account: NextPage<{ data: string }> = (props) => {
  const { data } = props;
  const [accountId, setAccountId] = useState('');
  const [rewardsAmount, setRewardsAmount] = useState(0);
  const [totalRentEarned, setTotalRentEarned] = useState(0);
  const [assetContractIds, setAssetContractIds] = useState<string[]>([]);
  const allAssets = useAssets().assets;
  const myAssets = allAssets.filter((asset) =>
    assetContractIds.includes(asset.contractId),
  );

  useEffect(() => {
    init().then(() => {
      const accountId = mainContractService.getAccountId() || '';
      setAccountId(accountId);
      fetchAssets({ accountId }).then((assetsContractIds) => {
        fetchRewards({ accountId, assetContractId: assetsContractIds[0] });
        fetchTotalRentEarned({ accountId });
      });
    });
  }, []);

  async function fetchAssets({
    accountId,
  }: {
    accountId: string;
  }): Promise<string[]> {
    const assetsContractIds =
      (await mainContractService.get_account_assets({
        account_id: accountId,
      })) || [];
    setAssetContractIds(assetsContractIds);

    return assetsContractIds;
  }

  async function fetchRewards({
    accountId,
  }: {
    accountId: string;
    assetContractId: string;
  }) {
    const rewards = await mainContractService.calculate_available_total_rewards(
      {
        account_id: accountId,
      },
    );
    setRewardsAmount(rewards);
  }

  async function fetchTotalRentEarned({ accountId }: { accountId: string }) {
    const totalRentEarned = await mainContractService.get_total_rent_earned({
      account_id: accountId,
    });
    setTotalRentEarned(totalRentEarned);
  }

  if (!accountId) {
    return <div>Signing in...</div>;
  }

  return (
    <div className={s.account_page}>
      <AccountMenu>
        <MenuElement link={'#'} body={'Assets Overview'} />
        <MenuElement link="/marketplace" body={'Marketplace'} />
        <MenuElement link={'#'} body={'Transaction History'} />
      </AccountMenu>

      <div className={s.mainView}>
        <header className={s.header}>
          <div className={s.accountId}>
            {accountId}{' '}
            <LogoutIcon
              className={s.logoutButton}
              role="button"
              onClick={() => mainContractService.signOut()}
            />
          </div>
        </header>
        <h1 className={s.heading}>Account</h1>

        <div className={s.statisticSection}>
          <WithdrawBlock amountOfMoney={rewardsAmount / 10 ** 18} onWithdraw={() => {}} />

          <StatisticBlock
            currentAccountValue={'N/A'}
            totalRentEarned={(totalRentEarned / 10 ** 18).toFixed(3)}
            propertiesEarned={assetContractIds.length}
            totalPropertyValue={'N/A'}
          />
        </div>

        <div className={s.orderSection}>
          {myAssets.map((asset) => {
            return <OrderBlock asset={asset} accountId={accountId} />;
          })}
        </div>
      </div>
      {data}
    </div>
  );
};

export default Account;
