import { SiffrumServiceModelBase } from '../base/siffrum-service-model-base';

export class DummySubjectSM extends SiffrumServiceModelBase<number> {
  subjectName!: string;
  subjectCode!: string;
  dummyTeacherID?: number;
}
