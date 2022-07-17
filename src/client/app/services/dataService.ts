import mock from "__mocks__/fileMock";
import Property from "types/Property";

const dataService = {
  getDeals(): Property[] {
    return mock.items || [];
  },
};

export default dataService;
