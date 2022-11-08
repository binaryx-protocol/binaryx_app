# Install

```
npm i
cp .env.example .env
```

**Important!**: Update DEVNET_PRIVKEY in .env

# Deploy locally

```
npx hardhat compile
npx hardhat run scripts/BNRXDeploy.js 
```

# Deploy to L2

```
npx hardhat compile
npx hardhat run scripts/BNRXDeploy.js --network l2
```
