import loc from './locators'

Cypress.Commands.add('acessarMenuConta', () => {
  cy.get(loc.MENU.SETTINGS).click()
  cy.get(loc.SETTINGS.CONTAS).click()
})

Cypress.Commands.add('inserirConta', conta => {
  cy.get(loc.CONTA.FIELD_NAME).type(conta)
  cy.get(loc.CONTA.BTN_SALVAR).click()
})

Cypress.Commands.add('editarConta', conta => {
  cy.xpath(`//td[text()='${conta}']/..//i[@class='far fa-edit']`).click()
  cy.get(loc.CONTA.FIELD_NAME).clear().type(conta)
  cy.get(loc.CONTA.BTN_SALVAR).click()
})

Cypress.Commands.add('excluirConta', conta => {
  const removeRegister = 'Movimentação removida com sucesso!'
  cy.xpath(loc.EXTRATO.FN_XP_EXCLUIR_REGISTRO(conta)).click()
  cy.xpath(loc.FN_XP_MESSAGE(removeRegister)).should('exist')
  cy.xpath(loc.FN_XP_CLOSE_MESSAGE(removeRegister)).click()
})
