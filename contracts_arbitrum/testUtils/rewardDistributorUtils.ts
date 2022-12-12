import { ethers } from 'ethers';

export const generateEmissionPoints = (tempTime: number, interval:number = 1, amount:number = 10) => {
  const startTimes = [];
  const endTimes = [];
  const rewardsPerSecond = [];
  for (let i = 0; i < amount; i++) {
    startTimes.push(ethers.BigNumber.from(tempTime));
    tempTime += interval;
    endTimes.push(ethers.BigNumber.from(tempTime));
    rewardsPerSecond.push(ethers.utils.parseUnits((i+1).toString(), 6));
  }
  return {startTimes, endTimes, rewardsPerSecond};
}
