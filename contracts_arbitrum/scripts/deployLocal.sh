#!/usr/bin/env bash

npx hardhat run scripts/deployRootBnrxToken.ts --network local \
&& npx hardhat run scripts/deployUsdtf.ts --network local \
&& npx hardhat run scripts/deployAssetsToken.ts --network local \
&& npx hardhat run scripts/deployDevFixtures.ts --network local
