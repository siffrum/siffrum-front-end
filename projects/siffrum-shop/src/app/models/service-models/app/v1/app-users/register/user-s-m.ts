import { SiffrumServiceModelBase } from "../../../base/siffrum-service-model-base";

export class UserSM extends SiffrumServiceModelBase<number> {
  username!: string;
  email!: string;
  password!: string;
  refereshToken?: string;
  accessToken?: string;
  role!: 'superAdmin' | 'Vendor' | 'endUser' | 'Researcher';
}
