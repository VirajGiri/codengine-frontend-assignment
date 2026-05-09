import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-virtual-card',
  templateUrl: './virtual-card.component.html',
  styleUrls: ['./virtual-card.component.css'],
  imports: [CommonModule]
})
export class VirtualCardComponent implements OnInit {

  @Input('customerDetails') customerDetails: any;
  constructor() { }

  ngOnInit(): void {
    console.log("customerDetails", this.customerDetails);
  }

}

