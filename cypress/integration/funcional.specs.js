/// <reference types="Cypress" />

import loc from '../support/locators'
import '../support/commandsConta'
import '../support/commandsContaMovimentacao'


describe('Should test at a funcional nivel', () => {
  before(() => {
    cy.login('Jarbas Junior', 'jarbas.junior', '123456')
  })

  beforeEach(() => {
    cy.get(loc.MENU.HOME).click()
    cy.resetData()
  })

  it('Inserir conta', () => {
    const addedMessage = 'Conta inserida com sucesso!'
    cy.acessarMenuConta()
    cy.inserirConta('Conta teste')
    cy.xpath(loc.FN_XP_MESSAGE(addedMessage)).should('exist')
    cy.xpath(loc.FN_XP_CLOSE_MESSAGE(addedMessage)).click()
  });
  
  it('Should update an account', () => {
    const updateMessage = 'Conta atualizada com sucesso!'
    cy.acessarMenuConta()
    cy.editarConta('Conta para alterar')
    cy.xpath(loc.FN_XP_MESSAGE(updateMessage)).should('exist')
    cy.xpath(loc.FN_XP_CLOSE_MESSAGE(updateMessage)).click()
  });
  
  it('Should not create an account with same name', () => {
    cy.acessarMenuConta()
    cy.get(loc.CONTA.FIELD_NAME).type('Conta para alterar')
    cy.get(loc.CONTA.BTN_SALVAR).click()
    cy.get(loc.CONTA.MESSAGE).should('contain', 'code 400')
  });
  
  it('Should create a transaction', () => {
    const accountName = 'Conta para movimentacoes'
    cy.get(loc.MENU.MOVIMENTACAO).click()
    cy.inserirContaMovimentacao(accountName, '10,00', 'Eu mesmo')
    cy.xpath(loc.FN_XP_MESSAGE('Movimentação inserida com sucesso!')).should('exist')
    cy.get(loc.EXTRATO.REGISTROS).should('have.length', 7)
    cy.xpath(loc.EXTRATO.FN_XP_REGISTRO(accountName, '10,00')).should('exist')
    cy.xpath(loc.FN_XP_CLOSE_MESSAGE('Movimentação inserida com sucesso!')).click()
  });

  it('Should get balance', () => {
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo', '534,00')).should('exist')

    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_REGISTRO('Movimentacao 1, calculo saldo')).click()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(loc.MOVIMENTACAO.CHANGE_STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta para saldo', '534,00')).should('exist')
  });

  it('Should remove a transaction', () => {
    const account = 'Movimentacao para exclusao'
    cy.get(loc.MENU.EXTRATO).click()
    cy.excluirConta(account)
    cy.xpath(loc.EXTRATO.FN_XP_NOME_REGISTRO(account)).should('not.exist')
  });
})