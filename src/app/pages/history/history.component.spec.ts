import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { AddIncomeResponse } from 'src/app/shared/model/add-income-model-response';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let worklogservice: WorklogApiService;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [HttpClientTestingModule],
      providers: [WorklogApiService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    worklogservice = TestBed.inject(WorklogApiService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call method ngOnInit to Have Been Called worklogApiService getUserById ', () => {
    const mockUsers = {
      id: '1234567890',
      role: 'corporate',
      fullnameEn: 'test test',
      email: 'test@abc.com',
      bankAccountName: 'test test',
      bankAccountNumber: '0987654321',
      thaiCitizenId: '1234567890',
    };
    spyOn(worklogservice, 'getUserByID').and.returnValues(of(mockUsers));
    component.ngOnInit();
    expect(worklogservice.getUserByID).toHaveBeenCalled();
  });


  it('should call getIncomeAllMonthByUserID in worklog service', () => {
    const mockIncomeResponse: AddIncomeResponse[] = [
      {
        id: '5d1dc66e5691b41e66318011',
        userId: '5d1c5d9f5691b41e6631800e',
        totalIncome: '100200.00',
        netIncome: '97000.00',
        netDailyIncome: '00.00',
        workDate: '10',
        submitDate: '2019-05-04T09:27:10.776Z',
        note: '',
        vat: '',
        wht: '22006.00',
        specialIncome: '20',
        netSpecialIncome: '194.00',
        workingHours: '10',
      },
      {
        id: '5d1dc66e5691b41e66318012',
        userId: '5d1c5d9f5691b41e6631800e',
        totalIncome: '100200.00',
        netIncome: '97000.00',
        netDailyIncome: '00.00',
        workDate: '10',
        submitDate: '2019-06-04T09:27:10.776Z',
        note: '',
        vat: '',
        wht: '22006.00',
        specialIncome: '20',
        netSpecialIncome: '194.00',
        workingHours: '10',
      },
    ];
    spyOn(worklogservice, 'getIncomeAllMonthByUserID').and.returnValue(of(mockIncomeResponse));
    component.ngOnInit();
    component.getIncome();
    expect(worklogservice.getIncomeAllMonthByUserID).toHaveBeenCalled();
    expect(component.incomeResponse).toEqual(mockIncomeResponse);
  });

  it('should calculate net income', () => {
    const result = component.calNetIncome('110,000', '0.07', '0.03');
    expect(result).toEqual('110000.04000000001');
  });

  it('should convert string to number', () => {
    expect(component.stringToNumber('99,999')).toEqual(99999);
  });

  it('should remove comma in number', () => {
    expect(component.cutComma('99,999')).toEqual('99999');
  });

});
