export class SettingReminder {
    name: string;
    setting: Setting;
}

export interface Setting {
    date: string;
    message: string;
    time: string;
    slack: boolean;
    line: boolean;
    facebook: boolean;
}
