# Getting Started with Create React App

Esse projeto foi inicializado com CRA utilizando template com Typescript.
Cores e layout foram baseadas na famosa empresa Mercado Livre. O proposito da aplicação é simular um fluxo de compra com carrinho.
Na construção da estrutura do código utilizei Hooks, métodos de array, tipagem entre outros conceitos do JavaScript, Typescript e React.
Para a criação dos components escolhi utilizar a lib material ui, para facilitar na hora do desenvolvimento do layout ao mesmo tempo praticar algumas manipulações utilizando CSS.
Durante o desenvolvimento do projeto, aprendi muito sobre vários conceitos de Typescript e sobre testes unitários com Cypress, o que foi muito motivador para mim e que ainda tenho muito a aprender.

## Primary Libs

"react": "^17.0.2",
"react-scripts": "4.0.3",
"react-dom": "^17.0.2",
"react-router-dom": "^5.3.0",
"typescript": "latest"
"axios": "^0.23.0",
"@emotion/react": "latest",
"@mui/material": "next",
"cypress": "^8.6.0"

## Instruções para iniciar o projeto localmente

1° - Clone do repositório
2° - Navegue até o local utilizando seu terminal de preferência
3° - Faça a instalação das dependências rodando o comando 'yarn' ou 'npm install'
4° - Crie uma cópia do arquivo example.env e renomeie essa para cópia para .env
5° - Dentro do arquivo .env cole a url da api
5° - Rode o projeto com o comando 'yarn start' ou 'npm run start'

## Para rodar os teste com cypress

Após ter instalado as dependências conforme os passos acima, execute o comando
yarn test ou npm run test
Rode a listagem de testes ou escolha individualmente cada um

## Vercel

O projeto foi colocado em produção utilizando o Vercel:
https://mercado-chique.vercel.app
