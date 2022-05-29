import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-virtual-card',
  templateUrl: './virtual-card.component.html',
  styleUrls: ['./virtual-card.component.css']
})
export class VirtualCardComponent implements OnInit {

  @Input('customerDetails') customerDetails: any;
  constructor() { }

  ngOnInit(): void {
    console.log("customerDetails",this.customerDetails);
  }

}
