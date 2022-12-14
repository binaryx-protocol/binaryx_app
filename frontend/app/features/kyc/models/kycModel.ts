import { atom } from 'jotai'
import {loadable} from "jotai/utils";
import {$kycStoreScPublic, KycStoreSc} from "./smartContractsFactory";
import {waitFor} from "../../../utils/pageLoadUtiils";
import {$connectedAccount} from "../../../core/models/walletModel";

export const $isKycApprovedAsync = atom<Promise<boolean | null>>(async (get) => {
  const userAddress = get($connectedAccount)
  console.log('userAddress', userAddress)
  if (!userAddress) {
    return null;
  }
  await waitFor(() => !!get($kycStoreScPublic))
  const cs = get($kycStoreScPublic) as KycStoreSc
  return await cs.isApproved(userAddress)
})

export const $isKycApproved = loadable($isKycApprovedAsync)
