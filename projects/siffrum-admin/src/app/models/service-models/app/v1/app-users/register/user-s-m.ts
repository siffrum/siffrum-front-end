import { SIMSServiceModelBase } from "../../../base/sims-service-model-base";

export class UserSM extends SIMSServiceModelBase<number> {
  username!: string;
  email!: string;
  password!: string;
  refereshToken?: string;
  accessToken?: string;
  role!: 'superAdmin' | 'Vendor' | 'endUser' | 'Researcher';
}
