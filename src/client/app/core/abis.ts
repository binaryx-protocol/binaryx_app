const AssetStruct = `
    string name,
    string symbol,
    string title,
    string description,
    uint8 status,
    uint256 tokenInfo_totalSupply,
    uint256 tokenInfo_apr,
    uint256 tokenInfo_tokenPriceDe6,
    string memory propertyInfo_images
`

const RewardInfo = `
    uint256 assetId,
    uint256 rewardAmountDe6,
    (${AssetStruct}) asset,
    uint256 multiplier,
    uint256 balance
`

export const assetsManagerAbi = [
  `function createAsset(
    string memory name,
    string memory symbol,
    string memory title,
    string memory description,
    uint8 status,
    uint256 tokenInfo_totalSupply,
    uint256 tokenInfo_apr,
    uint256 tokenInfo_tokenPriceDe6,
    string memory propertyInfo_images
  ) public`
  ,
  `function listAssets() public view returns((${AssetStruct})[] memory)`,
  `function getAsset(uint256 id) public view returns((${AssetStruct}) memory)`,
  `function setStatus(uint256 id, uint8 status)`,
  `function investUsingUsdt(uint256 assetId, uint256 assetTokensToBuy)`,
]

export const accountManagerAbi = [
  `function getMyRewardsPerAsset() public view returns((${RewardInfo})[] memory, uint256 totalRewardsDe6, uint256 totalClaimedDe6)`,
  `function claimRewardsInUsdt() public`,
]

export const erc1155Abi = [
  "function balanceOf(address, uint256) view returns (uint)",
];

export const erc20Abi = [
  // Some details about the token
  "function name() view returns (string)",
  "function symbol() view returns (string)",

  // Get the account balance
  "function balanceOf(address) view returns (uint)",

  // Send some of your tokens to someone else
  "function transfer(address to, uint amount)",
  "function approve(address spender, uint256 amount) public virtual override returns (bool)",

  // An event triggered whenever anyone transfers to someone else
  "event Transfer(address indexed from, address indexed to, uint amount)"
];
