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
    address originalOwner,
    string[] memory legalDocuments
//    PropertyAddress memory propertyAddress
  ) external;
  function listAssets() external view returns(Asset[] memory);
  // TODO add batch
  function updateAsset(
    uint256 id,
    string memory name,
    string memory symbol,
    string memory title,
    string memory description,
    uint8 status,
    address originalOwner,
    string[] memory legalDocuments
//    PropertyAddress memory propertyAddress
  ) external;
  // TODO add batch
  function setStatus(uint256 id, uint8 status) external;
  function getAssetsCount() external view returns(uint256);
}

contract AssetsToken is ERC1155, Ownable, IAssetsTokenManager {
  using Counters for Counters.Counter;

  uint8 public constant GOLD = 0;
  uint8 public constant STATUS_UPCOMING = 1;
  uint8 public constant STATUS_ACTIVE = 2;
  uint8 public constant STATUS_SOLD_OUT = 3;
  uint8 public constant STATUS_DISABLED = 4;

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
//    PropertyAddress memory propertyAddress
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
//    propertyAddress
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

  function updateAsset(
    uint256 id,
    string memory name,
    string memory symbol,
    string memory title,
    string memory description,
    uint8 status,
    address originalOwner,
    string[] memory legalDocuments
//    PropertyAddress memory propertyAddress
  ) public override {
    Asset storage oldAsset = assetsIds[id];
    oldAsset.name = name;
    oldAsset.symbol = symbol;
    oldAsset.title = title;
    oldAsset.description = description;
    oldAsset.status = status;
    oldAsset.originalOwner = originalOwner;
    oldAsset.legalDocuments = legalDocuments;
//    oldAsset.propertyAddress = propertyAddress;
//    oldAsset.propertyAddress.state = propertyAddress.state;
//    oldAsset.propertyAddress.city = propertyAddress.city;
//    oldAsset.propertyAddress.postalCode = propertyAddress.postalCode;
//    oldAsset.propertyAddress.addressLine1 = propertyAddress.addressLine1;
//    oldAsset.propertyAddress.addressLine2 = propertyAddress.addressLine2;

//    Asset memory newAsset = Asset(
//      name,
//      symbol,
//      title,
//      description,
//      status,
//      originalOwner,
//      legalDocuments,
//  oldAsset.propertyAddress
    //      PropertyAddress(),
    //      PropertyInfo(),
    //      TokenInfo(),
    //      InvestmentInfo(),
    //      RentalInfo(),
    //      FeeInfo(),
    //      AssetDao()
//    );
//    assetsIds[id] = newAsset;
  }

//  function isEq(string memory a, string memory b) internal pure returns(bool) {
//    return   keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
//  }

  function setStatus(uint256 id, uint8 status) public override {
    assetsIds[id].status = status;
  }

  function getAssetsCount() public view override returns(uint256) {
    return _assetIds.current();
  }
}
