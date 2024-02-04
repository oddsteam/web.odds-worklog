import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalExportComponent } from './modal-export.component';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';

describe('ModalExportComponent', () => {
  let component: ModalExportComponent;
  let modalRef: BsModalRef;
  let ngbDateParserFormatter: jasmine.SpyObj<NgbDateParserFormatter>;
  let datePipe: DatePipe;

  beforeEach(() => {
    ngbDateParserFormatter = jasmine.createSpyObj('NgbDateParserFormatter', ['format']);
    datePipe = new DatePipe('en-US');
    component = new ModalExportComponent(modalRef, ngbDateParserFormatter, datePipe);
  });

  describe('ngbDateStructToDate', () => {
    it('should convert NgbDateStruct to date string format MM/yyyy', () => {
      const dateStruct: NgbDateStruct = { year: 2023, month: 12, day: 7 };

      ngbDateParserFormatter.format.and.returnValue('2023-12-07');
      spyOn(datePipe, 'transform').and.callThrough();

      const dateString: string = component.ngbDateStructToDate(dateStruct);

      expect(dateString).toBe('12/2023');
      expect(datePipe.transform).toHaveBeenCalledWith(jasmine.any(Date), 'MM/yyyy');
    });

    it('should handle null NgbDateStruct', () => {
      const dateString: string = component.ngbDateStructToDate(null);

      expect(dateString).toBeNull();
    });
  });
});
