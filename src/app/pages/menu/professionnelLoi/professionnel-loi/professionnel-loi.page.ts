import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { TypehommeloisPopoverComponent } from 'src/app/components/typehommeloisPopover/typehommelois-popover/typehommelois-popover.component';

@Component({
  selector: 'app-professionnel-loi',
  templateUrl: './professionnel-loi.page.html',
  styleUrls: ['./professionnel-loi.page.scss'],
})
export class ProfessionnelLoiPage implements OnInit {

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() {
  }

  async popovertypeHome(ev){
      const popover = await this.popoverCtrl.create({
        component: TypehommeloisPopoverComponent,
        showBackdrop: true,
        event: ev,
        translucent: true
      });
    
      await popover.present();
    
  }

}
