import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import {expectBn} from "../../testUtils/testUtils";
import {seriesMasterFixture} from "../../testUtils/fixtures";

describe("SeriesMaster", function () {

  describe("Deployment", function () {
    it("Initialize Master", async function () {
      const { seriesMaster, owner } = await loadFixture(seriesMasterFixture);

      expect(await seriesMaster.name()).to.equal("Binaryx Series");
      expect(await seriesMaster.symbol()).to.equal("BNRXS");
      expect(await seriesMaster.owner()).to.equal(owner.address);
    });
    it("Creating series", async function () {
      const { seriesMaster, owner } = await loadFixture(seriesMasterFixture);

      expectBn(
        await seriesMaster.seriesCount()
      ).to.eq(0)
      await seriesMaster.createSeries(owner.address, "New Entity")
      expectBn(
        await seriesMaster.seriesCount()
      ).to.eq(1)

      const series = await seriesMaster.series(0)
      expect(series.name).to.eq('New Entity')
    });
    it("Closing series", async function () {
      const { seriesMaster, owner } = await loadFixture(seriesMasterFixture);
      await seriesMaster.createSeries(owner.address, "New Entity")

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
