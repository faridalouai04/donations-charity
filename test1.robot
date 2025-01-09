*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}                  http://localhost:5174  # Replace with your app's URL
${BROWSER}              Chrome
${VALID_CHARITY_ID}     1                      # Replace with a valid charity ID
${INVALID_CHARITY_ID}   999                    # Replace with an invalid charity ID
${DELAY}                2s                     # Delay between steps (2 seconds)
${CAMPAIGN_TITLE}       Test Campaign          # Title for the test campaign
${START_DATE}           09/01/2025             # Start date for the campaign (dd/mm/yyyy)
${END_DATE}             20/01/2025             # End date for the campaign (dd/mm/yyyy)

*** Test Cases ***
Create Campaign With Valid and Invalid Charity IDs (No Verification)
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Sleep    ${DELAY}  # Pause after opening the browser

    # Navigate to Manage Campaigns
    Click Element    xpath=//a[contains(text(), 'Manage Campaigns')]
    Sleep    ${DELAY}  # Pause after clicking the link
    Wait Until Page Contains    Campaigns
    Sleep    ${DELAY}  # Pause after waiting for the page to load

    # Wait for the form to be visible
    Wait Until Element Is Visible    name=title    20s
    Sleep    ${DELAY}  # Pause after waiting for the form

    # Fill out the form with an INVALID charity ID and submit
    Input Text    name=title         ${CAMPAIGN_TITLE}
    Sleep    ${DELAY}  # Pause after entering the title
    Input Text    name=description   This is a test campaign
    Sleep    ${DELAY}  # Pause after entering the description
    Input Text    name=goalAmount    1000
    Sleep    ${DELAY}  # Pause after entering the goal amount
    Select From List By Value    name=preferredCurrency    USD
    Sleep    ${DELAY}  # Pause after selecting the currency
    Input Text    name=startDate     ${START_DATE}
    Sleep    ${DELAY}  # Pause after entering the start date
    Input Text    name=endDate       ${END_DATE}
    Sleep    ${DELAY}  # Pause after entering the end date
    Input Text    name=charityId     ${INVALID_CHARITY_ID}
    Sleep    ${DELAY}  # Pause after entering the charity ID
    Click Button    xpath=//button[contains(text(), 'Add Campaign')]
    Sleep    ${DELAY}  # Pause after clicking the "Add Campaign" button

    # Wait for the page to reload
    Wait Until Page Contains    Campaigns    20s
    Sleep    ${DELAY}  # Pause after waiting for the page to reload

    # Log that the invalid charity ID steps were completed
    Log    Test completed: Campaign creation steps with INVALID charity ID executed.

    # Fill out the form with a VALID charity ID and submit
    Input Text    name=title         ${CAMPAIGN_TITLE}
    Sleep    ${DELAY}  # Pause after entering the title
    Input Text    name=description   This is a valid campaign
    Sleep    ${DELAY}  # Pause after entering the description
    Input Text    name=goalAmount    5000
    Sleep    ${DELAY}  # Pause after entering the goal amount
    Select From List By Value    name=preferredCurrency    USD
    Sleep    ${DELAY}  # Pause after selecting the currency
    Input Text    name=startDate     ${START_DATE}
    Sleep    ${DELAY}  # Pause after entering the start date
    Input Text    name=endDate       ${END_DATE}
    Sleep    ${DELAY}  # Pause after entering the end date
    Input Text    name=charityId     ${VALID_CHARITY_ID}
    Sleep    ${DELAY}  # Pause after entering the charity ID
    Click Button    xpath=//button[contains(text(), 'Add Campaign')]
    Sleep    ${DELAY}  # Pause after clicking the "Add Campaign" button

    # Wait for the page to reload
    Wait Until Page Contains    Campaigns    20s
    Sleep    ${DELAY}  # Pause after waiting for the page to reload

    # Log that the valid charity ID steps were completed
    Log    Test completed: Campaign creation steps with VALID charity ID executed.

    Close Browser