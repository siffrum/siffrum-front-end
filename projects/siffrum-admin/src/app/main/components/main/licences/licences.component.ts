import { Component, OnInit } from '@angular/core';
import { LicenseViewModel } from '../../../../models/view/licenses/license.viewmodel';
import { BaseComponent } from '../../../../base.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonService } from '../../../../services/common.service';
import { LogHandlerService } from '../../../../services/log-handler.service';
import { LicenseService } from '../../../../services/license.service';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../../internal/pagination/pagination.component';

@Component({
  selector: 'app-licences',
  imports: [CommonModule, ReactiveFormsModule,PaginationComponent],
  templateUrl: './licences.component.html',
  styleUrl: './licences.component.scss'
})
export class LicencesComponent extends BaseComponent<LicenseViewModel>
  implements OnInit
{
  protected _logHandler: LogHandlerService;

  constructor(
    private fb: FormBuilder,
    commonService: CommonService,
    logHandler: LogHandlerService,
    private LicenseService: LicenseService
  ) {
    super(commonService, logHandler);
    this._logHandler = logHandler;
    this.viewModel = new LicenseViewModel();
  }

  ngOnInit(): void {
    this.initForm();
    this.loadPageData();
  }

  override async loadPageData(): Promise<void> {
    try {
      this._commonService.presentLoading();
      await this.getTotalCount();
      let resp = await this.LicenseService.getAllLicenses(this.viewModel);
      if (resp.isError) {
        await this._logHandler.logObject(resp.errorData);
        this._commonService.showSweetAlertToast({
          title: 'Error',
          text: resp.errorData.displayMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        this.viewModel.licenseSMList = resp.successData;
        console.log('Licenses loaded:', this.viewModel.licenseSMList);

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
      let resp = await this.LicenseService.getTotatLicensesCount();
      if (resp.isError) {
        await this._logHandler.logObject(resp.errorData);
        this._commonService.showSweetAlertToast({
          title: 'Error',
          text: resp.errorData.displayMessage,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } else {
        console.log('Licenses loaded:',resp.successData);
        let count =resp.successData
        this.viewModel.pagination.totalCount = count;
        // alert(`Total Licenses Count: ${resp.successData}`);

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
  this.viewModel.licenseForm = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    price: [0.0, [Validators.required, Validators.min(0)]],
    validity: [1, [Validators.required, Validators.min(1)]],
    role: ['VendorLicense', Validators.required],
    isActive: [true],
    createdBy: [null],
    lastModifiedBy: [null],
  });
}

  onToggleVisibility() {
    const current = this.viewModel.licenseForm.get('isActive')?.value;
    console.log('Checkbox toggled, new value:', current);
  }
  openAddModal(): void {
    this.viewModel.licenseForm.reset({
      LicenseType: 'VendorLicense',
      isActive: true,
    });
    this.viewModel.showAddModal = true;
  }

  openEditModal(LicenseId: number): void {
  // Ensure ID is set for edit
    this.getLicenseById(LicenseId);
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
      if (this.viewModel.licenseForm.valid) {
        const newLicense = this.viewModel.licenseForm.value;
        let resp = await this.LicenseService.addLicense(newLicense);
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
            text: 'License added successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.viewModel.licenseSM = resp.successData;
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
      if (this.viewModel.licenseForm.valid) {
        this.viewModel.licenseSM = this.viewModel.licenseForm.value;
        this.viewModel.licenseSM.id=this.viewModel.licenseId;  // Ensure ID is set for update
        let resp = await this.LicenseService.updateLicense(
          this.viewModel.licenseSM
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
            text: 'License updated successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          this.viewModel.licenseSM = resp.successData;
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

  async deleteItem(LicenseId: number) {
    try {
      this._commonService.presentLoading();
        let resp = await this.LicenseService.deleteLicense(LicenseId);
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
            text: 'License Deleted successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          });
          //  this.viewModel.LicenseSM=resp.successData;
          this.loadPageData();
        }
      }
   catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }

  async getLicenseById(LicenseId: number) {
    try {
      this._commonService.presentLoading();
        let resp = await this.LicenseService.getLicenseById(LicenseId);
        if (resp.isError) {
          this._commonService.showSweetAlertToast({
            title: 'Error',
            text: resp.errorData?.displayMessage || 'An error occurred',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        } else {
          this.viewModel.licenseSM = resp.successData;
          this.viewModel.licenseId=this.viewModel.licenseSM.id;
          console.log('License loaded:', this.viewModel.licenseSM);
          this.viewModel.licenseForm.patchValue(this.viewModel.licenseSM);
      }
    } catch (error) {
      throw error;
    } finally {
      this._commonService.dismissLoader();
    }
  }
}