import { Contract } from 'ethers';

import {useProvider, useSigner} from "wagmi";
import {useMemo} from "react";
import {getContract} from "../utils/getContract";
import {getActiveConfig} from "../shared/walletsConnect";

export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible: boolean
): T | null {
  const provider = useProvider();
  const {data: signer} = useSigner();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap;
    if (!address) return null;
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && signer ? signer : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [addressOrAddressMap, ABI, provider, withSignerIfPossible, signer]) as T;
}

export function useBnrxRootToken() {
  const activeConfig = getActiveConfig();
  // @ts-ignore
  return useContract(activeConfig.activeConfig.contractsAddresses.bnrxRootToken ,rundexABI, true);
}
