import {DefaultLayout} from "../../app/shared/layout/DefaultLayout";
import SumsubWebSdk from '@sumsub/websdk-react'

const KycPage = () => {
  return (
    <>
      <SumsubWebSdk
        accessToken={'_act-sbx-7dcf206f-08b0-4e9e-ab56-d328146ebaa9'}
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
