import { SiffrumServiceModelBase } from "../../../base/siffrum-service-model-base";

export class SignUpSM extends SiffrumServiceModelBase<number> {
    loginId!: string;
    firstName!: string;
    lastName!: string;
    emailId!: string;
    passwordHash!: string;
}
