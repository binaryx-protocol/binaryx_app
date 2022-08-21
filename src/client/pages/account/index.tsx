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
import AssetContract from '../../app/contracts/AssetContract';

async function init() {
  await mainContractService.init();
  if (!mainContractService.isSignedIn()) {
    console.log("!isSignedIn", window.mainContract);
    mainContractService.requestSignIn();
  }
}

const Account: NextPage<{ data: string }> = (props) => {
  const { data } = props;
  const [accountId, setAccountId] = useState('');
  const [assetContractIds, setAssetContractIds] = useState<string[]>([]);
  const allAssets = useAssets().assets;
  const myAssets = allAssets.filter(asset => assetContractIds.includes(asset.contractId));
  // const []

  useEffect(() => {
    init().then(() => {
      const accountId = mainContractService.getAccountId() || '';
      setAccountId(accountId);
      fetchAssets({ accountId });
    });
  }, []);

  async function fetchAssets({ accountId }: { accountId: string }) {
    const assetsContractIds = await mainContractService.get_account_assets({ account_id: accountId }) || [];
    setAssetContractIds(assetsContractIds);
    assetsContractIds.forEach(async (contractId) => {
      const assetContract = await AssetContract.getInstance(contractId)
      const totalSupply = assetContract.contract.ft_total_supply();
      const tokensLeft = assetContract.contract.ft_balance_of({ account_id: accountId });

    });
  }

  if (!accountId) {
    return <div>Signing in...</div>
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
          <WithdrawBlock amountOfMoney={0.14} />

          <StatisticBlock
            currentAccountValue={50}
            totalRentEarned={50}
            propertiesEarned={0.61}
            totalPropertyValue={13}
          />
        </div>

        <div className={s.orderSection}>
          {myAssets.map((asset) => {
            return (
              <OrderBlock
                asset={asset}
                accountId={accountId}
              />
            );
          })}
        </div>
      </div>
      {data}
    </div>
  );
};

export default Account;
