import {FC, useEffect, useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AdminMenu from 'components/admin/AdminMenu';
import { ApolloProvider } from '@apollo/client';
import client from '../app/apollo-client';
import { createTheme, ThemeProvider } from '@mui/material';
import '../app/styles/globalVariables.css';
import {Provider} from "jotai";

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
  const includeHubSpotTrackingScript = process.env.NODE_ENV === "production"

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

  return (
      <Provider>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <script type="application/json" id="SSR_pageProps">{JSON.stringify(pageProps)}</script>
            {/*<meta name="viewport" content="initial-scale=1, width=device-width" />*/}
            <CssBaseline />
            {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        /> */}
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
          {includeHubSpotTrackingScript && <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/22710849.js" />}
        </ApolloProvider>
      </Provider>
  );
};

export default MyApp;
