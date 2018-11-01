import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-income-corporate',
  templateUrl: './add-income-corporate.component.html',
  styleUrls: ['./add-income-corporate.component.scss']
})
export class AddIncomeCorporateComponent implements OnInit {

  nameButton = 'Add Income';
  note = '';
  salary = 0;

  constructor() { }

  ngOnInit() {
  }

  onOpen() {

  }

}
