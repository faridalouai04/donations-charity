*** Settings ***
Library    SeleniumLibrary
Library    DateTime

*** Variables ***
${URL}                  http://localhost:5174  # Replace with your app's URL
${BROWSER}              Chrome
${DELAY}                2s                     # Delay between steps (2 seconds)
${CAMPAIGN_TITLE}       Test Campaign          # Title for the test campaign
${CAMPAIGN_DESCRIPTION}  This is a test campaign  # Description for the test campaign
${GOAL_AMOUNT}          1000                   # Goal amount for the test campaign
${PREFERRED_CURRENCY}   USD                    # Preferred currency for the test campaign
${VALID_START_DATE}     09/01/2025             # Valid start date (dd/mm/yyyy)
${INVALID_START_DATE}   01/01/2020             # Invalid start date (in the past)
${END_DATE}             20/01/2025             # End date for the campaign (dd/mm/yyyy)
${VALID_CHARITY_ID}     1                      # Valid charity ID
${INVALID_CHARITY_ID}   999                    # Invalid charity ID

*** Test Cases ***
Verify Campaign Start Date Validation
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

    # Test with an invalid start date
    Input Text    name=title         ${CAMPAIGN_TITLE}
    Sleep    ${DELAY}  # Pause after entering the title
    Input Text    name=description   ${CAMPAIGN_DESCRIPTION}
    Sleep    ${DELAY}  # Pause after entering the description
    Input Text    name=goalAmount    ${GOAL_AMOUNT}
    Sleep    ${DELAY}  # Pause after entering the goal amount
    Select From List By Value    name=preferredCurrency    ${PREFERRED_CURRENCY}
    Sleep    ${DELAY}  # Pause after selecting the currency
    Input Text    name=startDate     ${INVALID_START_DATE}
    Sleep    ${DELAY}  # Pause after entering the start date
    Input Text    name=endDate       ${END_DATE}
    Sleep    ${DELAY}  # Pause after entering the end date
    Input Text    name=charityId     ${VALID_CHARITY_ID}
    Sleep    ${DELAY}  # Pause after entering the charity ID
    Click Button    xpath=//button[contains(text(), 'Add Campaign')]
    Sleep    ${DELAY}  # Pause after clicking the "Add Campaign" button

    # Verify that the error message is displayed
    Wait Until Element Is Visible    xpath=//p[@class='error' and contains(text(), 'Start date must be today or later')]    10s
    Log    Campaign with invalid start date was correctly rejected.

    # Test with a valid start date
    Input Text    name=title         ${CAMPAIGN_TITLE}
    Sleep    ${DELAY}  # Pause after entering the title
    Input Text    name=description   ${CAMPAIGN_DESCRIPTION}
    Sleep    ${DELAY}  # Pause after entering the description
    Input Text    name=goalAmount    ${GOAL_AMOUNT}
    Sleep    ${DELAY}  # Pause after entering the goal amount
    Select From List By Value    name=preferredCurrency    ${PREFERRED_CURRENCY}
    Sleep    ${DELAY}  # Pause after selecting the currency
    Input Text    name=startDate     ${VALID_START_DATE}
    Sleep    ${DELAY}  # Pause after entering the start date
    Input Text    name=endDate       ${END_DATE}
    Sleep    ${DELAY}  # Pause after entering the end date
    Input Text    name=charityId     ${VALID_CHARITY_ID}
    Sleep    ${DELAY}  # Pause after entering the charity ID
    Click Button    xpath=//button[contains(text(), 'Add Campaign')]
    Sleep    ${DELAY}  # Pause after clicking the "Add Campaign" button

    # Log that the test passed (no verification for valid start date)
    Log    Test passed: Campaign creation steps with valid start date completed successfully.

    Close Browser