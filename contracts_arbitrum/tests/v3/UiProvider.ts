import { loadFixture } from '@nomicfoundation/hardhat-network-helpers';
import {
  appFixture,
} from '../../testUtils/fixtures';
import { expect } from 'chai';

const hre = require('hardhat');

describe('UiProvider', function() {
  it('returns empty results', async function() {
    const { uiProvider, owner, alise } = await loadFixture(appFixture)
    const [assets, sellInfo] = await uiProvider.listAssets()
    expect(assets).to.have.length(0)
    expect(sellInfo).to.have.length(0)
  });
});
