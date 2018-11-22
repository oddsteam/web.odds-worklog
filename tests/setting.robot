*** Settings ***
Resource            setting/setting-keyword.robot
# Suite Teardown           Close All Browsers

*** Test Cases ***
Save success
    Go to setting page
    Insert date
    Insert message
    Checked slack checkbox
    Clicked submit button