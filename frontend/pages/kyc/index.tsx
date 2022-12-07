import {DefaultLayout} from "../../app/shared/layout/DefaultLayout";
import SumsubWebSdk from '@sumsub/websdk-react'

const KycPage = () => {
  return (
    <>
      <SumsubWebSdk
        accessToken={'sbx:0j9RKheEqWbILkoRBdqCgUDB.EkSjgHNXurQTKvEyStJ5tRTTux6ZtXBU'}
        expirationHandler={async (args) => console.log('expirationHandler ', args)}
        config={{}}
        options={{}}
        onMessage={async (args) => console.log('onMessage ', args)}
        onError={async (args) => console.log('onError ', args)}
      />
    </>
  )
};

KycPage.Layout = DefaultLayout;

export default KycPage;
