import {Contract, ethers, Wallet} from "ethers";
const usdtfABI  = require('../artifacts/contracts/UsdtfToken.sol/UsdtfToken.json')
const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider('https://goerli-rollup.arbitrum.io/rpc')
  const wallet = new Wallet('c404d79de4d8153fef21dfcde98f12afdb29e3fcb95a031a979bbfd81993e477', provider);
  const usdtfContract = new Contract('0xdaeF20c0fbAA07a372c56abEdE09FC72b11408bf', usdtfABI.abi,wallet)
  const tx = await usdtfContract.demoMint(10000);
  const res = await tx.wait()
  console.log('TX', res)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
