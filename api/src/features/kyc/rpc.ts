import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY_KYC_STORE_CONTROLLER,
  provider
)

const abi = [
  "function isApproved(address userAddress) public view returns(bool)",
  "function approve(address userAddress, string calldata id) onlyOwner public",
  "function disable(address userAddress) onlyOwner public",
  "function owner() public view returns(address)",
];

// The Contract object
const kycSc = new ethers.Contract(process.env.A_KYC_STORE, abi, provider);

export {
  kycSc,
  wallet,
}
