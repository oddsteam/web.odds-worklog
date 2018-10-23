import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddIncomeModalComponent } from './add-income-modal/add-income-modal.component';

@Component({
    selector: 'app-add-income',
    templateUrl: './add-income.component.html',
    styleUrls: ['./add-income.component.scss']
})
export class AddIncomeComponent implements OnInit {

    constructor(
        config: NgbModalConfig,
        private modalService: NgbModal
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {

    }

    open() {
        this.modalService.open(AddIncomeModalComponent, { centered: true });
    }

}
