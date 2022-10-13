const AssetStruct = `
    string name,
    string symbol,
    string title,
    string description,
    uint8 status,
    address originalOwner,
    string[] legalDocuments
`

export const assetsManagerAbi = [
  `function createAsset(
    string memory name,
    string memory symbol,
    string memory title,
    string memory description,
    uint8 status,
    address originalOwner,
    string[] memory legalDocuments
  ) public`
  ,
  `function listAssets() public view returns((${AssetStruct})[] memory)`,
  `function getAsset(uint256 id) public view returns((${AssetStruct}) memory)`,
  `function setStatus(uint256 id, uint8 status)`,
]

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
