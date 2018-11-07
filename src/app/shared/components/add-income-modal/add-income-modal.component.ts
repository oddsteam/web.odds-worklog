import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmIncomeModalComponent } from '../confirm-income-modal/confirm-income-modal.component';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-add-income-modal',
    templateUrl: './add-income-modal.component.html',
    styleUrls: ['./add-income-modal.component.scss']
})
export class AddIncomeModalComponent implements OnInit {
    title = 'Add Income';
    totalIncomeController: FormControl = new FormControl();
    noteController: FormControl = new FormControl();
    constructor(
        public activeModal: NgbActiveModal,
        public config: NgbModalConfig,
        private modalService: NgbModal,
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
    }

    ngOnInit() {}

    submit() {
        this.modalService.open(ConfirmIncomeModalComponent, { centered: true });
        setTimeout(() => { this.activeModal.close(); });
    }

    disableButton() {
        if (this.totalIncomeController.value != null) {
            return false;
        } else {
            return true;
        }
    }
}
