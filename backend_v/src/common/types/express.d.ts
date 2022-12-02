import { User } from './user';

declare module 'backend/src/common/types/express' {
  export interface Request {
    user?: User;
  }
}
