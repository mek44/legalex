import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', loadChildren: './pages/auth/register/register.module#RegisterPageModule' },
  { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'login', loadChildren: './pages/auth/login/login.module#LoginPageModule' },
  { path: 'menu/legalisation', loadChildren: './pages/menu/legalistation/legalisation/legalisation.module#LegalisationPageModule', canActivate: [AuthGuard] },
  { path: 'menu/professionnel-loi', loadChildren: './pages/menu/professionnelLoi/professionnel-loi/professionnel-loi.module#ProfessionnelLoiPageModule', canActivate: [AuthGuard] },
  { path: 'menu/plainte', loadChildren: './pages/menu/plainte/plainte/plainte.module#PlaintePageModule', canActivate: [AuthGuard] },
  { path: 'menu/plainte/addplainte', loadChildren: './pages/menu/plainte/addplainte/addplainte.module#AddplaintePageModule', canActivate: [AuthGuard] },
  { path: 'menu/legalisation-liste', loadChildren: './pages/menu/legalistation/legalisation-liste/legalisation-liste.module#LegalisationListePageModule' },
  { path: 'menu/add-perte', loadChildren: './pages/menu/perte/add-perte/add-perte.module#AddPertePageModule' },
  { path: 'menu/perte', loadChildren: './pages/menu/perte/liste-perte/liste-perte.module#ListePertePageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
