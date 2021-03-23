const buildEnv = () => {
  cy.server()
  cy.route({
    method: 'POST',
    url: '/signin',
    response: {
      id: 20000,
      nome: 'fake_user',
      token: 'Invalid token'
    }
  }).as('signin')

  cy.route({
    method: 'GET',
    url: '/saldo',
    response: [{
      conta_id: 20000,
      conta: 'Conta carteira',
      saldo: '50.00'
    },
    {
      conta_id: 23000,
      conta: 'Conta banco',
      saldo: '50000.00'
    }]
  }).as('saldo')

  cy.route({
    method: 'GET',
    url: '/contas',
    response: [
      { id: 1, nome: 'Carteira', visivel: true, usuario_id: 1 },
      { id: 2, nome: 'Banco', visivel: true, usuario_id: 1 }
    ]
  }).as('contas')

  cy.route({
    method: 'GET',
    url: '/extrato/**',
    response: [
      { "conta": "Conta para movimentacoes", "id": 438026, "descricao": "Movimentacao para exclusao", "envolvido": "AAA", "observacao": null, "tipo": "DESP", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 475385, "usuario_id": 13591, "transferencia_id": null, "parcelamento_id": null }, 
      { "conta": "Conta com movimentacao", "id": 438027, "descricao": "Movimentacao de conta", "envolvido": "BBB", "observacao": null, "tipo": "DESP", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "-1500.00", "status": true, "conta_id": 475386, "usuario_id": 13591, "transferencia_id": null, "parcelamento_id": null }, 
      { "conta": "Conta para saldo", "id": 438028, "descricao": "Movimentacao 1, calculo saldo", "envolvido": "CCC", "observacao": null, "tipo": "REC", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "3500.00", "status": false, "conta_id": 475387, "usuario_id": 13591, "transferencia_id": null, "parcelamento_id": null }, 
      { "conta": "Conta para saldo", "id": 438029, "descricao": "Movimentacao 2, calculo saldo", "envolvido": "DDD", "observacao": null, "tipo": "DESP", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "-1000.00", "status": true, "conta_id": 475387, "usuario_id": 13591, "transferencia_id": null, "parcelamento_id": null }, 
      { "conta": "Conta para saldo", "id": 438030, "descricao": "Movimentacao 3, calculo saldo", "envolvido": "EEE", "observacao": null, "tipo": "REC", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "1534.00", "status": true, "conta_id": 475387, "usuario_id": 13591, "transferencia_id": null, "parcelamento_id": null }, 
      { "conta": "Conta para extrato", "id": 438031, "descricao": "Movimentacao para extrato", "envolvido": "FFF", "observacao": null, "tipo": "DESP", "data_transacao": "2021-03-15T03:00:00.000Z", "data_pagamento": "2021-03-15T03:00:00.000Z", "valor": "-220.00", "status": true, "conta_id": 475388, "usuario_id": 13591, "transferencia_id": null, "parcelamento_id": null }
    ]
  }).as('extrato')
}

export default buildEnv