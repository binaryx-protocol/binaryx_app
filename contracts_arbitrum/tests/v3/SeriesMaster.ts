import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre, {ethers, upgrades, web3} from "hardhat";

describe("SeriesMaster", function () {
  async function deployFixture() {
    const [owner, wallet2] = await ethers.getSigners();

    const SeriesMaster = await ethers.getContractFactory("SeriesMaster");
    const seriesMaster = await upgrades.deployProxy(SeriesMaster, [[], 'https://otoco.io/dashpanel/entity/']);

    return { seriesMaster, owner, wallet2 };
  }

  describe("Deployment", function () {
    it("Initialize Master", async function () {
      const { seriesMaster, owner } = await loadFixture(deployFixture);

      expect(await seriesMaster.name()).to.equal("Binaryx Series");
      expect(await seriesMaster.symbol()).to.equal("BNRXS");
      expect(await seriesMaster.owner()).to.equal(owner.address);
    });
    // it("Creating series with correct fees and wrong fees", async function () {
    //
    //   const gasPrice = ethers.BigNumber.from("2000000000");
    //   const gasLimit = ethers.BigNumber.from("150000");
    //   const otocoBaseFee = await otocoMaster.baseFee();
    //
    //   // 34750 reduction from gas limit is what is spended before check happens
    //   const amountToPayForSpinUp = ethers.BigNumber.from(gasPrice).mul(gasLimit.sub(34750)).div(otocoBaseFee);
    //   // Remove 1% from the correct amount needed
    //   const notEnoughToPayForSpinUp = amountToPayForSpinUp.mul(100).div(101);
    //
    //   // Try to create without the proper amount of ETH Value, expect to fail
    //   await expect(otocoMaster.createSeries(2, owner.address, "New Entity", {gasPrice, gasLimit, value:notEnoughToPayForSpinUp}))
    //     .to.be.revertedWith('OtoCoMaster: Not enough ETH paid for the execution.');
    //
    //   // Expected to successfully create a new entity
    //   const transaction = await otocoMaster.createSeries(2, owner.address, "New Entity", {gasPrice, gasLimit, value:amountToPayForSpinUp});
    //   await expect(transaction).to.emit(otocoMaster, 'Transfer').withArgs(zeroAddress(), owner.address, 7);
    //   expect((await otocoMaster.series(7)).jurisdiction).to.be.equal(2)
    //   expect((await otocoMaster.series(7)).name).to.be.equal("New Entity - Series 5")
    //
    //   // Chech if the amount to pay was transferred
    //   expect(await ethers.provider.getBalance(otocoMaster.address)).to.be.equal(amountToPayForSpinUp);
    //
    // });
  });
});
