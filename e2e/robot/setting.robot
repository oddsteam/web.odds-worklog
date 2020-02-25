*** Settings ***
Library                 SeleniumLibrary
Resource                setting/setting-keyword.robot
Suite Teardown           Close All Browsers

*** Test Cases ***
Save success
    Go to setting page
    Insert date
    Checked period date
    Insert message
    Checked length message
    Checked slack checkbox
    Clicked submit button