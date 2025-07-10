import { FormGroup } from "@angular/forms";
import { ModulesSM } from "../../service-models/app/v1/licenses/modules-s-m";
import { BaseViewModel } from "../../internal/base.viewmodel";

export class ModulesViewModel extends BaseViewModel {
  moduleSM: ModulesSM = new ModulesSM();
  moduleForm!: FormGroup;
  moduleId: number = 0;
  moduleSMList: ModulesSM[] = [];
  showAddModal = false;
  showEditModal = false;
}