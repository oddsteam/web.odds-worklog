import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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
      date: [''],
      message: [''],
      time: ['23:59'],
      channel: ['']
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
    console.log(channel, value);
  }

}
