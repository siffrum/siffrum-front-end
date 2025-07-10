import { SiffrumServiceModelBase } from "../../base/siffrum-service-model-base";


export class ApplicationFileSM extends SiffrumServiceModelBase<number> {
    fileName!: string;
    fileType!: string;
    fileDescription!: string;
    fileBytes!: string;
}
