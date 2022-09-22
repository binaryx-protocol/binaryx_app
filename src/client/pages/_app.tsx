import {FC, useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AdminMenu from 'components/admin/AdminMenu';
import { ApolloProvider } from '@apollo/client';
import client from '../app/apollo-client';
import { createTheme, ThemeProvider } from '@mui/material';
// import Home from './home';
// import Navigation from 'components/navigation';

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
        console.log('window.ethereum', ethereum)
        console.log('ethereum.isConnected()', ethereum.isConnected())
        ethereum.on('accountsChanged', (accounts) => {
          // Handle the new accounts, or lack thereof.
          // "accounts" will always be an array, but it can be empty.
          console.log('accountsChanged', accounts)
          // window.location.reload();
        });

        ethereum.on('chainChanged', (chainId) => {
          // Handle the new chain.
          // Correctly handling chain changes can be complicated.
          // We recommend reloading the page unless you have good reason not to.
          console.log('chainId', chainId)
          // window.location.reload();
        });

        ethereum
            .request({ method: 'eth_accounts' })
            .then((accounts) => {
              console.log('eth_accounts', accounts)
            })

        ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
              console.log('eth_requestAccounts', accounts)
            })
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
  );
};

export default MyApp;
