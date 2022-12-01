import { Asset } from '../../assets/asset.entity';
import { User } from '../../users/user.entity';

export class CreateOrderDto {
  alias: string;
  user: User;
  asset: Asset;
}

export class CreateOrderFromAssetDetailsDto {
  alias: string;
  user: User;
  assetName: string;
}
