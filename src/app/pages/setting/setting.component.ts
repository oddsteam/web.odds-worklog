import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  fg: FormGroup;
  model: NgbDateStruct;
  today = this.calendar.getToday();
  channelList;
  constructor(
    private fb: FormBuilder,
    private worklogApiService: WorklogApiService,
    private calendar: NgbCalendar
  ) { }

  ngOnInit() {
    this.setupForm();
    this.getSettingData();
  }

  setupForm() {
    this.fg = this.fb.group({
      date: ['', Validators.required],
      message: ['', Validators.required],
      time: ['23:59', Validators.required],
      channel: ['']
    });
  }


  getSettingData() {
    this.worklogApiService.getSettingData().subscribe(response => {
      const dateFormCtrl = new Date();
      const currentThaiYear = dateFormCtrl.getFullYear() ;
      const currentMonth = dateFormCtrl.getMonth() + 1;
      const currentDate = dateFormCtrl.getDate();
      const result =  { year: currentThaiYear, month: currentMonth, day: currentDate };
      this.fg.patchValue({ date: result });
      this.fg.controls['message'].setValue(response.setting.message);
      if (response) {
        this.channelList = [
          {
            value: response.setting.slack,
            name: 'slack'
          },
          {
            value: response.setting.line,
            name: 'line'
          },
          {
            value: response.setting.facebook,
            name: 'facebook'
          }
        ];
      }
    });
  }

  checkBoxEvent(channel, event) {
    const value = event.target.checked;
    this.channelList.map(data => {
      if (data.name === channel) {
        data.value = value;
      }
    });
  }

  onSubmit() {
    // tslint:disable-next-line:max-line-length
    const date = this.fg.controls['date'].value['day'];
    const message = this.fg.controls['message'].value;
    const setting = {
      date: String(date),
      message: message,
    };
    this.channelList.map(data => {
      setting[data.name] = data.value;
    });
    const listFlag = this.channelList.map(x => x.value);
    const canSubmit = listFlag.includes(true);
    if (this.fg.valid && canSubmit) {
      if (date >= 25 && date <= 27) {
        if (message.length <= 144) {
          const body = {
            name: 'reminder',
            setting: setting
          };
          this.worklogApiService.sendMessage(body).subscribe(response => {
          });
          alert('บันทึกสำเร็จแล้ว');
        } else {
          alert('ใส่ได้แค่ 144 ตัวโว้ย กลับไปใส่ใหม่ !');
        }
      } else {
        alert('เกินวันแล้วจ้า');
      }
    } else {
      alert('กรอกให้ครบทุกช่องด้วยครับ');
    }
  }
}
