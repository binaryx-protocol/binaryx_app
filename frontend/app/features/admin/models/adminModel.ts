import { atom, PrimitiveAtom } from 'jotai';
import { BigNumber, ethers } from "ethers";
import { Dayjs } from "dayjs";
import {
  $usdtSmartContractPublic,
  $usdtSmartContractSigned
} from "../../../shared/usdtToken/smartContractsFactory";
import {
  RewardsDistributor,
  $rewardsDistributorSmartContractPublic,
  $rewardsDistributorSmartContractSigned
} from "../../../shared/rewardsDistributor/smartContractsFactory";
import { $userRpcProvider } from "../../../core/models/rpcConfigModel";

export type PayForRentArgs = {
  assetId: number,
  amount: number,
  startDate: Dayjs,
  endDate: Dayjs,
}

// stores
export const $allowanceForRD = atom(null) as PrimitiveAtom<BigNumber | null>;

// getters
// setters
export const $doLoadAllowanceForRD = atom(null, async (get, set) => {
  const rd = get($rewardsDistributorSmartContractPublic);
  const usdt = get($usdtSmartContractPublic);
  const provider = get($userRpcProvider) as ethers.providers.JsonRpcProvider
  const userAddress = await provider.getSigner().getAddress();
  if (!rd || !usdt) {
    return;
  }
  const allowance = await usdt.allowance(userAddress, rd.address);
  set($allowanceForRD, allowance);
});

export const $payForRent = atom(null, async (get, set, update: PayForRentArgs) => {
  const amountUSDT = ethers.utils.parseUnits(update.amount.toString(), 6);
  const startDate = Math.floor(update.startDate.valueOf() / 1000);
  const endDate = Math.floor(update.endDate.valueOf() / 1000);
  // TODO: get asset address from assetId
  const assetAddress = '0xD665628bF7e57Cf86dd13bcd19257338586D4816'; // Dev only - remove
  const sc = get($rewardsDistributorSmartContractSigned) as RewardsDistributor
  await sc.payForRent(assetAddress, amountUSDT, startDate, endDate);
});

export const $approveUSDTForRD = atom(null, async (get, set) => {
  const rd = get($rewardsDistributorSmartContractPublic);
  const usdt = get($usdtSmartContractSigned);
  if (!rd || !usdt) {
    return;
  }
  const tx1 = await usdt.approve(rd.address, ethers.constants.MaxUint256);
  await tx1.wait();
  set($allowanceForRD, ethers.constants.MaxUint256);
});
