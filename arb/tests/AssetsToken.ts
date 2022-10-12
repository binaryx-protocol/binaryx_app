import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import {onlyFields} from "../../pkg/onlyFields";

enum AssetStatuses {
  'upcoming' = 1,
  'active'= 2,
  'sold_out'= 3,
  'disabled'= 4,
}

type AssetInput = {
  name: string,
  symbol: string,
  title: string,
  description: string,
  status: number,
  tokenInfo_totalSupply: number,
  tokenInfo_apr: number,
  tokenInfo_tokenPrice: number,
}

const expectBn = (given, expected) => {
  expect(given.toString()).to.eq(expected.toString())
}

const assetAddressAttrs  = (): AssetAddress => ({
  country: 'UA',
  state: 'Che',
  city: 'Cherkassy',
  postalCode: '19600',
  addressLine1: 'Khreschatik 1',
  addressLine2: '5th floor',
})

const defaultAttrs = (): AssetInput => ({
  name: 'Name',
  symbol: 'SYM',
  title: 'Title',
  description: 'Description is a long story to tell you about the asset. Let\'s write it another time.',
  status: AssetStatuses.upcoming,
  tokenInfo_totalSupply: 10_000,
  tokenInfo_apr: 10,
  tokenInfo_tokenPrice: 50_00,
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

      await createMany(sc, 1)

      const count = await sc.getAssetsCount()
      expectBn(count, 1)
    });
    it("should mint tokens for the smart contract address", async function () {
      const { sc, otherAccount } = await loadFixture(deployFixture);

      await createMany(sc, 1)
      const balance = await sc.balanceOf(sc.address, 0)
      expectBn(balance, 10_000)
    });
  });

  describe("listAssets", function () {
    it("multiple items", async function () {
      const { sc, otherAccount } = await loadFixture(deployFixture);
      await createMany(sc, 10)

      const resources = await sc.listAssets()
      expect(resources.length).to.eq(10)
      expect(resources[0].symbol).to.eq("SYM")
    });
  });

  // describe("updateAsset", function () {
  //   it("one with valid params", async function () {
  //     const { sc, otherAccount } = await loadFixture(deployFixture);
  //     await createMany(sc, 1)
  //
  //     const resources = await sc.listAssets()
  //     const id = 0
  //     const resource = onlyFields<AssetInput>(resources[id])
  //     expect(resource.symbol).to.eq("SYM")
  //
  //     const attrs = {
  //       ...resource,
  //       symbol: 'UPD'
  //     }
  //     // attrs.propertyAddress.country = 'NW'
  //     // attrs.propertyAddress.city = 'NW'
  //     // delete attrs.propertyAddress
  //     await sc.updateAsset(
  //       id,
  //       ...Object.values(attrs),
  //     )
  //
  //     const resources2 = await sc.listAssets()
  //     const resource2 = resources2[id]
  //     expect(resource2.symbol).to.eq("UPD")
  //   });
  // });

  describe("setStatus", function () {
    it("from initial to active", async function () {
      const { sc, otherAccount } = await loadFixture(deployFixture);
      await createMany(sc, 1)

      const resources = await sc.listAssets()
      const id = 0
      const resource = onlyFields<AssetInput>(resources[id])
      expect(resource.status).to.eq(AssetStatuses.upcoming)

      await sc.setStatus(
        id,
        AssetStatuses.active,
      )

      const resources2 = await sc.listAssets()
      const resource2 = resources2[id]
      expect(resource2.status).to.eq(AssetStatuses.active)
    });
  });

  describe("getAsset", function () {
    it("if exists", async function () {
      const { sc, otherAccount } = await loadFixture(deployFixture);
      await createMany(sc, 1)

      const resource = await sc.getAsset(0)
      expect(resource).to.exist
    });
    it("if not found", async function () {
      const { sc, otherAccount } = await loadFixture(deployFixture);
      await createMany(sc, 1)

      expect(async () => await sc.getAsset(1000000)).to.throw
    });
  });
});
