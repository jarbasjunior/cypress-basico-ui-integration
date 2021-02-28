describe('Work with basic elements', () => {
  beforeEach(() => {
    cy.visit('http://wcaquino.me/cypress/componentes.html')
  })

  it('Text', () => {
    cy.get('.facilAchar')
      .should('have.text', 'Cuidado onde clica, muitas armadilhas...')
  });

  it('Links', () => {
    cy.contains('Voltar').click()
    cy.get('#resultado')
      .should('have.text', 'Voltou!')  
  });

  it('TextFields', () => {
    cy.get('#formNome').type('Cypress test')
      .should('have.value', 'Cypress test')

    cy.get('#elementosForm\\:sugestoes')
      .type('TEXTAREA')
      .should('have.value', 'TEXTAREA')

    cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
      .type('????')
      .should('have.value', '????')

    cy.get('[data-cy=dataSobrenome]')
      .type('1234567{backspace}{backspace}')
      .should('have.value', '12345')
    
    cy.get('#elementosForm\\:sugestoes')
    .type('Erro{selectAll}acerto', { delay: 200 })
    .should('have.value', 'acerto')
  });

  it('Radios', () => {
    cy.get('#formSexoFem').click()
      .should('be.checked')
    cy.get('#formSexoMasc').should('not.be.checked')
    cy.get('[name=formSexo]').should('have.length', 2)
  });

  it('Checkbox', () => {
    cy.get('#formComidaPizza')
      .click()
      .should('be.checked')

    cy.get('[name=formComidaFavorita]').click({ multiple: true })
    cy.get('#formComidaPizza').should('not.be.checked')
    cy.get('#formComidaCarne').should('be.checked')
  });

  it('Combo', () => {
    cy.get('[data-test=dataEscolaridade]')
      .select('Superior')
      .should('have.value', 'superior')
    
    cy.get('[data-test=dataEscolaridade]')
      .select('especializacao')
      .should('have.value', 'especializacao')
    
    cy.get('[data-test=dataEscolaridade] option')
      .should('have.length', 8)
  
    cy.get('[data-test=dataEscolaridade] option').then($arr => {
      const values = []
      $arr.each(function() {
        values.push(this.innerHTML)
      })
      expect(values).to.include.members(['Especializacao', 'Mestrado'])
    })
  });

  it('Combo multiplo', () => {
    cy.get('[data-testid=dataEsportes]')
      .select(['natacao', 'futebol'])

    cy.get('[data-testid=dataEsportes]').then($el => {
      expect($el.val()).to.be.deep.equal(['natacao', 'futebol'])
      expect($el.val()).to.have.length(2)
    })

    .get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao', 'futebol'])
  });

});