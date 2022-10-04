import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import * as chai from "chai";
import { expect } from "chai";
import { ethers, web3 } from "hardhat";

// const bnChai = require('bn-chai');
// const BN = require('bn.js');
// // chai.use(bnChai(BN));
// chai.use(bnChai(web3.utils.BN));

type AssetInput = {
  name: string,
  symbol: string,
  totalTokensSupply: number,
  tokenPrice: number,
  originalOwner: string,
}

const expectBn = (given, expected) => {
  expect(given.toString()).to.eq(expected.toString())
}

const defaultAttrs = (): AssetInput => ({
  name: 'Name',
  symbol: 'Symbol',
  totalTokensSupply: 10000,
  tokenPrice: 50,
  originalOwner: 'REPLACE_ME',
})

const createMany = async (sc, count, attrs: Partial<AssetInput> = {}) => {
  for (let i =0; i<count;i++) {
    const a = { ...defaultAttrs(), ...attrs }
    const a2 = [...Object.values(a), ...Object.values(a)]
    console.log('a2', a2)
    await sc.createAsset2(...a2)
  }
}

describe("AssetsToken", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Class = await ethers.getContractFactory("AssetsToken");
    const sc = await Class.deploy();

    return { sc, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("should deploy", async function () {
      const { sc } = await loadFixture(deployFixture);

      const count = await sc.getAssetsCount()
      expectBn(count, 0)
    });
  });

  describe("createAsset", function () {
    it("with valid params", async function () {
      const { sc, otherAccount } = await loadFixture(deployFixture);

      await sc.createAsset(
        'Name',
        'Symbol',
        10000,
        50,
        otherAccount.address
      )

      const count = await sc.getAssetsCount()
      expectBn(count, 1)
    });
  });

  describe("listAssets", function () {
    it("multiple items", async function () {
      const { sc, otherAccount } = await loadFixture(deployFixture);
      await createMany(sc, 10, { originalOwner: otherAccount.address })

      const resources = await sc.listAssets()
      console.log('resources', resources)
      expect(resources.length).to.eq(20)
    });
  });
});
