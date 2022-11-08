// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAssetsTokenManager {
  struct Asset {
    string name;
    string symbol;
    string title;
    string description;
    uint8 status;
    uint256 tokenInfo_totalSupply;
    uint256 tokenInfo_apr;
    uint256 tokenInfo_tokenPriceDe6;
    string propertyInfo_images;
  }
}
