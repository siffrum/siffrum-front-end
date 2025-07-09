import { SiffrumServiceModelBase } from "../../base/siffrum-service-model-base";

export class LicenseSM extends SiffrumServiceModelBase<number> {
  name!: string;
  description?: string;
  price!: number;
  validity!: number; 
  role!: 'VendorLicense' | 'ResearcherLicense';
  isActive: boolean = true;
}
