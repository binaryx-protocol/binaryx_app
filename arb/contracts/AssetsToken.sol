// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


interface IAssetsTokenManager {
  struct Asset {
    string name;
    string symbol;
    string title;
    string description;
    uint8 status;
    address originalOwner;
    string[] legalDocuments;

//    PropertyAddress propertyAddress;
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
    address originalOwner,
    string[] memory legalDocuments
  ) external;
  function listAssets() external view returns(Asset[] memory);
  // TODO add batch
  function patchAsset(uint256 id, string memory name, string memory symbol, uint256 totalTokensSupply, uint256 tokenPrice, address originalOwner) external;
  // TODO add batch
  function disableAsset(uint256 id) external;
  function getAssetsCount() external view returns(uint256);
}

contract AssetsToken is ERC1155, Ownable, IAssetsTokenManager {
  using Counters for Counters.Counter;

  uint8 public constant GOLD = 0;
  uint8 public constant STATUS_DISABLED = 1;
  uint8 public constant STATUS_ACTIVE = 2;
  uint8 public constant STATUS_UPCOMING = 3;
  uint8 public constant STATUS_SOLD_OUT = 4;

  //  mapping(address => uint256[]) public investorAssetsIds;
  //  mapping(address => uint256[]) public originalOwnerAssetsIds;
  mapping(uint256 => Asset) public assetsIds;
  Counters.Counter private _assetIds;

  constructor() ERC1155("") {
    initialize();
  }

  function initialize() public {
    _mint(msg.sender, GOLD, 10**18, "");
  }

  function createAsset(
    string memory name,
    string memory symbol,
    string memory title,
    string memory description,
    uint8 status,
    address originalOwner,
    string[] memory legalDocuments
  ) public override {
    uint256 id = _assetIds.current();
    _assetIds.increment();
    Asset memory newAsset = Asset(
      name,
      symbol,
      title,
      description,
      status,
      originalOwner,
      legalDocuments
//      PropertyAddress(),
//      PropertyInfo(),
//      TokenInfo(),
//      InvestmentInfo(),
//      RentalInfo(),
//      FeeInfo(),
//      AssetDao()
    );
    assetsIds[id] = newAsset;
  }

  function listAssets() public override view returns(Asset[] memory) {
    uint count = _assetIds.current();
    Asset[] memory result = new Asset[](count);

    for (uint i = 0; i < count; i++) {
      Asset storage asset = assetsIds[i];
      result[i] = asset;
    }

    return result;
  }

  function patchAsset(uint256 id, string memory name, string memory symbol, uint256 totalTokensSupply, uint256 tokenPrice, address originalOwner) public override {

  }

  function disableAsset(uint256 id) public override {

  }

  function getAssetsCount() public view override returns(uint256) {
    return _assetIds.current();
  }
}
