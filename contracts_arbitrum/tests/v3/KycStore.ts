import { expect } from "chai";
import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import {kycStoreFixture} from "../../testUtils/fixtures";

describe("KycStore", function () {
  it("deploys", async function () {
    const { kycStore, owner } = await loadFixture(kycStoreFixture);
  });
  it("returns non existing", async function () {
    const { kycStore, owner } = await loadFixture(kycStoreFixture);
    expect(
      await kycStore.isApproved("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    ).to.be.false
    expect(
      await kycStore.owner()
    ).to.eq(owner.address)
  });
  it("approves and return existing", async function () {
    const { kycStore, owner } = await loadFixture(kycStoreFixture);
    expect(
      await kycStore.isApproved("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    ).to.be.false
    await kycStore.approve("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 'id1')
    expect(
      await kycStore.isApproved("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    ).to.be.true
  });
  it("disable and return as disabled", async function () {
    const { kycStore, owner } = await loadFixture(kycStoreFixture);
    await kycStore.approve("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", 'id1')
    await kycStore.disable("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    expect(
      await kycStore.isApproved("0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266")
    ).to.be.false
  });
});
