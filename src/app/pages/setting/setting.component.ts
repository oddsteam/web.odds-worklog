import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WorklogApiService } from 'src/app/core/worklog-api.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  fg: FormGroup;
  channelList;
  constructor(
    private fb: FormBuilder,
    private worklogApiService: WorklogApiService
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
    this.fg.get('time').disable();
  }

  getSettingData() {
    this.worklogApiService.getSettingData().subscribe(response => {
      this.fg.controls['date'].setValue(response.setting.date);
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
    const date = this.fg.controls['date'].value;
    const message = this.fg.controls['message'].value;
    const setting = {
      date: date,
      message: message,
    };
    this.channelList.map(data => {
      setting[data.name] = data.value;
    });
    if (this.fg.valid) {
      if (date >= 25 && date <= 27) {
        if (message.length <= 144) {
          const body = {
            name: 'reminder',
            setting: setting
          };
          this.worklogApiService.sendMessage(body).subscribe(response => {
            // console.log(response, 'res');
          });
          alert('Message เข้าแล้วจ้า');
        } else {
          alert('Message เกินพิกัดครับ');
        }
      } else {
        alert('เกินวันแล้วจ้า');
      }
    } else {
      alert('กรอกให้ครบทุกช่องด้วยครับ');
    }
  }

}
