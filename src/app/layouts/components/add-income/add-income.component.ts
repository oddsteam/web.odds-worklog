import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddIncomeModalComponent } from './add-income-modal/add-income-modal.component';
import { IncomeService } from '../../services/income.service';

@Component({
    selector: 'app-add-income',
    templateUrl: './add-income.component.html',
    styleUrls: ['./add-income.component.scss'],
})
export class AddIncomeComponent implements OnInit {

    salary = 0;
    note = 'อยากได้เงินก็กรอกมาสิ';
    flagNameButton: string;

    constructor(
        public config: NgbModalConfig,
        private modalService: NgbModal,
        private incomeService: IncomeService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {
        this.flagNameButton = 'Add Income';
        this.incomeService.getIncomeByUserID().then(res => {
            if (res) {
                this.flagNameButton = 'Edit Income';
            }
        });
    }

    open() {
        this.modalService.open(AddIncomeModalComponent, { centered: true });
    }
}
