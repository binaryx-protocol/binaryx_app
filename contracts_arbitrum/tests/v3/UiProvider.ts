import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import {
  appFixture, createManyAssets, investToAllAssets,
} from '../../testUtils/fixtures';
import { expect } from 'chai';
import {expectBn} from "../../testUtils/testUtils";

const hre = require('hardhat');

describe('UiProvider', function() {
  describe('list (public)', function() {
    it('returns empty results', async function() {
      const { uiProvider } = await loadFixture(appFixture)
      const [assetInfos, sellInfos] = await uiProvider.getAssets()
      expect(assetInfos).to.have.length(0)
      expect(sellInfos).to.have.length(0)
    });
    it('returns all results', async function() {
      const { uiProvider, usdtToken, propertyFactory, addressesProvider } = await loadFixture(appFixture)
      await createManyAssets({ propertyFactory, addressesProvider, usdtToken, count: 10 })
      const [assetInfos, sellInfos] = await uiProvider.getAssets()

      expect(assetInfos).to.have.length(10)
      expect(sellInfos).to.have.length(10)
    });
    it('return prices', async function() {
      const { uiProvider, usdtToken, propertyFactory, assetPriceOracle, addressesProvider, rewardDistributor, owner } = await loadFixture(appFixture)
      await createManyAssets({ propertyFactory, addressesProvider, usdtToken, count: 1 })
      await investToAllAssets({ propertyFactory, assetPriceOracle, rewardDistributor, usdtToken, owner })
      const [assetInfos, sellInfos] = await uiProvider.getAssets()

      expectBn(sellInfos[0].maxTotalSupply).to.eq(10_000)
      expectBn(sellInfos[0].leftToBuy).to.eq(9995)
      expectBn(sellInfos[0].tokenPrice).to.eq(50)
      expect(assetInfos[0].pointer).to.be.exist
      expect(assetInfos[0].name).to.be.exist
    });
  });
  describe('getMyRewards', function() {
    it.only('return prices', async function() {
      const { uiProvider, usdtToken, propertyFactory, assetPriceOracle, addressesProvider, rewardDistributor, owner, alise } = await loadFixture(appFixture)

      await createManyAssets({ propertyFactory, addressesProvider, usdtToken, count: 1 })
      await investToAllAssets({ propertyFactory, assetPriceOracle, rewardDistributor, usdtToken, owner })

      await createManyAssets({ propertyFactory, addressesProvider, usdtToken, count: 1 })
      await investToAllAssets({ propertyFactory, assetPriceOracle, rewardDistributor, usdtToken, owner: alise })

      await createManyAssets({ propertyFactory, addressesProvider, usdtToken, count: 1 })

      const [assetInfos, sellInfos, rewards] = await uiProvider.getMyRewards()

      // with 3 assets - show only 1 invested
      expect(assetInfos).to.have.length(1)
      expect(sellInfos).to.have.length(1)
      expect(rewards).to.have.length(1)
    });
  });
});
