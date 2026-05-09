import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-nav',
  templateUrl: './dialog-nav.component.html',
  styleUrls: ['./dialog-nav.component.css']
})
export class DialogNavComponent implements OnInit {
  @Input('title') title: string = 'Dialoge Nav Title' ;
  constructor() { }

  ngOnInit(): void {
  }

}
