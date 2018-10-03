import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-income',
  templateUrl: './my-income.component.html',
  styleUrls: ['./my-income.component.scss']
})
export class MyIncomeComponent implements OnInit {

  constructor(config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit() {}

  open(content) {
    this.modalService.open(content , { centered: true });
  }
}
