import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../base.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { LogHandlerService } from '../../../../services/log-handler.service';
import { ModuleService } from '../../../../services/module.service';
import { ModulesViewModel } from '../../../../models/view/licenses/modules.viewmodel';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../internal/pagination/pagination.component';

@Component({
  selector: 'app-modules',
 imports: [CommonModule, ReactiveFormsModule,PaginationComponent],
  templateUrl: './modules.component.html',
  styleUrl: './modules.component.scss'
})
export class ModulesComponent extends BaseComponent<ModulesViewModel>
  implements OnInit
{
  protected _logHandler: LogHandlerService;

  constructor(
    private fb: FormBuilder,
    commonService: CommonService,
    logHandler: LogHandlerService,
    private ModuleService: ModuleService
  ) {
    super(commonService, logHandler);
    this._logHandler = logHandler;
    this.viewModel = new ModulesViewModel();
  }

  ngOnInit(): void {
    this.initForm();
    this.loadPageData();
  }

  override async loadPageData(): Promise<void> {
    try {
      this._commonService.presentLoading();
      await this.getTotalCount();
      let resp = await this.ModuleService.getAllModules(this.viewModel);
      if (resp.isError) {
        await this._logHandler.logObject(resp.errorData);
        this._commonService.showSweetAlertToast({
          title: 'Error',
          text: resp.errorData.displayMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        this.viewModel.moduleSMList = resp.successData;
        // console.log('Modules loaded:', this.viewModel.moduleSMList);

        // this.viewModel.pagination.totalCount = resp.totalCount;
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }
   async getTotalCount(): Promise<void> {
    try {
      this._commonService.presentLoading();
      let resp = await this.ModuleService.getTotatModulesCount();
      if (resp.isError) {
        await this._logHandler.logObject(resp.errorData);
        this._commonService.showSweetAlertToast({
          title: 'Error',
          text: resp.errorData.displayMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        // console.log('Modules loaded:',resp.successData);
        let count =resp.successData
        this.viewModel.pagination.totalCount = count;
        // alert(`Total Modules Count: ${resp.successData}`);

        // this.viewModel.pagination.totalCount = resp.totalCount;
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

    /**this function is used to create an event for pagination */
  async loadPagedataWithPagination(pageNumber: number) {
    if (pageNumber && pageNumber > 0) {
      // this.viewModel.PageNo = pageNumber;
      this.viewModel.pagination.PageNo = pageNumber;
      await this.loadPageData();
    }
  }
initForm(): void {
  this.viewModel.moduleForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
  });
}


  onToggleVisibility() {
    const current = this.viewModel.moduleForm.get('isActive')?.value;
    // console.log('Checkbox toggled, new value:', current);
  }
  openAddModal(): void {
    this.viewModel.moduleForm.reset({
      ModuleType: 'VendorModule',
      isActive: true,
    });
    this.viewModel.showAddModal = true;
  }

  openEditModal(ModuleId: number): void {
  // Ensure ID is set for edit
    this.getModuleById(ModuleId);
    this.viewModel.showEditModal = true;
  }

  closeAddModal(): void {
    this.viewModel.showAddModal = false;
    this.viewModel.showEditModal = false;

  }

  closeEditModal(): void {
      this.viewModel.showAddModal = false;
    this.viewModel.showEditModal = false;
  }

  async addItem(): Promise<void> {
    try {
      this._commonService.presentLoading();
      if (this.viewModel.moduleForm.valid) {
        const newModule = this.viewModel.moduleForm.value;
        let resp = await this.ModuleService.addModule(newModule);
        if (resp.isError) {
          this._commonService.showSweetAlertToast({
            title: 'Error',
            text: resp.errorData?.displayMessage || 'An error occurred',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          this._commonService.showSweetAlertToast({
            title: 'Success',
            text: 'Module added successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.viewModel.moduleSM = resp.successData;
          this.loadPageData();
          this.closeAddModal();
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async updateItem() {
    try {
      this._commonService.presentLoading();
      if (this.viewModel.moduleForm.valid) {
        this.viewModel.moduleSM = this.viewModel.moduleForm.value;
        this.viewModel.moduleSM.id=this.viewModel.moduleId;  // Ensure ID is set for update
        let resp = await this.ModuleService.updateModule(
          this.viewModel.moduleSM
        );
        if (resp.isError) {
          this._commonService.showSweetAlertToast({
            title: 'Error',
            text: resp.errorData?.displayMessage || 'An error occurred',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          this._commonService.showSweetAlertToast({
            title: 'Success',
            text: 'Module updated successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.viewModel.moduleSM = resp.successData;
          this.loadPageData();
          this.closeAddModal();
        }
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async deleteItem(ModuleId: number) {
    try {
      this._commonService.presentLoading();
        let resp = await this.ModuleService.deleteModule(ModuleId);
        if (resp.isError) {
          this._commonService.showSweetAlertToast({
            title: 'Error',
            text: resp.errorData?.displayMessage || 'An error occurred',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          this._commonService.showSweetAlertToast({
            title: 'Success',
            text: 'Module Deleted successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          //  this.viewModel.ModuleSM=resp.successData;
          this.loadPageData();
        }
      }
   catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async getModuleById(ModuleId: number) {
    try {
      this._commonService.presentLoading();
        let resp = await this.ModuleService.getModuleById(ModuleId);
        if (resp.isError) {
          this._commonService.showSweetAlertToast({
            title: 'Error',
            text: resp.errorData?.displayMessage || 'An error occurred',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          this.viewModel.moduleSM = resp.successData;
          this.viewModel.moduleId=this.viewModel.moduleSM.id;
          // console.log('module loaded:', this.viewModel.moduleSM);
          this.viewModel.moduleForm.patchValue(this.viewModel.moduleSM);
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }
}