import { loadFixture, mine, time } from '@nomicfoundation/hardhat-network-helpers';
import {
  assetFixture,
  rewardsDistributorFixture,
  rewardsDistributorWithPoolFixture, rewardsDistributorWithUSDTAndAssetFixture,
} from '../../testUtils/fixtures';
import { ethers } from 'ethers';
import { generateEmissionPoints } from '../../testUtils/rewardDistributorUtils';
import * as assert from 'assert';
import { parseEmissionPoints } from '../../testUtils/objectUtils';

const hre = require('hardhat');

const mockData = {
};

describe('Asset', function() {
  it('Deploy Asset', async function() {
    const { rewardDistributor, usdtToken, owner } = await loadFixture(rewardsDistributorFixture);
    assert.equal(await rewardDistributor.poolLength(), 0);
    assert.equal(await rewardDistributor.rewardToken(), usdtToken.address);
    assert.equal(await rewardDistributor.owner(), owner.address);

  });
  it('Add pool', async function() {
    const totalSupply = mockData.rewardDataOne.totalSupply;
    const { rewardDistributor } = await loadFixture(rewardsDistributorFixture);
    const { asset } = await loadFixture(assetFixture);
    asset.setRewardsDistributor(rewardDistributor.address);
    await rewardDistributor.addPool(asset.address, 18, totalSupply);
    const poolInfo = await rewardDistributor.poolInfo(asset.address);
    assert.equal(poolInfo.totalSupply.toString(), totalSupply.toString());
  });
  it('Add Emission Points to pool', async function() {
    const {
      rewardDistributor,
      asset,
    } = await loadFixture(rewardsDistributorWithPoolFixture);
    const tempTime = await time.latest() + 1;
    const { startTimes, endTimes, rewardsPerSecond } = generateEmissionPoints(tempTime, 10, 100);
    await rewardDistributor.addEmissionPointsForPool(asset.address, startTimes, endTimes, rewardsPerSecond);
    const emissionPointsPerPool = await rewardDistributor.getEmissionPoints(asset.address, 0);
    const emissionPointLength = await rewardDistributor.emissionScheduleLength(asset.address);
    assert.equal(emissionPointLength.toString(), emissionPointsPerPool.length);
    emissionPointsPerPool.forEach((emissionPoint, index) => {
      assert.equal(emissionPoint.startTime.toString(), startTimes[index]);
      assert.equal(emissionPoint.endTime.toString(), endTimes[index]);
      assert.equal(emissionPoint.rewardsPerSecond.toString(), rewardsPerSecond[index]);
    });
  });
  it('Get Actual Emission Point for pool', async function() {
    const {
      rewardDistributor,
      asset,
    } = await loadFixture(rewardsDistributorWithPoolFixture);
    let tempTime = await time.latest() + 1;
    const { startTimes, endTimes, rewardsPerSecond } = generateEmissionPoints(tempTime, 10, 10);
    await rewardDistributor.addEmissionPointsForPool(asset.address, startTimes, endTimes, rewardsPerSecond);
    await rewardDistributor.initializePool(asset.address);
    const emissionPointsPerPool = await rewardDistributor.getEmissionPoints(asset.address, 0);
    const poolInfoBefore = await rewardDistributor.poolInfo(asset.address);
    assert.equal(emissionPointsPerPool.length.toString(), '10');
    assert.equal(poolInfoBefore.currentEmissionPoint.toString(), '0');
    await mine(50);
    tempTime = await time.latest() + 1;
    const emissionPoints = generateEmissionPoints(tempTime, 10, 5);
    await rewardDistributor.addEmissionPointsForPool(asset.address, emissionPoints.startTimes, emissionPoints.endTimes, emissionPoints.rewardsPerSecond);
    const poolInfoAfter = await rewardDistributor.poolInfo(asset.address);
    assert.equal(poolInfoAfter.currentEmissionPoint.toString(), '5');

  });
  it('Pay for rent', async function() {
    const {
      rewardDistributor,
      usdtToken,
      asset,
      owner,
      alice,
      bob,
      carol,
    } = await loadFixture(rewardsDistributorWithUSDTAndAssetFixture);
    await asset.transfer(alice.address, mockData.rewardDataOne.alice.amount);
    await asset.transfer(bob.address, mockData.rewardDataOne.bob.amount);
    await asset.transfer(carol.address, mockData.rewardDataOne.carol.amount);
    await mine(10);
    let tempTime = await time.latest() + 1;
    const emissionPoints = generateEmissionPoints(tempTime, 10, 4);
    await rewardDistributor.addEmissionPointsForPool(asset.address, emissionPoints.startTimes, emissionPoints.endTimes, emissionPoints.rewardsPerSecond);
    await rewardDistributor.initializePool(asset.address);
    await mine(34);
    const rewardDistributorBalanceBefore = await usdtToken.balanceOf(rewardDistributor.address);
    assert.equal(rewardDistributorBalanceBefore.toString(), '0');
    await usdtToken.connect(owner).approve(rewardDistributor.address, ethers.utils.parseUnits('1000', 6));
    await rewardDistributor.connect(owner).payForRent(asset.address, ethers.utils.parseUnits('1000', 6), emissionPoints.startTimes[0], emissionPoints.endTimes[0]);
    const rewardDistributorBalanceAfter = await usdtToken.balanceOf(rewardDistributor.address);
    assert.equal(rewardDistributorBalanceAfter.toString(), ethers.utils.parseUnits('1000', 6).toString());
    await rewardDistributor.claim(alice.address, [asset.address]);
    await rewardDistributor.claim(bob.address, [asset.address]);
    await rewardDistributor.claim(carol.address, [asset.address]);


    //Get Pool Info
    const poolInfo = await rewardDistributor.poolInfo(asset.address);

    //Get balances
    const aliceBalance = await usdtToken.balanceOf(alice.address);
    const bobBalance = await usdtToken.balanceOf(bob.address);
    const carolBalance = await usdtToken.balanceOf(carol.address);

    const rewardDistributorBalance = await usdtToken.balanceOf(rewardDistributor.address);

    assert.equal(poolInfo.totalSupply.toString(), mockData.rewardDataOne.totalSupply);
    assert.equal(poolInfo.currentEmissionPoint.toString(), '3');
    assert.equal(aliceBalance.toString(), mockData.rewardDataOne.alice.result.toString());
    assert.equal(bobBalance.toString(), mockData.rewardDataOne.bob.result.toString());
    assert.equal(carolBalance.toString(), mockData.rewardDataOne.carol.result.toString());
    assert.equal(rewardDistributorBalance.toString(), '908000001');
  });
  it('Claim reward flow (3 users) with more then 1 emission point', async function() {
    const {
      rewardDistributor,
      usdtToken,
      asset,
      alice,
      bob,
      carol,
    } = await loadFixture(rewardsDistributorWithPoolFixture);
    await asset.transfer(alice.address, mockData.rewardDataOne.alice.amount);
    await asset.transfer(bob.address, mockData.rewardDataOne.bob.amount);
    await asset.transfer(carol.address, mockData.rewardDataOne.carol.amount);
    await mine(10);
    let tempTime = await time.latest() + 1;
    const emissionPoints = generateEmissionPoints(tempTime, 10, 4);
    await rewardDistributor.addEmissionPointsForPool(asset.address, emissionPoints.startTimes, emissionPoints.endTimes, emissionPoints.rewardsPerSecond);
    await rewardDistributor.initializePool(asset.address);
    await mine(36);
    await rewardDistributor.claim(alice.address, [asset.address]);
    await rewardDistributor.claim(bob.address, [asset.address]);
    await rewardDistributor.claim(carol.address, [asset.address]);


    //Get Pool Info
    const poolInfo = await rewardDistributor.poolInfo(asset.address);

    //Get balances
    const aliceBalance = await usdtToken.balanceOf(alice.address);
    const bobBalance = await usdtToken.balanceOf(bob.address);
    const carolBalance = await usdtToken.balanceOf(carol.address);

    const rewardDistributorBalance = await usdtToken.balanceOf(rewardDistributor.address);

    assert.equal(poolInfo.totalSupply.toString(), mockData.rewardDataOne.totalSupply);
    assert.equal(poolInfo.currentEmissionPoint.toString(), '3');
    assert.equal(aliceBalance.toString(), mockData.rewardDataOne.alice.result.toString());
    assert.equal(bobBalance.toString(), mockData.rewardDataOne.bob.result.toString());
    assert.equal(carolBalance.toString(), mockData.rewardDataOne.carol.result.toString());
    assert.equal(rewardDistributorBalance.toString(), '908000001');
  });
  it('Claim reward flow (3 users) in one emission point', async function() {
    const {
      rewardDistributor,
      asset,
      usdtToken,
      alice,
      bob,
    } = await loadFixture(rewardsDistributorWithPoolFixture);
    await asset.transfer(alice.address, mockData.rewardDataThree.alice.amount);
    await asset.transfer(bob.address, mockData.rewardDataThree.bob.amount);
    let tempTime = await time.latest() + 1;
    const emissionPoints = generateEmissionPoints(tempTime, 100, 4);
    await rewardDistributor.addEmissionPointsForPool(asset.address, emissionPoints.startTimes, emissionPoints.endTimes, emissionPoints.rewardsPerSecond);
    await rewardDistributor.initializePool(asset.address);
    await mine(7);
    await hre.network.provider.send('evm_setAutomine', [false]);
    await rewardDistributor.claim(alice.address, [asset.address]);
    await rewardDistributor.claim(bob.address, [asset.address]);
    await hre.network.provider.send('evm_setAutomine', [true]);
    await mine(1);


    //Get Pool Info
    const poolInfo = await rewardDistributor.poolInfo(asset.address);

    //Get balances
    const aliceBalance = await usdtToken.balanceOf(alice.address);
    const bobBalance = await usdtToken.balanceOf(bob.address);

    const rewardDistributorBalance = await usdtToken.balanceOf(rewardDistributor.address);

    assert.equal(poolInfo.totalSupply.toString(), mockData.rewardDataThree.totalSupply);
    assert.equal(poolInfo.currentEmissionPoint.toString(), '0');
    assert.equal(aliceBalance.toString(), mockData.rewardDataThree.alice.result.toString());
    assert.equal(bobBalance.toString(), mockData.rewardDataThree.bob.result.toString());
    assert.equal(rewardDistributorBalance.toString(), '991000001');
  });
  it('Claimable reward with more then 1 emission point', async function() {
    const {
      rewardDistributor,
      asset,
      alice,
      bob,
      carol,
    } = await loadFixture(rewardsDistributorWithPoolFixture);
    await asset.transfer(alice.address, mockData.rewardDataOne.alice.amount);
    await asset.transfer(bob.address, mockData.rewardDataOne.bob.amount);
    await asset.transfer(carol.address, mockData.rewardDataOne.carol.amount);
    await mine(10);
    let tempTime = await time.latest() + 1;
    const emissionPoints = generateEmissionPoints(tempTime, 10, 4);
    await rewardDistributor.addEmissionPointsForPool(asset.address, emissionPoints.startTimes, emissionPoints.endTimes, emissionPoints.rewardsPerSecond);
    await rewardDistributor.initializePool(asset.address);
    await mine(37);
    const aliceReward = await rewardDistributor.claimableRewards(alice.address, [asset.address]);
    const bobReward = await rewardDistributor.claimableRewards(bob.address, [asset.address]);
    const carolReward = await rewardDistributor.claimableRewards(carol.address, [asset.address]);
    assert.equal(aliceReward[0].toString(), mockData.rewardDataOne.alice.result.toString());
    assert.equal(bobReward[0].toString(), mockData.rewardDataOne.bob.result.toString());
    assert.equal(carolReward[0].toString(), mockData.rewardDataOne.carol.result.toString());
  });
  it('Claimable reward in one emission point', async function() {
    const {
      rewardDistributor,
      asset,
      alice,
      bob,
    } = await loadFixture(rewardsDistributorWithPoolFixture);
    await asset.transfer(alice.address, mockData.rewardDataTwo.alice.amount);
    await asset.transfer(bob.address, mockData.rewardDataTwo.bob.amount);
    let tempTime = await time.latest() + 1;
    const emissionPoints = generateEmissionPoints(tempTime, 100, 4);
    await rewardDistributor.addEmissionPointsForPool(asset.address, emissionPoints.startTimes, emissionPoints.endTimes, emissionPoints.rewardsPerSecond);
    await rewardDistributor.initializePool(asset.address);
    await mine(9);
    const aliceReward = await rewardDistributor.claimableRewards(alice.address, [asset.address]);
    const bobReward = await rewardDistributor.claimableRewards(bob.address, [asset.address]);
    assert.equal(aliceReward[0].toString(), mockData.rewardDataTwo.alice.result.toString());
    assert.equal(bobReward[0].toString(), mockData.rewardDataTwo.bob.result.toString());
  });
});
