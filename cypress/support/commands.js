// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import loc from './locators'

Cypress.Commands.add('clickAlert', (locator, message) => {
  cy.get(locator).click()
    cy.on('window:alert', msg => {
      expect(msg, 'It must be [' + msg + ']').to.be.equal(message)
    })
})

Cypress.Commands.add('login', (user, password) => {
  const welcomeMessage = 'Bem vindo, Jarbas Junior!'
  cy.visit('https://barrigareact.wcaquino.me')
  cy.get(loc.LOGIN.USER).type(user)
  cy.get(loc.LOGIN.PASSWORD).type(password)
  cy.get(loc.LOGIN.BTN).click()
  cy.xpath(loc.FN_XP_MESSAGE(welcomeMessage)).should('exist')
  cy.xpath(loc.FN_XP_CLOSE_MESSAGE(welcomeMessage)).click()
})

Cypress.Commands.add('resetData', () => {
  cy.get(loc.MENU.SETTINGS).click()
  cy.get(loc.SETTINGS.RESET).click()
  cy.xpath(loc.FN_XP_CLOSE_MESSAGE('Dados resetados com sucesso!')).click()
})