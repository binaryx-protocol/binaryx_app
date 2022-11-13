import { loadFixture, time } from "@nomicfoundation/hardhat-network-helpers";
import {controllerFixture, defaultAssetAttrs} from "../../testUtils/fixtures";

describe("Controller", function () {
  describe("Deployment", function () {
    it("Initialize Master", async function () {
      const { controller, owner } = await loadFixture(controllerFixture);

      controller.listAsset(...Object.values(defaultAssetAttrs()))
    });
  });
});
