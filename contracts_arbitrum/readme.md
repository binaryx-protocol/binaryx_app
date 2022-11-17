# Install

```
npm i
cp .env.example .env
```

**Important:** Update DEVNET_PRIVKEY in .env

# Deploy locally

```
npx hardhat run scripts/v3/deployAssetsManager.ts --network localhost
npx hardhat run scripts/v3/deploySeriesMaster.ts --network localhost
npx hardhat run scripts/v3/deployController.ts --network localhost
```

# Deploy to Staging (Arbitrum Goerli)

```
npx hardhat run scripts/v3/deployAssetsManager.ts --network arbitrumGoerli
npx hardhat run scripts/v3/deploySeriesMaster.ts --network arbitrumGoerli
npx hardhat run scripts/v3/deployController.ts --network arbitrumGoerli
```
