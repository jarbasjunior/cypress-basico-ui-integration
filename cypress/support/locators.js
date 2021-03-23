const locators = {

  FN_XP_MESSAGE: message => `//div[text()='${message}']`,
  FN_XP_CLOSE_MESSAGE: message => `//div[text()='${message}']/../button`,

  LOGIN: {
    USER: '[data-test=email]',
    PASSWORD: '[data-test=passwd]',
    BTN: '.btn',
  },

  MENU: {
    HOME: '[data-test=menu-home]',
    MOVIMENTACAO: '[data-test=menu-movimentacao]',
    EXTRATO: '[data-test=menu-extrato]',
    SETTINGS:'[data-test=menu-settings]'
  },

  SETTINGS: {
    CONTAS:'[href="/contas"]',
    RESET:'[href="/reset"]',
  },

  MOVIMENTACAO: {
    DESCRICAO: '[data-test=descricao]',
    VALOR: '[data-test=valor]',
    INTERESSADO: '[data-test=envolvido]',
    CHANGE_STATUS: '[data-test=status]',
    BTN_SALVAR: '.btn-primary',
  },

  CONTA: {
    FIELD_NAME: '[data-test=nome]',
    BTN_SALVAR: '.btn',
    MESSAGE: '.toast-message',
  },

  EXTRATO: {
    REGISTROS: '.list-group > li',
    FN_XP_REGISTRO: (conta, valor) => `//span[text()='${conta}']/following-sibling::small[contains(.,'${valor}')]`,
    FN_XP_EXCLUIR_REGISTRO: conta => `//span[text()='${conta}']/../../..//i[@class='far fa-trash-alt']`,
    FN_XP_ALTERAR_REGISTRO: conta => `//span[text()='${conta}']/../../..//a`,
    FN_XP_LINHA: descricao => `//span[text()='${descricao}']/../../../..`,
    FN_XP_NOME_REGISTRO: conta => `//span[text()='${conta}']`
  },

  SALDO: {
    FN_XP_SALDO_CONTA: (nome, valor) => `//td[text()='${nome}']/following-sibling::td[contains(.,'${valor}')]`
  }
}

export default locators
