import s from './KycController.module.scss'
import SumsubWebSdk from '@sumsub/websdk-react'
import {useEffect, useState} from "react";
import {httpClient} from "../../../core/http-client";
import {useAtomValue} from "jotai";
import {$connectedAccount} from "../../../core/models/walletModel";
import {$isKycApproved} from "../models/kycModel";

export const KycController = () => {
  const [token, setToken] = useState('')
  const account = useAtomValue($connectedAccount)
  const isKycApproved = useAtomValue($isKycApproved)
  console.log('isKycApproved', isKycApproved)

  useEffect(() =>{
    const fetchToken = async () => {
      const response = await httpClient.fetch<{ accessToken: { token: string } }>('/kyc/sumsubCreateToken', { method: 'POST', body: { userId: account } })
      setToken(response.body.accessToken.token)
    }
    if (account) {
      fetchToken();
    }
  }, [account])

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
