import { FormGroup } from '@angular/forms';
import { BaseViewModel } from '../../internal/base.viewmodel';
import { LicenseSM } from '../../service-models/app/v1/licenses/license-s-m';

export class LicenseViewModel extends BaseViewModel {
  licenseSM: LicenseSM = new LicenseSM();
  licenseForm!: FormGroup;
  licenseId: number = 0;
  licenseSMList: LicenseSM[] = [];
  showAddModal = false;
  showEditModal = false;
}
