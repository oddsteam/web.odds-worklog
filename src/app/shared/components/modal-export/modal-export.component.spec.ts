import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalExportComponent } from './modal-export.component';
import { BsModalRef } from 'ngx-bootstrap/modal';

describe('ModalExportComponent', () => {
  let component: ModalExportComponent;
  let modalRef: BsModalRef;
  let ngbDateParserFormatter: jasmine.SpyObj<NgbDateParserFormatter>;

  beforeEach(() => {
    ngbDateParserFormatter = jasmine.createSpyObj('NgbDateParserFormatter', ['format']);
    component = new ModalExportComponent(modalRef, ngbDateParserFormatter);
  });

  describe('ngbDateStructToDate', () => {
    it('should convert NgbDateStruct to date string', () => {
      const dateStruct: NgbDateStruct = { year: 2023, month: 12, day: 7 };

      ngbDateParserFormatter.format.and.returnValue('2023-12-07');

      const dateString: string = component.ngbDateStructToDate(dateStruct);

      expect(dateString).toBe('2023-12-07');
    });

    it('should handle null NgbDateStruct', () => {
      const dateString: string = component.ngbDateStructToDate(null);

      expect(dateString).toBeNull();
    });
  });
});
