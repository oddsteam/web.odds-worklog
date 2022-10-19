import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingComponent } from './setting.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorklogApiService } from 'src/app/core/worklog-api.service';
import { of } from 'rxjs';
import { SettingReminder } from 'src/app/shared/model/setting-reminder-model';

const mockSettingResponse: SettingReminder = {
  name: 'ODDS',
  setting: {
    date: Object({ year: new Date().getFullYear(), month: new Date().getMonth() + 1 , day: new Date().getDate() }),
    message: 'test',
    facebook: true,
    line: true,
    slack: true,
    time: '23:59'
  }
};

describe('SettingComponent', () => {
  let component: SettingComponent;
  let fixture: ComponentFixture<SettingComponent>;
  let worklogApiService: WorklogApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SettingComponent],
      imports: [FormsModule, SharedModule.forRoot(), HttpClientTestingModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingComponent);
    worklogApiService = TestBed.inject(WorklogApiService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form date period should be 25', () => {
    const date = component.fg.controls['date'];
    date.setValue('25');
    const dateValueEqualTwentyFive = date.value === '25';
    expect(dateValueEqualTwentyFive).toBeTruthy();
  });

  it('form date period not 25', () => {
    const date = component.fg.controls['date'];
    date.setValue('1');
    const dateValueEqualTwentyFive = date.value === '25';
    expect(dateValueEqualTwentyFive).toBeFalsy();
  });

  it('form message length should be less than or equal 144', () => {
    const message = component.fg.controls['message'];
    message.setValue('มึงจะเอาเงินมั้ย');
    const messageLessthanOrEqualOneHundredAndFortyFour = message.value.length <= 144;
    expect(messageLessthanOrEqualOneHundredAndFortyFour).toBeTruthy();
  });

  it('form message length not less than or equal 144', () => {
    const message = component.fg.controls['message'];
    message.setValue(
      'มึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ย' +
      'มึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ย' +
      'มึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ย' +
      'มึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ย' +
      'มึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ย' +
      'มึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ย' +
      'มึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ย' +
      'มึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ยมึงจะเอาเงินมั้ย'
    );
    const messageLessthanOrEqualOneHundredAndFortyFour = message.value.length <= 144;
    expect(messageLessthanOrEqualOneHundredAndFortyFour).toBeFalsy();
  });

  it('should call getSettingData in worklogApiService when call getSettingData in component', () => {
    spyOn(worklogApiService, 'getSettingData').and.returnValue(of(mockSettingResponse));
    component.getSettingData();
    expect(worklogApiService.getSettingData).toHaveBeenCalled();
  });

  it('should set property date equal response from service', () => {
    spyOn(worklogApiService, 'getSettingData').and.returnValue(of(mockSettingResponse));
    component.getSettingData();
    expect(component.fg.get('date').value).toEqual(mockSettingResponse.setting.date);
  });

  it('should set property message equal response from service', () => {
    spyOn(worklogApiService, 'getSettingData').and.returnValue(of(mockSettingResponse));
    component.getSettingData();
    expect(component.fg.get('message').value).toEqual(mockSettingResponse.setting.message);
  });

  it('channelList should have value equal response when getSettingData from service return not null', () => {
    const mockChannelList = [
      {
        value: mockSettingResponse.setting.slack,
        name: 'slack'
      },
      {
        value: mockSettingResponse.setting.line,
        name: 'line'
      },
      {
        value: mockSettingResponse.setting.facebook,
        name: 'facebook'
      }
    ];
    spyOn(worklogApiService, 'getSettingData').and.returnValue(of(mockSettingResponse));
    component.getSettingData();
    expect(component.channelList).toEqual(mockChannelList);
  });

  it('property in channelList should be change when user checked checkbox', () => {
    component.channelList = [
      {
        value: mockSettingResponse.setting.slack,
        name: 'slack'
      },
      {
        value: mockSettingResponse.setting.line,
        name: 'line'
      },
      {
        value: mockSettingResponse.setting.facebook,
        name: 'facebook'
      }
    ];
    const mockEvent = {
      target: {
        checked: false
      }
    };
    component.checkBoxEvent('slack', mockEvent);
    expect(component.channelList[0].value).toEqual(false);
  });

  it('should alert `กรอกให้ครบทุกช่องด้วยครับ` if fg is invalid', () => {
    component.channelList = [
      {
        value: mockSettingResponse.setting.slack,
        name: 'slack'
      },
      {
        value: mockSettingResponse.setting.line,
        name: 'line'
      },
      {
        value: mockSettingResponse.setting.facebook,
        name: 'facebook'
      }
    ];
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith(`กรอกให้ครบทุกช่องด้วยครับ`);
  });

  it('should alert `เกินวันแล้วจ้า` if date >= 25 && date <= 27', () => {
    component.channelList = [
      {
        value: mockSettingResponse.setting.slack,
        name: 'slack'
      },
      {
        value: mockSettingResponse.setting.line,
        name: 'line'
      },
      {
        value: mockSettingResponse.setting.facebook,
        name: 'facebook'
      }
    ];
    component.fg.setValue({
      date: Object({ year: 2019, month: 7, day: 9 }),
      message: 'test',
      time: '00:00',
      channel: component.channelList
    });
    // fixture.detectChanges();
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith(`เกินวันแล้วจ้า`);
  });

  it('should alert `บันทึกสำเร็จแล้ว` if date >= 25 && date <= 27 && message.length <= 144', () => {
    component.channelList = [
      {
        value: mockSettingResponse.setting.slack,
        name: 'slack'
      },
      {
        value: mockSettingResponse.setting.line,
        name: 'line'
      },
      {
        value: mockSettingResponse.setting.facebook,
        name: 'facebook'
      }
    ];
    component.fg.setValue({
      date: Object({ year: 2019, month: 7, day: 26 }),
      message: 'test',
      time: '00:00',
      channel: component.channelList
    });
    // fixture.detectChanges();
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith(`บันทึกสำเร็จแล้ว`);
  });

  it('should alert `ใส่ได้แค่ 144 ตัวโว้ย กลับไปใส่ใหม่ !` if date >= 25 && date <= 27 && message.length > 144', () => {
    component.channelList = [
      {
        value: mockSettingResponse.setting.slack,
        name: 'slack'
      },
      {
        value: mockSettingResponse.setting.line,
        name: 'line'
      },
      {
        value: mockSettingResponse.setting.facebook,
        name: 'facebook'
      }
    ];
    component.fg.setValue({
      date: Object({ year: 2019, month: 7, day: 26 }),
      message: '1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567' +
        '89012345678901234567890123456789012345678901234567890',
      time: '00:00',
      channel: component.channelList
    });
    // fixture.detectChanges();
    spyOn(window, 'alert');
    component.onSubmit();
    expect(window.alert).toHaveBeenCalledWith(`ใส่ได้แค่ 144 ตัวโว้ย กลับไปใส่ใหม่ !`);
  });
});
