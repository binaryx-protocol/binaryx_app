import mock from "__mocks__/fileMock";
import Property from "types/Property";

const dataService = {
  getAssets(): Property[] {
    return mock.items || [];
  },
};

export default dataService;
