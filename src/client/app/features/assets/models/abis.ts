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
