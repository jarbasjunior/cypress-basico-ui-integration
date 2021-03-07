describe('Cypress basics', () => {
  it('Should visit a page and assert title', () => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
  
    cy.title().should('be.equal', 'Campo de Treinamento')
    cy.title().should('contain', 'Campo')
    
    // or
    
    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .should('contains', 'Campo')
    
    // or
    
    cy.title()
      .should('be.equal', 'Campo de Treinamento')
      .and('contains', 'Campo de Treinamento')

    let syncTitle

    cy.title().then(title => {
      console.log(title);

      cy.get('#formNome').type(title)
      syncTitle = title
    })

    cy.get('[data-cy=dataSobrenome]').then($el => {
      cy.wrap($el).type(syncTitle)
    })

  });
  
  it('Should find and interact with an element', () => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
    cy.get('#buttonSimple')
      .click()
      .should('have.value', 'Obrigado!')
  });
});