/// <reference types="Cypress" />

describe('Fixtures tests', () => {
  beforeEach(() => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
  })

  it('Get data form fixture file', function() {
    cy.fixture('userData').as('usuario').then(() => {
      cy.get('#formNome').type(this.usuario.nome)
      cy.get('#formSobrenome').type(this.usuario.sobrenome)
      cy.xpath("//table[@id='formSexo']//td/label[contains(.,'" + this.usuario.sexo + "')]").click()
      cy.xpath("//table[@id='formComidaFavorita']//td/label[contains(.,'" + this.usuario.comida + "')]").click()
      cy.get('#formEsportes').select(this.usuario.esporte)
      
    })
    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
  })
})