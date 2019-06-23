import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProfessionnelLoiPage } from './professionnel-loi.page';

const routes: Routes = [
  {
    path: '',
    component: ProfessionnelLoiPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfessionnelLoiPage]
})
export class ProfessionnelLoiPageModule {}
