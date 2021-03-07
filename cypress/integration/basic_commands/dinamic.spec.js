/// <reference types="Cypress" />

describe('Dinamics tests', () => {
  beforeEach(() => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
  })
  
  const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

  foods.forEach(food => {
    it(`Cadastro com a comida ${food}`, () => {
      cy.get('#formNome').type('this.usuario.nome')
      cy.get('#formSobrenome').type('this.usuario.sobrenome')
      cy.xpath("//table[@id='formSexo']//td/label[contains(.,'Feminino')]").click()
      cy.xpath("//table[@id='formComidaFavorita']//td/label[contains(.,'" + food + "')]").click()
      cy.get('#formEsportes').select('Futebol')
      cy.get('#formCadastrar').click()
      cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })
  })
  
  it('Deve selecionar todos usando o each ', () => {
    cy.get('#formNome').type('this.usuario.nome')
    cy.get('#formSobrenome').type('this.usuario.sobrenome')
    cy.xpath("//table[@id='formSexo']//td/label[contains(.,'Feminino')]").click()
    
    cy.get('[name=formComidaFavorita]').each($el => {
      if ($el.val() != 'vegetariano') {
        cy.wrap($el).click()
      }
    })
    cy.get('#formEsportes').select('Futebol')
    cy.get('#formCadastrar').click()
    cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    
    // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')

  })
})