import {Contract, constants, Signer, providers} from "ethers";
import {isAddress} from "ethers/lib/utils";

export function getContract(address: string, ABI: any, provider: providers.Provider, signer?:Signer): Contract {
  if (!isAddress(address) || address === constants.AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return new Contract(address, ABI, signer ? signer: provider);
}
