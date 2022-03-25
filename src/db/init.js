// criamos um script no para o  init.js  no package.json, para rodá-lo, basta, no terminal o seguinde cmd   npm run init-db
// o init.js não fará parte do projeto, usaremos ele apenas para rodar as tabelas do banco de dados para depois serem rodadas dentro dele
const Database = require("./config");

const initDb = {
   async init() {
      // é necessário o  async await  pq o Database() (nosso arquivo de configuração ) é mais lento do que o  db.exec(), e precisamos dos dados do  Database()  antes de executarmos o  db.exec()
      const db = await Database()

      // aqui dentro de  db.exec(``)  digitaremos códigos sql
      await db.exec(
         // comando sql é maiúsculo, já comando não sql é minúsculo, essa é a regra
         // criando a tabela para rooms, com dois campos, id e password (pass)
         // PRIMARY KEY quer dizer que não teremos id's iguais, cada um será um número diferente do outro. INTEGER is saying it will be integer (integer number ).
         `CREATE TABLE rooms (
         id INTEGER PRIMARY KEY, 
         pass TEXT)`
      )

      await db.exec(
         // tabela para as questões
         // AUTOINCREMENT gerará um número automatico para cada question
         // check INT  é: se for 1 estará checkado, se for 0 não estará checkado
         `CREATE TABLE questions (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         title TEXT,
         read INT,
         room INT)`
      )

      await db.close()
   },
};

initDb.init()
