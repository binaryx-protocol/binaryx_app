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
  title: string,
  description: string,
  status: number,
  originalOwner: string,
  legalDocuments: string[],
}

const expectBn = (given, expected) => {
  expect(given.toString()).to.eq(expected.toString())
}

const defaultAttrs = (): AssetInput => ({
  name: 'Name',
  symbol: 'SYM',
  title: 'Title',
  description: 'Description is a long story to tell you about the asset. Let\'s write it another time.',
  status: 1,
  originalOwner: 'REPLACE_ME',
  legalDocuments: ['https://google.com', 'https://mit.com']
})

const createMany = async (sc, count, attrs: Partial<AssetInput> = {}) => {
  for (let i =0; i<count;i++) {
    const a = { ...defaultAttrs(), ...attrs }
    await sc.createAsset(...Object.values(a))
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

      await createMany(sc, 1, { originalOwner: otherAccount.address })

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
      expect(resources.length).to.eq(10)
    });
  });
});
