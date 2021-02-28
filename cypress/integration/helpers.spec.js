describe('Helpers...', () => {
  it('Wrap', () => {
    const obj = { nome: 'user', idade: 20}
    expect(obj).to.have.property('nome')
    cy.wrap(obj).should('have.property', 'nome')

    cy.visit('http://wcaquino.me/cypress/componentes.html')
    // cy.get('#formNome').then($el => {
      //   // $el.type('não funciona')
    //   // $el.val('funciona via jquery, mas sem o monitoramento do cypress')
    //   cy.wrap($el).type('funciona e é monitorado com auxílio do wrap')
    // })
    
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(10)
      }, 500)
    })
    cy.get('#buttonSimple').then(() => console.log('Encontrou o primeiro botão'))
    // promise.then(num => console.log(num)) // promise nao gerenciada pelo cypress
    cy.wrap(promise).then(retorno => console.log(retorno)) // promise nao gerenciada pelo cypress
    cy.get('#buttonList').then(() => console.log('Encontrou o segundo botão'))
  });
  
  it('Its...', () => {
    const obj = { nome: 'user', idade: 20}
    cy.wrap(obj).should('have.property', 'nome')
    cy.wrap(obj).its('idade').should('be.equal', 20)
    
    const obj2 = { nome: 'user', idade: 20, endereco: { rua: 'onde o vento faz a curva' }}
    cy.wrap(obj2).its('endereco.rua').should('be.contains', 'curva')
  
    cy.visit('http://wcaquino.me/cypress/componentes.html')
    cy.title().its('length').should('be.equal', 20)
  });

  it('Invoke...', () => {
    const getValue = () => 1
    const soma = (a, b) => a + b
    
    cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
    cy.wrap({ fn: soma }).invoke('fn', 4, 6).should('be.equal', 10)
  
    cy.visit('http://wcaquino.me/cypress/componentes.html')
    cy.get('#formNome').invoke('val', 'Texto via invoke')
    cy.window().invoke('alert', 'texto do alert')
    cy.get('#resultado')
      .invoke('html', '<input type"button" value="nome do botão"/>')
  });
});