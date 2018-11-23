import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  fg: FormGroup;
  channelList;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.setupForm();
    this.getChannel();
  }

  setupForm() {
    this.fg = this.fb.group({
      date: ['', Validators.required],
      message: ['', Validators.required],
      time: ['23:59', Validators.required],
      channel: ['', Validators.required]
    });
    this.fg.get('time').disable();
  }

  getChannel() {
    this.channelList = [
      {
        value: false,
        name: 'Slack'
      },
      {
        value: false,
        name: 'Line'
      },
      {
        value: false,
        name: 'Facebook'
      },
    ];
  }

  checkBoxEvent(channel, value) {
    // console.log(channel, value);
  }

  onSubmit() {
    const date = Number(this.fg.controls['date'].value);
    const message = this.fg.controls['message'].value;
    if (this.fg.valid) {
      if (date >= 25 && date <= 27) {
        if (message.length <= 144) {
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
