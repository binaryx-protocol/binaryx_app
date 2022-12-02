import { FC, useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AdminMenu from '../app/components/admin/AdminMenu';
import { ApolloProvider } from '@apollo/client';
import client from '../app/apollo-client';
import { createTheme, ThemeProvider } from '@mui/material';
import '../app/styles/globalVariables.css';
import { Provider, useAtomValue, useSetAtom } from 'jotai';
import Head from 'next/head';
import {WagmiProvider} from "../app/shared/walletsConnect";

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

const NoLayout = ({ children }: { children: any }) => children;

const MyApp: FC<Props> = ({ Component, pageProps }) => {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const includeHubSpotTrackingScript = process.env.NODE_ENV === 'production';
  const includeHotjarScript = process.env.NODE_ENV === 'production';
  const Layout = Component.Layout || NoLayout;

  useEffect(() => {
    console.log('APP INIT');
    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    // assetContractService.init();
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.admin = () => {
        setShowAdminMenu((v) => !v);
      };
    }
  }, []);

  return (
    <WagmiProvider>
    <Provider>
      <Head>
        <meta name="viewport" content="width=device-width, user-scalable=no" key="viewport" />
        <title>Binaryx - Real Estate Tokenization Protocol</title>
      </Head>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <Head>
            <link
              rel="shortcut icon"
              href="https://binaryxestate.s3.eu-central-1.amazonaws.com/images/common/favicon.ico"
              type="image/x-icon"
            />
          </Head>
          <script type="application/json" id="SSR_pageProps">
            {JSON.stringify(pageProps)}
          </script>
          {/*<meta name="viewport" content="initial-scale=1, width=device-width" />*/}
          <CssBaseline />
          {/* <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        /> */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700&display=swap"
          />

          {/* <Navigation /> */}
          {/* <Home data={''} /> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {showAdminMenu && <AdminMenu />}
        </ThemeProvider>
        {includeHubSpotTrackingScript && (
          <script
            type="text/javascript"
            id="hs-script-loader"
            async
            defer
            src="//js-na1.hs-scripts.com/22710849.js"
          />
        )}
        {includeHotjarScript && (
          <script dangerouslySetInnerHTML={{ __html: `
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:3205717,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}} />
        )}
      </ApolloProvider>
    </Provider>
    </WagmiProvider>
  );
};

export default MyApp;
