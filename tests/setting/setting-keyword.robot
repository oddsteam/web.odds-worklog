*** Settings ***
Resource    ../setting/setting-variable.robot

*** Keywords ***
Go to setting page
    Open Browser    ${WORKLOG_URL}      ${BROWSER}
    Click Element   ${SETTING_URL}

Insert date
    ${period}=    Get Value   ${DATE}
    Input Text  ${DATE}    ${period}

Checked period date
    ${period}=    Get Value   ${DATE}
    Should Be True  ${period}==25 or ${period}==26 or ${period}==27

Insert message
    ${text}=    Get Value   ${MESSAGE}
    Input Text  ${MESSAGE}  ${text}

Checked length message
    ${length}=  Get Length  ${MESSAGE}
    Should Be True  ${length}<144

Checked slack checkbox
    Click Element   ${CHANNEL_SLACK}

Clicked submit button
    Click Button    ${SUBMIT_BUTTON}