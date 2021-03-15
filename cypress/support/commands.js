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

Cypress.Commands.add('resetViaRest', token => {
  cy.request({
    method: 'GET',
    url: '/reset',
    headers: { Authorization: `JWT ${token}` }
  }).its('status').should('be.equal', 200)
})

Cypress.Commands.add('getToken', (login, password) => {
  cy.request({
    method: 'POST',
    url: '/signin',
    body: { email: login, senha: password, redirecionar: false }
  }).its('body.token').should('not.be.empty')
      .then(token => {
        Cypress.env('token', token)
        return token
      })
})

Cypress.Commands.add('getIdConta', (conta) => {
  cy.getToken('jarbas.junior@email.com', '123456').then(token => {
    cy.request({
      method: 'GET',
      url: '/contas',
      headers: { Authorization: `JWT ${token}` },
      qs: { name: conta }
    }).then(res => {
      return res.body[0].id
    })
  })
})

Cypress.Commands.add('getTransacao', (conta) => {
  cy.getToken('jarbas.junior@email.com', '123456').then(token => {
    cy.request({
      url: 'transacoes',
      method: 'GET',
      headers: { Authorization: `JWT ${token}` },
      qs: { descricao: conta }
    }).then(res => {
      return res.body[0]
    })
  })
})

Cypress.Commands.overwrite('request', (originalFn, ...options) => {
  if(options.length === 1) {
    if(Cypress.env('token')) {
      options[0].headers = {
        Authorization: `JWT ${Cypress.env('token')}`
      }
    }
  }
  return originalFn(...options)
})