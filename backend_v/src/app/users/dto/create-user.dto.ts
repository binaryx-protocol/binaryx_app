import { Provider } from 'src/common/types/user';

export class CreateUserDto {
  provider: Provider;
  providerId: string;
  username: string;
  name: string;
}
