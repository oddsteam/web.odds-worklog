import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss']
})
export class TableListComponent implements OnInit {
  @Input()
  ListData;
  date = new Date();
  constructor() { }

  ngOnInit() {
  }

}
