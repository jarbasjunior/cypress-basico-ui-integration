/// <reference types="Cypress" />

describe('Work with time', () => {
  beforeEach(() => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
  })

  it('Going back to the past', () => {
    // cy.get('#buttonNow').click()
    // cy.get('#resultado > span').should('contain', '28/02/2021')
    
    // cy.clock()
    // cy.get('#buttonNow').click()
    // cy.get('#resultado > span').should('contain', '31/12/1969')
    
    const date = new Date(2015, 3, 6, 15, 23, 50)
    cy.clock(date.getTime())
    cy.get('#buttonNow').click()
    cy.get('#resultado > span').should('contain', '06/04/2015') 
  });
  
  it('Goes to the future', () => {
    // cy.get('#buttonTimePassed').click()
    // cy.get('#resultado > span').invoke('text').should('gt', '2028344630000') // gt = greater than (>)
    
    cy.clock()
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').should('lte', 0) // lte = less than or eql (<=)
    // cy.wait(1000)
    // cy.get('#buttonTimePassed').click()
    // cy.get('#resultado > span').invoke('text').should('lte', 1000)
    
    cy.tick(5000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').should('gte', 5000) // gte = greater than or eql (>=)
    
    cy.tick(10000)
    cy.get('#buttonTimePassed').click()
    cy.get('#resultado > span').invoke('text').should('gte', 15000) // gte = greater than or eql (>=)
  })
})