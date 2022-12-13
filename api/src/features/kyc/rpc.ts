import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545/');
const wallet = new ethers.Wallet(
  '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  provider
)

const abi = [
  "function isApproved(address userAddress) public view returns(bool)",
  "function approve(address userAddress, string calldata id) onlyOwner public",
  "function disable(address userAddress) onlyOwner public",
  "function owner() public view returns(address)",
];

// The Contract object
const kycSc = new ethers.Contract('0x9E545E3C0baAB3E08CdfD552C960A1050f373042', abi, provider);

export {
  kycSc,
  wallet,
}
