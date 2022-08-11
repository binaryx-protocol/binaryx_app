import { FC, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AdminMenu from 'components/admin/AdminMenu';
import { ApolloProvider } from '@apollo/client';
import client from '../app/apollo-client';

type Props = {
  Component: any;
  pageProps: any;
};

const MyApp: FC<Props> = ({ Component, pageProps }) => {
  useEffect(() => {
    console.log('APP INIT');
    // mainContractService.init();
  }, []);

  return (
    <ApolloProvider client={client}>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Component {...pageProps} />
      <AdminMenu />
    </ApolloProvider>
  );
};

export default MyApp;
