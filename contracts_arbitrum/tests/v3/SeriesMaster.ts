import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre, {ethers, upgrades, web3} from "hardhat";
import {expectBn} from "../../testUtils";

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
    it("Creating series", async function () {
      const { seriesMaster, owner } = await loadFixture(deployFixture);

      expectBn(
        await seriesMaster.seriesCount()
      ).to.eq(0)
      await seriesMaster.createSeries(0, owner.address, "New Entity")
      expectBn(
        await seriesMaster.seriesCount()
      ).to.eq(1)

      const series = await seriesMaster.series(0)
      expect(series.name).to.eq('New Entity')
    });
    it("Closing series", async function () {
      const { seriesMaster, owner } = await loadFixture(deployFixture);
      await seriesMaster.createSeries(0, owner.address, "New Entity")

      expectBn(
        await seriesMaster.balanceOf(owner.address)
      ).to.eq(1)

      await seriesMaster.closeSeries(0);

      expectBn(
        await seriesMaster.balanceOf(owner.address)
      ).to.eq(0)
    });
  });
});
