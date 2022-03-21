# Cypress Testes de Integração e UI

  Projeto com alguns exemplos de comandos básicos do cypress, baseados no curso [Testes de aplicações modernas com Cypress](https://www.udemy.com/course/testes-cypress) do professor [Wagner Aquino](http://www.wcaquino.me).

## Prerequisitos: 

  ### [Node](https://nodejs.org/en/download) instalado

  ### [NPM](https://www.npmjs.com/get-npm) instalado

## Instalação do Cypress via npm

  - Navegue até a pasta de seu projeto
    ```
    cd /caminho/do/seu/projeto
    ```
  - Para criar o arquivo `package.json` execute o comando abaixo
    ```
    npm init -y
    ```
  - Execute o comando a seguir para adicionar as dependências do cypress
    ```
    npm install cypress --save-dev
    ```
  - Por fim, execute o comando abaixo para abrir o cypress (npm > v5.2, senão execute: `./node_modules/.bin/cypress open`)
    ```
    npx cypress open
    ```
