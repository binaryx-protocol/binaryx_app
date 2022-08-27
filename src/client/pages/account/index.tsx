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
import useAssets from '../../app/hooks/useAssets';

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
        fetchRewards({ accountId, assetContractId: assetsContractIds[0] })
        setInterval(() => {
          fetchRewards({ accountId, assetContractId: assetsContractIds[0] })
        }, 2000);
      });
    });
  }, []);

  async function fetchAssets({ accountId }: { accountId: string }): Promise<string[]> {
    const assetsContractIds =
      (await mainContractService.get_account_assets({
        account_id: accountId,
      })) || [];
    setAssetContractIds(assetsContractIds);

    return assetsContractIds;
  }

  async function fetchRewards({
    accountId,
    assetContractId,
  }: {
    accountId: string;
    assetContractId: string;
  }) {
    const rewards =
      (await mainContractService.calculate_available_rewards({
        account_id: accountId,
        asset_contract_id: assetContractId,
      }));
    setRewardsAmount(rewards);
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
          <WithdrawBlock amountOfMoney={rewardsAmount / 1000000000000000000 } />

          <StatisticBlock
            currentAccountValue={"N/A"}
            totalRentEarned={"N/A"}
            propertiesEarned={assetContractIds.length}
            totalPropertyValue={"N/A"}
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
