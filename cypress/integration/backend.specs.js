/// <reference types="Cypress" />

describe('Should test at a backend nivel', () => {
  let token

  before(() => {
    cy.getToken('jarbas.junior@email.com', '123456')
      .then(tkn => {
        token = tkn
      })
  })

  beforeEach(() => {
    cy.resetViaRest(token)
  })

  it('Inserir conta', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      // headers: { Authorization: `JWT ${token}` },
      body: { nome: 'Conta via rest' }
    }).as('response')  

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.be.property('id')
      expect(res.body).to.be.property('nome', 'Conta via rest')
    })
  });
  
  it('Should update an account', () => {
    const account = 'Conta alterada via rest'
    cy.getIdConta(account).then(idAccount => {
      cy.request({
        method: 'PUT',
        url: `/contas/${idAccount}`,
        // headers: { Authorization: `JWT ${token}` },
        body: { nome: account }
      }).then(res => {
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.property('id', idAccount)
        expect(res.body).to.be.property('nome', account)
        expect(res.body).to.be.property('usuario_id')
        expect(res.body).to.be.property('visivel', true)
      })  
    })
  });
  
  it('Should not create an account with same name', () => {
    cy.request({
      method: 'POST',
      url: '/contas',
      // headers: { Authorization: `JWT ${token}` },
      body: { nome: 'Conta mesmo nome' },
      failOnStatusCode: false
    }).as('response')  
    
    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(400)
      expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
    })
  });
  
  it('Should create a transaction', () => {
    const description = 'Descrição Teste'
    const interested = 'Interessado teste'
    cy.getIdConta('Conta para movimentacoes').then(idAccount => {
      cy.request({
        method: 'POST',
        url: `/transacoes`,
        // headers: { Authorization: `JWT ${token}` },
        failOnStatusCode: false,
        body: { 
          conta_id: idAccount,
          data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
          data_transacao: Cypress.moment().format('DD/MM/YYYY'),
          descricao: description,
          envolvido: interested,
          status: true,
          tipo: 'REC',
          valor: '10.00' 
        }
      }).as('response')  
    })

    cy.get('@response').then(res => {
      expect(res.status).to.be.equal(201)
      expect(res.body).to.be.property('id')
      expect(res.body).to.be.property('conta_id')
      expect(res.body.descricao).to.be.equal(description)
      expect(res.body.envolvido).to.be.equal(interested)
    })
  });

  it('Should get balance', () => {
    cy.request({
      url: '/saldo',
      method: 'GET',
      // headers: { Authorization: `JWT ${token}` },
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if (c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('534.00')
    })

    cy.getTransacao('Movimentacao 1, calculo saldo').then(res => {
      cy.request({
        url: `/transacoes/${res.id}`,
        method: 'PUT',
        // headers: { Authorization: `JWT ${token}` },
        body: { 
          status: true,
          data_pagamento: Cypress.moment(res.data_transacao).add({days: 1}).format('DD/MM/YYYY'),
          data_transacao: Cypress.moment(res.data_pagamento).format('DD/MM/YYYY'),
          descricao: res.descricao,
          envolvido: res.envolvido,
          valor: res.valor,
          conta_id: res.conta_id
        }
      }).its('status').should('be.equal', 200)
    })

    cy.request({
      url: '/saldo',
      method: 'GET',
      // headers: { Authorization: `JWT ${token}` },
    }).then(res => {
      let saldoConta = null
      res.body.forEach(c => {
        if (c.conta === 'Conta para saldo') saldoConta = c.saldo
      })
      expect(saldoConta).to.be.equal('4034.00')
    })
  });

  it('Should remove a transaction', () => {
    cy.getTransacao('Movimentacao 1, calculo saldo').then(res => {
      cy.request({
        url: `/transacoes/${res.id}`,
        method: 'DELETE',
        // headers: { Authorization: `JWT ${token}` },
      }).its('status').should('be.equal', 204)
    })
  });
})