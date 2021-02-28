/// <reference types="Cypress" />

describe('Work with locators', () => {
  beforeEach(() => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
  })

  it('Using jquery selector', () => {
    cy.get('input[value="Clique aqui"]:first').click()
    
    cy.get('table#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input').type('preenchendo doutorado')
    
    // or
    
    cy.get('table#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) > input').clear()
    cy.get('table#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) > input').type('preenchendo doutorado')
  })
  
  it('Using xpath', () => {
    cy.xpath('//input[contains(@onclick, "Francisco")]').click()
    // or
    cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(.,"Francisco")]/following-sibling::td/input[@value="Clique aqui"]').click()
  });
})