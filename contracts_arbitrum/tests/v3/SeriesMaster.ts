import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import hre, {ethers, upgrades, web3} from "hardhat";

const usdtDecimals = 1e6;
const usdtInitialBalance = 1000;
const ONE_YEAR_IN_SECS = 31536000;

describe("SeriesMaster", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const UsdtfToken = await ethers.getContractFactory("UsdtfToken");
    const usdtfToken = await UsdtfToken.deploy(web3.utils.toBN(usdtInitialBalance).mul(web3.utils.toBN(usdtDecimals)).toString());

    const Class = await ethers.getContractFactory("AssetsToken");
    const sc = await Class.deploy(usdtfToken.address);

    return { sc, owner, otherAccount, usdtfToken };
  }

  describe("Deployment", function () {
    it("Initialize Master", async function () {
      const [owner, wallet2, wallet3, wallet4] = await ethers.getSigners();

      const SeriesMaster = await ethers.getContractFactory("SeriesMaster");
      const seriesMaster = await upgrades.deployProxy(SeriesMaster, [[], 'https://otoco.io/dashpanel/entity/']);
      await seriesMaster.deployed();

      expect(await seriesMaster.name()).to.equal("Binaryx Series");
      expect(await seriesMaster.symbol()).to.equal("BNRXS");
      expect(await seriesMaster.owner()).to.equal(owner.address);
    });
  });
});
