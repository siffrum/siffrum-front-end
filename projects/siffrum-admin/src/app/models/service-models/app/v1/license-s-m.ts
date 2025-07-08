import { SIMSServiceModelBase } from "../base/sims-service-model-base";

export class LicenseSM extends SIMSServiceModelBase<number> {
  name!: string;
  description?: string;
  price!: number;
  validity!: number; 
  role!: 'VendorLicense' | 'ResearcherLicense';
  isActive: boolean = true;
}
