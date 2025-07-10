import { Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';

export const routes: Routes = [
    { path:'',redirectTo:'home', pathMatch:'full'},
    {path:'home',component:HomeComponent}
];
