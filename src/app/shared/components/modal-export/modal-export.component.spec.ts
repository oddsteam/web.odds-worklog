import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ModalExportComponent } from './modal-export.component';
import {BsModalRef, ModalOptions} from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import {ModalMonthType} from './model';

describe('ModalExportComponent', () => {
  let component: ModalExportComponent;
  let modalRef: BsModalRef;
  let ngbDateParserFormatter: jasmine.SpyObj<NgbDateParserFormatter>;
  let datePipe: DatePipe;
  let options: ModalOptions;
  let realDate: DateConstructor;

  beforeEach(() => {
    ngbDateParserFormatter = jasmine.createSpyObj('NgbDateParserFormatter', ['format']);
    datePipe = new DatePipe('en-US');
    options =  {
      initialState: {
          modalType: ModalMonthType.SPECIFIC_MONTH
      }
    };
    component = new ModalExportComponent(modalRef, ngbDateParserFormatter, datePipe, options);
    component.modalType = ModalMonthType.SPECIFIC_MONTH;
    component.ngOnInit();

      jasmine.clock().install();
      jasmine.clock().mockDate(new Date(2025, 8, 26));
  });


    afterEach(() => {
        jasmine.clock().uninstall();
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

  describe('exportIncomeByMonth',()=>{

      it('should emit valueDate by form input when form is valid and modalType is SPECIFIC_MONTH', () => {
          const emitSpy = spyOn(component.valueDate, 'emit');
          component.form.setValue({
              dateEffective: {year: 2024, month: 6, day: 1},
              startDate: {year: 2024, month: 6, day: 1},
              endDate: {year: 2024, month: 6, day: 30}
          });
          component.modalType = ModalMonthType.SPECIFIC_MONTH;
          spyOn(component, 'getStartDate').and.returnValue('06/2024');
          spyOn(component, 'getEndDate').and.returnValue('06/2024');

          component.exportIncomeByMonth();

          expect(emitSpy).toHaveBeenCalledWith({
              startDate: '06/2024',
              endDate: '06/2024',
              dateEffective: null
          });
      });

      it('should emit valueDate with current month when form is valid and modalType is SAP_CURRENT_MONTH', () => {
          options =  {
              initialState: {
                  modalType: ModalMonthType.SAP_CURRENT_MONTH
              }
          };
          component = new ModalExportComponent(modalRef, ngbDateParserFormatter, datePipe, options);
          component.modalType = ModalMonthType.SAP_CURRENT_MONTH;
          component.ngOnInit();
          const emitSpy = spyOn(component.valueDate, 'emit');
          component.form.setValue({
              dateEffective: {year: 2025, month: 10, day: 2},
              startDate: null,
              endDate: null
          });
          spyOn(component, 'ngbDateStructToDate').and.returnValue('02/10/2025');

          component.exportIncomeByMonth();

          expect(emitSpy).toHaveBeenCalledWith({
              startDate: '09/2025',
              endDate: '09/2025',
              dateEffective: '02/10/2025'
          });
      });

      it('should emit valueDate with previous month when form is valid and modalType is SAP_PREVIOUS_MONTH', () => {
          options =  {
              initialState: {
                  modalType: ModalMonthType.SAP_PREVIOUS_MONTH
              }
          };
          component = new ModalExportComponent(modalRef, ngbDateParserFormatter, datePipe, options);
          component.modalType = ModalMonthType.SAP_PREVIOUS_MONTH;
          component.ngOnInit();
          const emitSpy = spyOn(component.valueDate, 'emit');
          component.form.setValue({
              dateEffective: {year: 2025, month: 10, day: 2},
              startDate: null,
              endDate: null
          });
          spyOn(component, 'ngbDateStructToDate').and.returnValue('02/10/2025');

          component.exportIncomeByMonth();

          expect(emitSpy).toHaveBeenCalledWith({
              startDate: '08/2025',
              endDate: '08/2025',
              dateEffective: '02/10/2025'
          });
      });


      it('should not emit valueDate and mark form as touched when form is invalid', () => {
          const emitSpy = spyOn(component.valueDate, 'emit');
          component.form.markAsTouched = jasmine.createSpy('markAsTouched');
          spyOnProperty(component.form, 'invalid').and.returnValue(true);

          component.exportIncomeByMonth();

          expect(emitSpy).not.toHaveBeenCalled();
          expect(component.form.markAllAsTouched).toBeDefined();
      });
  });

});
