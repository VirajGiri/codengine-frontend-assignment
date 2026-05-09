import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  standalone: true,
  selector: 'app-dialog-nav',
  templateUrl: './dialog-nav.component.html',
  styleUrls: ['./dialog-nav.component.css'],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule]
})
export class DialogNavComponent implements OnInit {
  @Input('title') title: string = 'Dialoge Nav Title';
  constructor() { }

  ngOnInit(): void {
  }

}

