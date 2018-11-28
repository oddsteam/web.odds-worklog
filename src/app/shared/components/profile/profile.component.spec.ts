import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateFakeLoader, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ProfileComponent } from './profile.component';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';


describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let workLogService: WorklogApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        }), HttpClientTestingModule
      ],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    workLogService = TestBed.get(WorklogApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call forCheckTokenPleaseRemoveMeIfFlowLoginFinnished in worklog service', () => {
    spyOn(workLogService, 'forCheckTokenPleaseRemoveMeIfFlowLoginFinnished').and.returnValue(of());
    component.ngOnInit();
    expect(workLogService.forCheckTokenPleaseRemoveMeIfFlowLoginFinnished).toHaveBeenCalled();
  });

  it('should call getUserByID in workLog service', () => {
    const mockResponse = {
      id: '5bde550643b397000127274re',
      fullnameEn: 'odds jung',
      email: 'test@abc.com',
      bankAccountName: 'ทดสอบชอบลงทุน',
      bankAccountNumber: '123123123123',
      thaiCitizenId: '1234567890123',
      corporateFlag: 'N'
    };
    spyOn(workLogService, 'getUserByID').and.returnValue(of(mockResponse));
    component.getUserID();
    expect(workLogService.getUserByID).toHaveBeenCalled();
  });

  it('name in component should be equal response from getUserByID in workLog service', () => {
    const mockResponse = {
      id: '5bde550643b397000127274re',
      fullnameEn: 'odds jung',
      email: 'test@abc.com',
      bankAccountName: 'ทดสอบชอบลงทุน',
      bankAccountNumber: '123123123123',
      thaiCitizenId: '1234567890123',
      corporateFlag: 'N'
    };
    spyOn(workLogService, 'getUserByID').and.returnValue(of(mockResponse));
    component.getUserID();
    expect(component.name).toEqual(mockResponse.fullnameEn);
  });

  it('should call exportDataPdf from worklogApiService when call exportTavi50', () => {
    spyOn(workLogService, 'exportDataPdf').and.returnValue(of({
      fileName: 'example.pdf',
      path: '82d09f47-2fe3-4a33-b385-007a6dda8e13.pdf',
      tempFileName: '82d09f47-2fe3-4a33-b385-007a6dda8e13.pdf'
    }));
    component.exportTavi50();
    expect(workLogService.exportDataPdf).toHaveBeenCalled();
  });

  it('when exportDataPdf have error it should alert Can`t export to PDF file ', () => {
    spyOn(workLogService, 'exportDataPdf').and.returnValue(throwError(new Error('Test error')));
    spyOn(window, 'alert');
    component.exportTavi50();
    expect(window.alert).toHaveBeenCalledWith(`Can't export to PDF file.`);
  });
});
