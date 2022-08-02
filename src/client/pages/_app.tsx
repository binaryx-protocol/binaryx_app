import { useEffect } from 'react';
import mainContractService from '../app/services/mainContractService';
import CssBaseline from '@mui/material/CssBaseline';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log("APP INIT");
    mainContractService.init();
  }, []);

  return (
    <>
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
