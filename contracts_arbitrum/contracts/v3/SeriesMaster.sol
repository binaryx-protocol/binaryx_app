// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SeriesMaster is OwnableUpgradeable, ERC721Upgradeable {

  // Libraries
  using Strings for uint256;

  // Events
  event FeesWithdrawn(address owner, uint256 amount);

  struct Series {
    uint16 entityType;
    uint64 creation;
    string name;
  }

  // Total count of series
  uint256 public seriesCount;
  // Mapping from Series Ids to Series data
  mapping(uint256=>Series) public series;

  // Base External URL to access entities page
  string public externalUrl;

  /**
  * Check if there's enough ETH paid for public transactions.
  */
  modifier enoughAmountFees() {
//    require(msg.value >= (tx.gasprice * gasleft()) / 100, "SeriesMaster: Not enough ETH paid for the execution.");
    _;
  }

  // Upgradeable contract initializer
  function initialize(string calldata url) initializer external {
    __Ownable_init();
    __ERC721_init("Binaryx Series", "BNRXS");
    externalUrl = url;
  }

  /**
   *
     * @param controller who will control the entity.
     * @param name the legal name of the entity.
     */
  function createSeries(address controller, string memory name) public enoughAmountFees() payable {
    // Get next index to create tokenIDs
    uint256 current = seriesCount;
    // Initialize Series data
    series[current] = Series(
      0,
      uint64(block.timestamp),
      name
    );
    // Mint NFT
    _mint(controller, current);
    // Increase counters
    seriesCount++;
  }

  /**
   * Close series previously created.
   *
   * @param tokenId of the series to be burned.
     */
  function closeSeries(uint256 tokenId) public enoughAmountFees() payable {
    require(ownerOf(tokenId) == msg.sender, "OtoCoMaster: Series close from incorrect owner");
    _burn(tokenId);
  }

  receive() enoughAmountFees() external payable {}

  // --- ADMINISTRATION FUNCTIONS ---

  /**
   * Could only be called by the administrator of the contract.
     * @param controller the controller of the entity.
     * @param creation the creation timestamp of entity in unix seconds.
     * @param name the legal name of the entity.
     */
  function createBatchSeries(address[] calldata controller, uint64[] calldata creation, string[] calldata name) public onlyOwner {
    require(name.length == controller.length, "OtoCoMaster: Name and Controller array should have same size.");
    require(controller.length == creation.length, "OtoCoMaster: Controller and Creation array should have same size.");
    uint8 counter = uint8(controller.length);
    // Uses uint8 cause isn't possible to migrate more than 255 series at once.
    // Iterate through all previous series
    for (uint8 i = 0; i < counter; i++){
      series[uint256(i+seriesCount)] = Series(
        0,
        creation[i],
        name[i]
      );
      // Don't mint closed entities
      if (controller[i] != address(0)){
        _mint(controller[i], i+seriesCount);
      }
    }
    // Set global storages
    seriesCount = seriesCount+counter;
  }


  // -- TOKEN VISUALS AND DESCRITIVE ELEMENTS --

  /**
   * Get the tokenURI that points to a SVG image.
   * Returns the svg formatted accordingly.
   *
   * @param tokenId must exist.
     * @return svg file formatted.
     */
  function tokenURI(uint256 tokenId) public view override returns (string memory) {
    return "";
  }
}
