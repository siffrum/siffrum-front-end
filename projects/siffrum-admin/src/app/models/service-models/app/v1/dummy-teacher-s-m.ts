import { SIMSServiceModelBase } from "../base/sims-service-model-base";


export class DummyTeacherSM extends SIMSServiceModelBase<number> {
    firstName!: string;
    lastName!: string;
    emailAddress!: string;
    profilePictureFileId?: number;
}
export class productSM extends SIMSServiceModelBase<number> {
    name!: string;
            description!: string;
         price!: number;
            category!: string;
}
