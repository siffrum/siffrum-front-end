import { Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
// import the correct AuthenticationComponent instead of the model

export const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
{
    path: 'auth',
    loadChildren: () => import('../app/main/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',loadChildren:()=> import('./main/components/component.module').then(m => m.ComponentModule)
  },
  
  { path: '**', redirectTo: 'auth' }

];
