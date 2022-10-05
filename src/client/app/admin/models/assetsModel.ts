import { atom } from 'jotai'
import * as metaMaskModel from "../../models/metaMaskModel";
import {loadable} from "jotai/utils";
import {ethers} from "ethers";
import {assetsManagerAbi} from "../abis";
import * as rpcConfigModel from "../../models/rpcConfigModel";
import {RpcConfig} from "../../models/rpcConfigModel";

enum AssetStatuses {
  'upcoming' = 1,
  'active'= 2,
  'sold_out'= 3,
  'disabled'= 4,
}

type AssetAddress = {
  country: string
  state: string
  city: string
  postalCode: string
  addressLine1: string
  addressLine2: string
}

type AssetInput = {
  name: string,
  symbol: string,
  title: string,
  description: string,
  status: number,
  originalOwner: string,
  legalDocuments: string[],
  // propertyAddress: AssetAddress,
}

const assetAddressAttrs  = (): AssetAddress => ({
  country: 'UA',
  state: 'Che',
  city: 'Cherkassy',
  postalCode: '19600',
  addressLine1: 'Khreschatik 1',
  addressLine2: '5th floor',
})

const defaultAttrs = (): AssetInput => ({
  name: 'Name',
  symbol: 'SYM',
  title: 'Title ' + Math.random(),
  description: 'Description is a long story to tell you about the asset. Let\'s write it another time.',
  status: AssetStatuses.upcoming,
  originalOwner: 'REPLACE_ME',
  legalDocuments: ['https://google.com', 'https://mit.com'],
  // propertyAddress: assetAddressAttrs(),
})

const rpcClient = {
  async createAsset($rpcConfig: RpcConfig, args: any) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const manager = new ethers.Contract($rpcConfig.assetsTokenAddress, assetsManagerAbi, provider);
    const managerSigned = manager.connect(provider.getSigner())

    console.log('args', args)
    args.originalOwner = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
    const argsArr = Object.values(args)
    console.log('argsArr', argsArr)
    const result = await managerSigned.createAsset(
      ...argsArr
    )
    console.log('result', result)
  },
  async listAssets($rpcConfig: RpcConfig) {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const manager = new ethers.Contract($rpcConfig.assetsTokenAddress, assetsManagerAbi, provider);
    const managerSigned = manager.connect(provider.getSigner())

    const result = await managerSigned.listAssets()
    console.log('listAssets result', result)
    return result
  }
}

export const $doCreateAsset = atom(null, async (get) => {
  const $walletReadiness = get(metaMaskModel.$walletReadiness)
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)

  if ($walletReadiness === 'ready' && $rpcConfig) {
    await rpcClient.createAsset(
      $rpcConfig,
      defaultAttrs()
    );
  } else {
    console.log('waiting for wallet')
  }
})

export const $blockchainAssetsAsync = atom<any>(async (get) => {
  const $walletReadiness = get(metaMaskModel.$walletReadiness)
  get(metaMaskModel.$metaMaskState)
  const $rpcConfig = get(rpcConfigModel.$rpcConfig)

  if ($walletReadiness === 'ready' && $rpcConfig) {
    return await rpcClient.listAssets($rpcConfig)
  }
  console.log('$blockchainAssetsAsync skip')
})

export const $blockchainAssets = loadable($blockchainAssetsAsync)
