// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IAssetsTokenManager {
  struct Asset {
    string name;
    string symbol;
    string title;
    string description;
    uint8 status;
    //    address originalOwner;
    //    string[] legalDocuments;

    uint256 tokenInfo_totalSupply;
    uint256 tokenInfo_apr;
    uint256 tokenInfo_tokenPrice;

    //        PropertyAddress propertyAddress;
    //    PropertyInfo propertyInfo;
    //    TokenInfo tokenInfo;
    //    InvestmentInfo investmentInfo;
    //    RentalInfo rentalInfo;
    //    FeeInfo feeInfo;
    //    AssetDao assetDao;
  }

  struct PropertyAddress {
    string country;
    string state;
    string city;
    string postalCode;
    string addressLine1;
    string addressLine2;
  }

  struct PropertyInfo {
    string landType;
    string landArea;
    string propertyType;
    string beds;
    string baths;
    string occupation;
    string images;
  }

  struct TokenInfo {
    uint256 totalTokensSupply;
    uint256 tokensLeft;
    uint256 tokenPrice;
  }

  struct InvestmentInfo {
    uint256 totalInvestments;
    uint256 cashOnCash;
    uint256 projectedPropertyValueAppreciation;
    uint256 closingCost;
    uint256 unRelyingAssetPrice;
  }

  struct RentalInfo {
    uint256 annualGrossRent;
    uint256 taxes;
    uint256 insurance;
    uint256 propertyManagement;
    uint256 utilities;
    uint256 initialMaintenanceReserve;
    uint256 vacancyReserve;
  }

  struct FeeInfo {
    uint256 listingFee;
    uint256 llcAdministrationFee;
    uint256 upfrontLlcFee;
  }

  struct AssetDao {
    string proposal;
    address managementOracle;
    address legalOracle;
    address auditOracle;
  }

  // TODO add batch
  function createAsset(
    string memory name,
    string memory symbol,
    string memory title,
    string memory description,
    uint8 status,
    uint256 tokenInfo_totalSupply,
    uint256 tokenInfo_apr,
    uint256 tokenInfo_tokenPrice
  ) external;

  function listAssets() external view returns(Asset[] memory);

  function getAsset(uint256 id) external view returns(Asset memory);

  // TODO add batch
  function updateAsset(
    uint256 id,
    string memory name,
    string memory symbol,
    string memory title,
    string memory description,
    uint8 status,
    uint256 tokenInfo_totalSupply,
    uint256 tokenInfo_apr,
    uint256 tokenInfo_tokenPrice
  ) external;

  // TODO add batch
  function setStatus(uint256 id, uint8 status) external;

  function getAssetsCount() external view returns(uint256);

}