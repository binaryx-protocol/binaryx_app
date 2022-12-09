import {DefaultLayout} from "../../app/shared/layout/DefaultLayout";
import SumsubWebSdk from '@sumsub/websdk-react'
import {useEffect, useState} from "react";
import {httpClient} from "../../app/core/http-client";

const KycPage = () => {
  const [token, setToken] = useState('')

  useEffect(() =>{
    const fetchToken = async () => {
      const userId = localStorage.getItem('TEST_userId') || '0x123123'
      const response = await httpClient.fetch<{ accessToken: { token: string } }>('/kyc/sumsubCreateToken', { method: 'POST', body: { userId } })
      setToken(response.body.accessToken.token)
    }
    fetchToken();
  }, [])

  return (
    <>
      {
        token ?
          <SumsubWebSdk
            accessToken={token}
            expirationHandler={async (args: any) => console.log('expirationHandler ', args)}
            config={{}}
            options={{}}
            onMessage={async (args: any) => console.log('onMessage ', args)}
            onError={async (args: any) => console.log('onError ', args)}
          />
          : 'Loading...'
      }
    </>
  )
};

KycPage.Layout = DefaultLayout;

export default KycPage;
