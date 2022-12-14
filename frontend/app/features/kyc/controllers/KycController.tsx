import s from './KycController.module.scss'
import {useEffect, useState} from "react";
import {httpClient} from "../../../core/http-client";
import {useAtomValue} from "jotai";
import {$connectedAccount} from "../../../core/models/walletModel";

export const KycController = () => {
  const [token, setToken] = useState('')
  const account = useAtomValue($connectedAccount)
  console.log('account', account)

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
}
