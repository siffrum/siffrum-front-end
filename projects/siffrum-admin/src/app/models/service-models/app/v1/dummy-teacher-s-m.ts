import { SiffrumServiceModelBase } from "../base/siffrum-service-model-base";


export class DummyTeacherSM extends SiffrumServiceModelBase<number> {
    firstName!: string;
    lastName!: string;
    emailAddress!: string;
    profilePictureFileId?: number;
}
export class productSM extends SiffrumServiceModelBase<number> {
    name!: string;
            description!: string;
         price!: number;
            category!: string;
}
