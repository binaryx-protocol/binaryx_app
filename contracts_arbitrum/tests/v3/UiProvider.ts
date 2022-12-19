import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import {
  appFixture, createManyAssets, investToAllAssets,
} from '../../testUtils/fixtures';
import { expect } from 'chai';

const hre = require('hardhat');

describe('UiProvider', function() {
  it('returns empty results', async function() {
    const { uiProvider } = await loadFixture(appFixture)
    const [assetInfos, sellInfos] = await uiProvider.listAssets()
    expect(assetInfos).to.have.length(0)
    expect(sellInfos).to.have.length(0)
  });
  it('returns all results', async function() {
    const { uiProvider, usdtToken, propertyFactory, addressesProvider } = await loadFixture(appFixture)
    await createManyAssets({ propertyFactory, addressesProvider, usdtToken, count: 10 })
    const [assetInfos, sellInfos] = await uiProvider.listAssets()
    console.log('sellInfo', sellInfos)
    console.log('assets', assetInfos)
    expect(assetInfos).to.have.length(10)
    expect(sellInfos).to.have.length(10)
  });
  it.only('return prices', async function() {
    const { uiProvider, usdtToken, propertyFactory, assetPriceOracle, addressesProvider, owner } = await loadFixture(appFixture)
    await createManyAssets({ propertyFactory, addressesProvider, usdtToken, count: 1 })
    await investToAllAssets({ propertyFactory, assetPriceOracle, usdtToken, owner })

    const [assetInfos, sellInfos] = await uiProvider.listAssets()
    console.log('sellInfo', sellInfos)
    console.log('assets', assetInfos)
    expect(assetInfos).to.have.length(1)
    expect(sellInfos).to.have.length(1)
  });
});
