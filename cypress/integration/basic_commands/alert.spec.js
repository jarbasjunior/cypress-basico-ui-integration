/// <reference types="Cypress" />

describe('Work with alerts', () => {
  beforeEach(() => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
  })
  
  it('Alert', () => {
    // cy.get('#alert').click()
    // cy.on('window:alert', msg => {
    //   expect(msg, 'It must be [' + msg + ']').to.be.equal('Alert Simples')
    // })

    // comando criado abaixo

    cy.clickAlert('#alert', 'Alert Simples')
  })
  
  it('Alert com mock', () => {
    const stub = cy.stub().as('alerta')
    cy.on('window:alert', stub)
    cy.get('#alert').click().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Alert Simples');
    })
  });

  it('Confirm', () => {
    cy.on('window:confirm', msg => {
      expect(msg, 'It must be [' + msg + ']').to.be.equal('Confirm Simples')
    })
    cy.get('#confirm').click()
  });
  
  it('Deny', () => {
    cy.on('window:confirm', msg => {
      expect(msg, 'It must be [' + msg + ']').to.be.equal('Confirm Simples')
      return false 
    })
    cy.get('#confirm').click()
  });

  it('Prompt', () => {
    cy.window().then(win => {
      cy.stub(win, 'prompt').returns('42')
    })
  
    cy.on('window:confirm', msg => {
      expect(msg, 'It must be [' + msg + ']').to.be.equal('Era 42?')
    })
  
    cy.on('window:alert', msg => {
      expect(msg, 'It must be [' + msg + ']').to.be.equal(':D')
    })
    cy.get('#prompt').click()
  });

  it('Desafio', () => {
    const stub = cy.stub().as('alerta')
    cy.on('window:alert', stub)
    
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))
    cy.get('#formNome').type('Nome preenchido')
    
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))
    cy.get('[data-cy=dataSobrenome]').type('Sobrenome preenchido')
    
    cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
    
    cy.get('#formSexoMasc').click().should('be.checked')
    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('have.text', 'Cadastrado!')

  });
})