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

type AssetAddress = {
  country: string
  state: string
  city: string
  postalCode: string
  addressLine1: string
  addressLine2: string
}

type AssetInput = {
  name: string,
  symbol: string,
  title: string,
  description: string,
  status: number,
  originalOwner: string,
  legalDocuments: string[],
  // propertyAddress: AssetAddress,
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
  originalOwner: 'REPLACE_ME',
  legalDocuments: ['https://google.com', 'https://mit.com'],
  // propertyAddress: assetAddressAttrs(),
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
      expect(resources.length).to.eq(10)
      expect(resources[0].symbol).to.eq("SYM")
      // expect(resources[0].propertyAddress.country).to.eq("UA")
    });
  });

  describe("updateAsset", function () {
    it("one with valid params", async function () {
      const { sc, otherAccount } = await loadFixture(deployFixture);
      await createMany(sc, 1, { originalOwner: otherAccount.address })

      const resources = await sc.listAssets()
      const id = 0
      const resource = onlyFields<AssetInput>(resources[id])
      expect(resource.symbol).to.eq("SYM")

      const attrs = {
        ...resource,
        symbol: 'UPD'
      }
      // attrs.propertyAddress.country = 'NW'
      // attrs.propertyAddress.city = 'NW'
      // delete attrs.propertyAddress
      await sc.updateAsset(
        id,
        ...Object.values(attrs),
      )

      const resources2 = await sc.listAssets()
      const resource2 = resources2[id]
      expect(resource2.symbol).to.eq("UPD")
    });
  });

  describe("setStatus", function () {
    it("from initial to active", async function () {
      const { sc, otherAccount } = await loadFixture(deployFixture);
      await createMany(sc, 1, { originalOwner: otherAccount.address })

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
      await createMany(sc, 1, { originalOwner: otherAccount.address })

      const resource = await sc.getAsset(0)
      expect(resource).to.exist
    });
    it("if not found", async function () {
      const { sc, otherAccount } = await loadFixture(deployFixture);
      await createMany(sc, 1, { originalOwner: otherAccount.address })

      expect(async () => await sc.getAsset(1000000)).to.throw
    });
  });
});
