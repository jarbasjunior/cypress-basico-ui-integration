/// <reference types="Cypress" />

import loc from '../support/locators'
import '../support/commandsConta'
import '../support/commandsContaMovimentacao'
import buildEnv from '../support/buildEnv'


describe('Should test at a frontend nivel', () => {
  const user = 'fake_user'
  
  beforeEach(() => {
    cy.clearLocalStorage()
    buildEnv()
    cy.login(user, user, 'errada')
    cy.get(loc.MENU.HOME).click()
  })

  after(() => {
    cy.clearLocalStorage()
  })

  it('Should test  the responsiveness', () => {
    cy.get(loc.MENU.HOME).should('exist').and('be.visible')
    cy.viewport('iphone-5')
    cy.get(loc.MENU.HOME).should('exist').and('not.be.visible')
    cy.viewport('ipad-2')
    cy.get(loc.MENU.HOME).should('exist').and('be.visible')
  });

  it('Should create account', () => {
    const addedMessage = 'Conta inserida com sucesso!'
    
    cy.route({
      method: 'POST',
      url: '/contas',
      response: [
        { id: 3, nome: 'Conta teste', visivel: true, usuario_id: 1 }
      ] 
    }).as('salvarConta')
    
    
    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
        { id: 2, nome: 'Banco', visivel: true, usuario_id: 2 },
        { id: 3, nome: 'Conta teste', visivel: true, usuario_id: 3 }
      ] 
    }).as('contaSalva')
    
    cy.acessarMenuConta()
    cy.inserirConta('Conta teste')
    cy.xpath(loc.FN_XP_MESSAGE(addedMessage)).should('exist')
    cy.xpath(loc.FN_XP_CLOSE_MESSAGE(addedMessage)).click()
  });
  
  it('Should update an account', () => {
    const updateMessage = 'Conta atualizada com sucesso!'

    cy.route({
      method: 'PUT',
      url: '/contas/**',
      response: [
        { id: 1, nome: 'Conta alterada', visivel: true, usuario_id: 1 }
      ] 
    }).as('alterarConta')

    cy.acessarMenuConta()
    cy.editarConta('Carteira')
    cy.xpath(loc.FN_XP_MESSAGE(updateMessage)).should('exist')
    cy.xpath(loc.FN_XP_CLOSE_MESSAGE(updateMessage)).click()
  });
  
  it('Should not create an account with same name', () => {
    cy.route({
      method: 'POST',
      url: '/contas',
      response: { erro: "Já existe uma conta com esse nome!" },
      status: 400
    }).as('salvarContaMesmoNome')

    cy.acessarMenuConta()
    cy.get(loc.CONTA.FIELD_NAME).type('Conta para alterar')
    cy.get(loc.CONTA.BTN_SALVAR).click()
    cy.get(loc.CONTA.MESSAGE).should('contain', 'code 400')
  });
  
  it('Should create a transaction', () => {
    const accountName = 'Conta para movimentacoes'
    cy.route({
      method: 'POST',
      url: '/transacoes',
      response: { 
        conta_id: 2134383, 
        descricao: accountName, 
        envolvido: 'Interessado teste', 
        observacao: null, 
        parcelamento_id: null, 
        status: true,
        tipo: 'REC', 
        transferencia_id: null, 
        data_transacao: '2019-11-13T03:00:00Z',
        data_pagamento: '2019-11-13T03:00:00Z',
        usuario_id: 453452, 
        valor: '10,00'
      },
    }).as('criarTransacao')
  
    cy.route({
      method: 'GET',
      url: '/extrato/**',
      response: 'fixture:movimentacaoSalva'
    }).as('extratoAposSalvar')

    cy.get(loc.MENU.MOVIMENTACAO).click()
    cy.inserirContaMovimentacao(accountName, '10,00', 'Eu mesmo')
    cy.xpath(loc.FN_XP_MESSAGE('Movimentação inserida com sucesso!')).should('exist')
    cy.get(loc.EXTRATO.REGISTROS).should('have.length', 7)
    cy.xpath(loc.EXTRATO.FN_XP_REGISTRO(accountName, '10,00')).should('exist')
    cy.xpath(loc.FN_XP_CLOSE_MESSAGE('Movimentação inserida com sucesso!')).click()
  });

  it('Should get balance', () => {
    cy.route({
      method: 'GET',
      url: '/transacoes/**',
      response: {
        "conta": "Conta para saldo",
        "id": 438028,
        "descricao": "Movimentacao 1, calculo saldo",
        "envolvido": "CCC",
        "observacao": null,
        "tipo": "REC",
        "data_transacao": "2021-03-15T03:00:00.000Z",
        "data_pagamento": "2021-03-15T03:00:00.000Z",
        "valor": "3500.00",
        "status": false,
        "conta_id": 475387,
        "usuario_id": 13591,
        "transferencia_id": null,
        "parcelamento_id": null
      },
    })
    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta carteira', '50,00')).should('exist')

    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_ALTERAR_REGISTRO('Movimentacao 1, calculo saldo')).click()
    cy.get(loc.MOVIMENTACAO.DESCRICAO).should('have.value', 'Movimentacao 1, calculo saldo')
    cy.get(loc.MOVIMENTACAO.CHANGE_STATUS).click()
    cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()

    cy.get(loc.MENU.HOME).click()
    cy.xpath(loc.SALDO.FN_XP_SALDO_CONTA('Conta carteira', '50,00')).should('exist')
  });

  it('Should remove a transaction', () => {
    cy.route({
      method: 'DELETE',
      url: '/transacoes/**',
      response: {},
      status: 204
    }).as('delete')

    const account = 'Movimentacao para exclusao'
    cy.get(loc.MENU.EXTRATO).click()
    cy.excluirConta(account)
    // cy.xpath(loc.EXTRATO.FN_XP_NOME_REGISTRO(account)).should('not.exist')
  });

  it('Should validate data send to create an account', () => {
    const addedMessage = 'Conta inserida com sucesso!'
    const reqStub = cy.stub()
    cy.route({
      method: 'POST',
      url: '/contas',
      response: [ { id: 3, nome: 'Conta teste', visivel: true, usuario_id: 1 } ],
      onRequest: reqStub
      // onRequest: req => {
      //   expect(req.request.body.nome).to.be.empty
      //   expect(req.request.headers).to.have.property('Authorization')
      // }
    }).as('salvarConta')
    
    
    cy.route({
      method: 'GET',
      url: '/contas',
      response: [
        { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
        { id: 2, nome: 'Banco', visivel: true, usuario_id: 2 },
        { id: 3, nome: 'Conta teste', visivel: true, usuario_id: 3 }
      ] 
    }).as('contaSalva')
    
    cy.acessarMenuConta()
    cy.inserirConta('{CONTROL}')
    // cy.wait('@salvarConta').its('request.body.nome').should('not.be.empty')
    cy.wait('@salvarConta').then(() => {
      expect(reqStub.args[0][0].request.body.nome).to.be.empty
      expect(reqStub.args[0][0].request.headers).to.have.property('Authorization')
    })
    cy.xpath(loc.FN_XP_MESSAGE(addedMessage)).should('exist')
    cy.xpath(loc.FN_XP_CLOSE_MESSAGE(addedMessage)).click()
  });

  it('Should test colors', () => {
    cy.route({
        method: 'GET',
        url: '/extrato/**',
        response: [
          { "conta": "Conta para movimentacoes", "id": 438026, "descricao": "Receita paga", "envolvido": "AAA", "observacao": null, "tipo": "REC", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 475385, "usuario_id": 13591, "transferencia_id": null, "parcelamento_id": null }, 
          { "conta": "Conta com movimentacao", "id": 438027, "descricao": "Receita pendente", "envolvido": "BBB", "observacao": null, "tipo": "REC", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "-1500.00", "status": false, "conta_id": 475386, "usuario_id": 13591, "transferencia_id": null, "parcelamento_id": null }, 
          { "conta": "Conta para saldo", "id": 438028, "descricao": "Despesa paga", "envolvido": "CCC", "observacao": null, "tipo": "DESP", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 475387, "usuario_id": 13591, "transferencia_id": null, "parcelamento_id": null }, 
          { "conta": "Conta para saldo", "id": 438029, "descricao": "Despesa pendente", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "-1000.00", "status": false, "conta_id": 475387, "usuario_id": 13591, "transferencia_id": null, "parcelamento_id": null }, 
        ]
      }).as('extrato')
    cy.get(loc.MENU.EXTRATO).click()
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita paga')).should('have.class', 'receitaPaga')
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Receita pendente')).should('have.class', 'receitaPendente')
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa pendente')).should('have.class', 'despesaPendente')
    cy.xpath(loc.EXTRATO.FN_XP_LINHA('Despesa paga')).should('have.class', 'despesaPendente')
  });
})