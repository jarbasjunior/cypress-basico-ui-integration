describe('Esperas...', () => {
  beforeEach(() => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
  })

  it('Deve aguardar elemento estar disponível', () => {
    cy.get('#novoCampo').should('not.exist')
    cy.get('#buttonDelay').click()
    cy.get('#novoCampo').should('not.exist')
    cy.get('#novoCampo').type('funcionou')
  });
})