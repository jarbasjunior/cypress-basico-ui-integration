import loc from './locators'

Cypress.Commands.add('inserirContaMovimentacao', (conta, valor, interessado) => {
  cy.get(loc.MOVIMENTACAO.DESCRICAO).type(conta)
  cy.get(loc.MOVIMENTACAO.VALOR).type(valor)
  cy.get(loc.MOVIMENTACAO.INTERESSADO).type(interessado)
  cy.get(loc.MOVIMENTACAO.CHANGE_STATUS).click()
  cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
})