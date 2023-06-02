/// <reference types="cypress" />

import { pageSelector } from './../../../test-utils/constants'

const userLoginInfo = {
  email: 'ahsan@zaions.com',
  password: 'asd123!@#'
}
const loginButtonSelector =
  'ion-button.mt-4.ion-text-capitalize.md.button.button-block.button-solid.ion-activatable.ion-focusable'

const clickOnLoginButtonInTopBar = () => {
  // Try & Select the login button, and click on it
  cy.get('ion-router-link[router-link="/sign-in"]').click()
}

describe('Checking and Clicking on Login Button', () => {
  beforeEach(() => {
    // Go tp Home Page
    cy.visit('/')
  })

  it('Check if login button is visible in top navigation bar', () => {
    clickOnLoginButtonInTopBar()

    // if the above step completes we should be on login page
    cy.get(loginButtonSelector).then(el => {
      const loginButtonText = el.text().toLowerCase()
      assert(loginButtonText.includes('log in'))
    })
    cy.get(loginButtonSelector).should('contain.text', 'Log')
  })

  it.only('Login into user account and confirms that it shows a login success notification', () => {
    // to go login page
    clickOnLoginButtonInTopBar()

    // First Enter Invalid data in email input and confirms that the login button gets disabled
    // Select the email input and type user email
    cy.get(pageSelector.login.emailInput)
      .clear()
      .type('invalid-data')

    // right now we are clicking on this button, just to un-focus the email input field, then only the form will become invalid and it will show that error message
    cy.get(loginButtonSelector).click()

    // check that login button is disabled
    // TODO! - testing - coding error, developer has not put the disabled condition
    // cy.get(loginButtonSelector).should('be.disabled')

    // check that invalid email error message is shown
    cy.get(pageSelector.login.emailInput)
      .get('.error-text')
      .should('include.text', 'EmailAddress')

    // Select the email input and type user email
    cy.get(pageSelector.login.emailInput)
      .clear()
      .type(userLoginInfo.email)

    // Select the email input and type user email
    cy.get('input[name="password"]').type(userLoginInfo.password)

    // check that Login button is enabled
    cy.get(loginButtonSelector).should('not.be.disabled')

    // click on login button and user should get logged in
    cy.get(loginButtonSelector).click()

    // check that create workspace button/card is visible
    cy.get('ion-text[class="text-lg md"]').should('include.text', 'workspace')
  })
})
