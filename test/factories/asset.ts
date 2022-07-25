import { Factory } from 'fishery';
import * as faker from 'faker';

import { CreateAssetDto } from 'src/server/app/assets/dto/create-asset.dto';

export default Factory.define<CreateAssetDto>(() => ({
  name: faker.lorem.words(),
}));
