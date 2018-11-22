*** Settings ***
Resource    ../setting/setting-variable.robot

*** Keywords ***
Go to setting page
    Open Browser    ${WORKLOG_URL}      ${BROWSER}
    Click Element   ${SETTING_URL}

Insert date
    Input Text  ${DATE}    25

Insert message
    Input Text  ${MESSAGE}  มึงจะเอาเงินมั้ย

Checked slack checkbox
    Click Element   ${CHANNEL_SLACK}

Clicked submit button
    Click Button    ${SUBMIT_BUTTON}