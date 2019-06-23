import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-perte',
  templateUrl: './liste-perte.page.html',
  styleUrls: ['./liste-perte.page.scss'],
})
export class ListePertePage implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  addDeclarationPerte(){
    this.router.navigateByUrl('menu/add-perte');
  }

}
