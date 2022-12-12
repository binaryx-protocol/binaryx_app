// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./interfaces/IAddressesProvider.sol";
import "./interfaces/IAsset.sol";
import "./RewardsDistributor.sol";
import "./AssetPriceOracle.sol";

import "hardhat/console.sol";// TODO: remove


contract Asset is IAsset, ERC20 {

  IAddressesProvider public addressesProvider;
  ERC20 public buyToken;

  uint256 public maxTotalSupply;
  uint256 public leftToBuy;
  uint256 public buyTokenDecimals;
  bool public soldOut;

  constructor (address _addressesProvider, string memory name, string memory symbol, uint256 _maxTotalSupply, ERC20 _buyToken) ERC20(name, symbol) {
    require(_maxTotalSupply > 0, "maxTotalSupply must be greater than 0");
    require(address(_buyToken) != address(0), "buyToken must be a valid address");
    addressesProvider = IAddressesProvider(_addressesProvider);
    maxTotalSupply = _maxTotalSupply;
    leftToBuy = _maxTotalSupply;
    buyToken = _buyToken;
    buyTokenDecimals = 10 ** ERC20(_buyToken).decimals();
    soldOut = false;
  }

  function getRewardDistribution() public view returns (RewardsDistributor) {
    return RewardsDistributor(addressesProvider.getRewardsDistributor());
  }

  function getAssetPriceOracle() public view returns (AssetPriceOracle) {
    return AssetPriceOracle(addressesProvider.getAssetPriceOracle());
  }

  function invest(address recipient, uint256 amount) public override {
    require(!soldOut, "Asset is sold out");
    require(amount > 0, "amount must be greater than 0");
    require(amount <= leftToBuy, "amount must be less than or equal to leftToBuy");
    RewardsDistributor rewardsDistributor = getRewardDistribution();
    require(address(rewardsDistributor) != address(0), "rewardsDistributor must be set");
    AssetPriceOracle oracle = getAssetPriceOracle();
    require(address(oracle) != address(0), "oracle must be set");
    uint256 price = oracle.latestPrice(address(this));
    require(price > 0, "price must be greater than 0");

    uint256 buyTokenAmount = amount * buyTokenDecimals / decimals() * price;
    buyToken.transferFrom(msg.sender, address(this), buyTokenAmount);
    _mint(recipient, amount);
  unchecked {
    leftToBuy -= amount;
  }
    uint256 recipientBalance = balanceOf(recipient);
    rewardsDistributor.handleAction(recipient, recipientBalance);

    if (leftToBuy == 0) {
      soldOut = true;
      emit Sold();
    }
    emit Bought(msg.sender, amount);
  }

  function _transfer(address sender, address recipient, uint256 amount) internal virtual override {
    super._transfer(sender, recipient, amount);
    RewardsDistributor rewardsDistributor = getRewardDistribution();
    if (address(rewardsDistributor) != address(0)) {
      uint256 senderBalance = balanceOf(sender);
      uint256 recipientBalance = balanceOf(recipient);
      rewardsDistributor.handleAction(sender, senderBalance);
      rewardsDistributor.handleAction(recipient, recipientBalance);
    }
  }
}
