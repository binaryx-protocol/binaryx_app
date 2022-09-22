import {FC, useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AdminMenu from 'components/admin/AdminMenu';
import { ApolloProvider } from '@apollo/client';
import client from '../app/apollo-client';
import { createTheme, ThemeProvider } from '@mui/material';
// import Home from './home';
// import Navigation from 'components/navigation';
import {Provider, useSetAtom, useAtomValue} from "jotai";
import * as metaMaskModel from "../app/models/metaMaskModel";
import {$onAccountsConnectOrDisconnect, $onChainIdChange, $onIsConnectedChange} from "../app/models/metaMaskModel";

type Props = {
  Component: any;
  pageProps: any;
};

const theme = createTheme({
  palette: {
    primary: {
      main: '#00AEFF',
    },
  },
});

const MyApp: FC<Props> = ({ Component, pageProps }) => {
  const [showAdminMenu, setShowAdminMenu] = useState(false)
  const $metaMaskState = useAtomValue(metaMaskModel.$metaMaskState)
  const $onAccountsConnectOrDisconnect = useSetAtom(metaMaskModel.$onAccountsConnectOrDisconnect)
  const $onChainIdChange = useSetAtom(metaMaskModel.$onChainIdChange)
  const $onIsConnectedChange = useSetAtom(metaMaskModel.$onIsConnectedChange)

  console.log('$metaMaskState', $metaMaskState)

  useEffect(() => {
    console.log('APP INIT');
    // assetContractService.init();
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.admin = () => {
        setShowAdminMenu((v) => !v)
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const main = async () => {
        const ethereum = window.ethereum
        $onIsConnectedChange(ethereum.isConnected())
        ethereum.on('accountsChanged', $onAccountsConnectOrDisconnect);
        ethereum.on('chainChanged', $onChainIdChange);

        ethereum.request({ method: 'eth_chainId' })
            .then($onChainIdChange)

        ethereum.request({ method: 'eth_accounts' })
            .then($onAccountsConnectOrDisconnect)

        ethereum.request({ method: 'eth_requestAccounts' })
            .then($onAccountsConnectOrDisconnect)
            .catch((err) => {
              if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
              } else {
                console.error(err);
              }
            });
      };
      main()
    }
  }, []);

  return (
      <Provider>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            {/*<meta name="viewport" content="initial-scale=1, width=device-width" />*/}
            <CssBaseline />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;700&display=swap"
            />
            {/* <Navigation /> */}
            {/* <Home data={''} /> */}
            <Component {...pageProps} />
            {
                showAdminMenu && <AdminMenu />
            }
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
  );
};

export default MyApp;
