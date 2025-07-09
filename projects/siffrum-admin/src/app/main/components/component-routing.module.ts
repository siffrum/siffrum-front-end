// src/app/auth/auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentLayoutComponent } from './main/components-layout/component-layout.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { WebsiteResourcesComponent } from './main/website-resources/website-resources.component';
import { LicencesComponent } from './main/licences/licences.component';
import { ModulesComponent } from './main/modules/modules.component';
const routes: Routes = [
  {
    path: '',
    component: ComponentLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'website-resources', component: WebsiteResourcesComponent },
      {path:'licenses',component:LicencesComponent},
      {path:'modules',component:ModulesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule {}
