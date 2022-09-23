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
import * as featureFlagsModel from "../app/models/featureFlagsModel";

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
  const $featureFlags = useAtomValue(featureFlagsModel.$featureFlags)
  const $metaMaskState = useAtomValue(metaMaskModel.$metaMaskState)
  const $onBrowserInit = useSetAtom(metaMaskModel.$onBrowserInit)

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
      $onBrowserInit()
    }
  }, []);

  const onWalletConnectClick = () => {

  }

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
            {
              $featureFlags.FF_MM
                  ? <>
                    {JSON.stringify($metaMaskState)}
                    <button onClick={onWalletConnectClick}>Connect Wallet</button>
                  </>
                  :  null
            }
          </ThemeProvider>
        </ApolloProvider>
      </Provider>
  );
};

export default MyApp;
