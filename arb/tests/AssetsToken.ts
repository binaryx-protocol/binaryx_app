import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";

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

      expect(await sc.name()).to.equal('Houses');
    });
  });
});
