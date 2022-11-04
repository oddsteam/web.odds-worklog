import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContentLoaderModule } from '@netbasal/ngx-content-loader';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { OrderModule } from 'ngx-order-pipe';
import { of, throwError } from 'rxjs';
import { StateService } from 'src/app/core/state.service';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { TableListComponent } from 'src/app/shared/components/table-list/table-list.component';
import { StatusHighlightDirective } from 'src/app/shared/directives/status-highlight.directive';
import { ListIncomeResponse } from 'src/app/shared/model/list-income-model-response';
import { User } from 'src/app/shared/model/user';
import { ListCorporateComponent } from './list-corporate.component';


describe('ListCorporateComponent', () => {
    let component: ListCorporateComponent;
    let fixture: ComponentFixture<ListCorporateComponent>;
    let worklogService: WorklogApiService;
    let stateService: StateService;
    let corporateListed;
    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ListCorporateComponent, TableListComponent, StatusHighlightDirective],
            imports: [HttpClientTestingModule, ContentLoaderModule, OrderModule, FormsModule, ReactiveFormsModule],
            providers: [BsModalService, ComponentLoaderFactory, PositioningService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListCorporateComponent);
        worklogService = TestBed.inject(WorklogApiService);
        stateService = TestBed.inject(StateService);
        component = fixture.componentInstance;
        fixture.detectChanges();
        corporateListed = [{
            user: {
                id: '5c0c7f34ee10e80001cb3c9b', role: 'individual'
                , firstName: 'aaa', lastName: 'bbb', email: 'who@odds.team', bankAccountName: 'มานะ ไม่มา'
                , bankAccountNumber: '9898144777', vat: 'N', slackAccount: ''
            }, submitDate: '', status: 'N'
        }];
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call forCheckTokenPleaseRemoveMeIfFlowLoginFinnished in worklog service', () => {
        spyOn(worklogService, 'getCorporateListed').and.returnValue(corporateListed);
        component.ngOnInit();
        expect(component.listIncome).toEqual(corporateListed);
    });

    // it('forCheckTokenPleaseRemoveMeIfFlowLoginFinnished should be defined', () => {
    //     spyOn(stateService, 'listIncomeCorporateTrigger').and.returnValue(of());
    //     component.ngOnInit();
    //     expect(stateService.listIncomeCorporateTrigger).toBeDefined();
    // });

    it('should call getListIncomeCorporate in worklog service', () => {
        const mockResponse = {
            submitDate: '2018-10-09:00:00:00',
            status: 'Y',
            user: [
                new User({
                    id: '1233',
                    role: 'corporate',
                    firstName: 'ODDS',
                    lastName: 'ODDS',
                    email: 'odds@odds.team',
                    bankAccountName: 'odds odds',
                    bankAccountNumber: '112211221122',
                    thaiCitizenId: '12345423',
                    slackAccount: 'odds@odds.team',
                    siteId: '',
                    transcript: '',
                    project: ''
                }),
                new User({
                    id: '1233',
                    role: 'corporate',
                    firstName: 'ODDS',
                    lastName: 'ODDS',
                    email: 'odds@odds.team',
                    bankAccountName: 'odds odds',
                    bankAccountNumber: '112211221122',
                    thaiCitizenId: '12345423',
                    slackAccount: 'odds@odds.team',
                    siteId: '',
                    transcript: '',
                    project: ''
                }),
            ]
        };
        spyOn(worklogService, 'getListIncomeCorporate').and.returnValue(of(mockResponse));
        component.getListIncomeCorporate();
        expect(worklogService.getListIncomeCorporate).toHaveBeenCalled();
    });

    it('listIncome should equal to response data', () => {
        const mockResponse = <ListIncomeResponse>{
            submitDate: '2018-10-09:00:00:00',
            status: 'Y',
            user: [
                {
                    id: '1233',
                    role: 'corporate',
                    firstName: 'ODDS',
                    lastName: 'ODDS',
                    email: 'odds@odds.team',
                    bankAccountName: 'odds odds',
                    bankAccountNumber: '112211221122',
                    thaiCitizenId: '12345423',
                    vat: 'non-vat',
                    slackAccount: 'odds@odds.team',
                    siteId: '',
                    transcript: '',
                    site: null,
                    imageProfile: null,
                    project: '',
                    dailyIncome: '',
                    address: 'every Where'
                },
                {
                    id: '1233',
                    role: 'corporate',
                    firstName: 'ODDS',
                    lastName: 'ODDS',
                    email: 'odds@odds.team',
                    bankAccountName: 'odds odds',
                    bankAccountNumber: '112211221122',
                    thaiCitizenId: '12345423',
                    vat: 'non-vat',
                    slackAccount: 'odds@odds.team',
                    siteId: '',
                    transcript: '',
                    site: null,
                    imageProfile: null,
                    project: '',
                    dailyIncome: '',
                    address: 'every Where'
                },
            ]
        };
        spyOn(worklogService, 'getListIncomeCorporate').and.returnValue(of(mockResponse));
        component.getListIncomeCorporate();
        expect(component.listIncome).toEqual(mockResponse);
    });

    it('should call exportDataCorporate', () => {
        const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
        spyOn(worklogService, 'exportDataCorporate').and.returnValue(of(mockBlob));
        component.exportCorporate('0');
        expect(worklogService.exportDataCorporate).toHaveBeenCalled();
    });

    it('should call downloadFile if exportDataCorporate return response', () => {
        const mockBlob = new Blob([], { type: 'text/csv;charset=utf-8;' });
        spyOn(worklogService, 'exportDataCorporate').and.returnValue(of(mockBlob));
        spyOn(component, 'downloadFile');
        component.exportCorporate('0');
        expect(component.downloadFile).toHaveBeenCalledWith(mockBlob, 'income_corporate.csv');
    });

    it('alert message if exportDataCorporate return error', () => {
        spyOn(worklogService, 'exportDataCorporate').and.returnValue(throwError(new HttpErrorResponse({ status: 500, error: 'Error' })));
        spyOn(window, 'alert');
        component.exportCorporate('0');
        expect(window.alert).toHaveBeenCalledWith(`Can't export corporate income to CSV file.`);
    });

    it('should call getListIncomeCorporate when isUpdateList = true', () => {
        const mockResponse = {
            submitDate: '2018-10-09:00:00:00',
            status: 'Y',
            user: [
                new User({
                    id: '1233',
                    role: 'corporate',
                    firstName: 'ODDS',
                    lastName: 'ODDS',
                    email: 'odds@odds.team',
                    bankAccountName: 'odds odds',
                    bankAccountNumber: '112211221122',
                    thaiCitizenId: '12345423',
                    vat: 'non-vat',
                    slackAccount: 'odds@odds.team',
                    siteId: '',
                    transcript: ''
                }),
                new User({
                    id: '1233',
                    role: 'corporate',
                    firstName: 'ODDS',
                    lastName: 'ODDS',
                    email: 'odds@odds.team',
                    bankAccountName: 'odds odds',
                    bankAccountNumber: '112211221122',
                    thaiCitizenId: '12345423',
                    vat: 'non-vat',
                    slackAccount: 'odds@odds.team',
                    siteId: '',
                    transcript: ''
                }),
            ]
        };
        spyOn(worklogService, 'getListIncomeCorporate').and.returnValue(of(mockResponse));
        component.isUpdateList = true;
        component.ngOnChanges();
        expect(worklogService.getListIncomeCorporate).toHaveBeenCalled();
    });
});
