# Install

```
npm i
cp .env.example .env
```

**Important:** Update DEVNET_PRIVKEY in .env

# Deploy locally

```
npx hardhat run scripts/v3/deployAssetsManager.ts --network local
npx hardhat run scripts/v3/deploySeriesMaster.ts --network local
npx hardhat run scripts/v3/deployController.ts --network local
```

# Deploy to L2

```
npx hardhat compile
npx hardhat run scripts/BNRXDeploy.js --network l2
```
