import { SiffrumServiceModelBase } from '../../base/siffrum-service-model-base';

export class ApplicationUserAddressSM extends SiffrumServiceModelBase<number> {
    country!: string;
    state!: string;
    city!: string;
    address1!: string;
    address2!: string;
    pinCode!: string;
    applicationUserId!: number;
}
