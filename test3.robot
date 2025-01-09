*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${URL}                  http://localhost:5174  # Replace with your app's URL
${BROWSER}              Chrome
${DELAY}                2s                     # Delay between steps (2 seconds)
${FIRST_NAME}           ziad                   # First name for the test donor
${LAST_NAME}            amr                    # Last name for the test donor
${EMAIL}                ziad@gmail.com         # Email for the test donor
${INVALID_PHONE}        01001032224            # Invalid phone number (does not start with 201)
${VALID_PHONE}          201091886686           # Valid phone number (starts with 201 and is 12 digits)
${PREFERRED_LANGUAGE}   English                # Preferred language for the test donor
${ADDRESS}              eggy                   # Address for the test donor

*** Test Cases ***
Verify Donor Phone Number Validation
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window
    Sleep    ${DELAY}  # Pause after opening the browser

    # Navigate to Donors Page
    Click Element    xpath=//a[contains(text(), 'Donors')]
    Sleep    ${DELAY}  # Pause after clicking the link
    Wait Until Page Contains    Donors
    Sleep    ${DELAY}  # Pause after waiting for the page to load

    # Wait for the form to be visible
    Wait Until Element Is Visible    name=firstName    20s
    Sleep    ${DELAY}  # Pause after waiting for the form

    # Test with an invalid phone number
    Input Text    name=firstName         ${FIRST_NAME}
    Sleep    ${DELAY}  # Pause after entering the first name
    Input Text    name=lastName          ${LAST_NAME}
    Sleep    ${DELAY}  # Pause after entering the last name
    Input Text    name=email             ${EMAIL}
    Sleep    ${DELAY}  # Pause after entering the email
    Input Text    name=phoneNumber       ${INVALID_PHONE}
    Sleep    ${DELAY}  # Pause after entering the phone number
    Select From List By Value    name=preferredLanguage    ${PREFERRED_LANGUAGE}
    Sleep    ${DELAY}  # Pause after selecting the preferred language
    Input Text    name=address           ${ADDRESS}
    Sleep    ${DELAY}  # Pause after entering the address
    Click Button    xpath=//button[contains(text(), 'Add Donor')]
    Sleep    ${DELAY}  # Pause after clicking the "Add Donor" button

    # Verify that the error message is displayed
    Wait Until Element Is Visible    xpath=//p[@class='error' and contains(text(), 'Phone number must be 12 digits and start with 201')]    10s
    Log    Donor with invalid phone number was correctly rejected.

    # Test with a valid phone number
    Input Text    name=firstName         ${FIRST_NAME}
    Sleep    ${DELAY}  # Pause after entering the first name
    Input Text    name=lastName          ${LAST_NAME}
    Sleep    ${DELAY}  # Pause after entering the last name
    Input Text    name=email             ${EMAIL}
    Sleep    ${DELAY}  # Pause after entering the email
    Input Text    name=phoneNumber       ${VALID_PHONE}
    Sleep    ${DELAY}  # Pause after entering the phone number
    Select From List By Value    name=preferredLanguage    ${PREFERRED_LANGUAGE}
    Sleep    ${DELAY}  # Pause after selecting the preferred language
    Input Text    name=address           ${ADDRESS}
    Sleep    ${DELAY}  # Pause after entering the address
    Click Button    xpath=//button[contains(text(), 'Add Donor')]
    Sleep    ${DELAY}  # Pause after clicking the "Add Donor" button

    # Log that the test passed (no verification for valid phone number)
    Log    Test passed: Donor creation steps with valid phone number completed successfully.

    Close Browser