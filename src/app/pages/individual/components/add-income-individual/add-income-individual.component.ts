import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-income-individual',
  templateUrl: './add-income-individual.component.html',
  styleUrls: ['./add-income-individual.component.scss']
})
export class AddIncomeIndividualComponent implements OnInit {

  nameButton = 'Add Income';
  note = '';
  salary = 0;

  constructor() { }

  ngOnInit() {
  }

  onOpen() {

  }

}
