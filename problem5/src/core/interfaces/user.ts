import { BaseInterface } from "./base";

export enum UserStatus {
  enabled = 'enabled',
  disabled = 'disabled',
}

export interface UserInterface extends BaseInterface {
  id: number;
  email: string;
  status: UserStatus;
  isActive: number;
  name: string;
  username: string;
}
