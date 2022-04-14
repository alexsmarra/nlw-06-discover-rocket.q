// esse arquivo não fará parte do projeto, apenas rodamos ele antes para criar as tabelas do nosso bd
const Database = require('./config')

const initDb = {
   async init() {
      const db = await Database()

   // apenas comandos sql são em letras maiúsculas
   // estamos usando a palavra  pass  para password
   // INTEGER é para número
   // PRIMARY KEY é para não termos id's iguais, cada um terá seu número
      await db.exec(`CREATE TABLE rooms (
         id INTEGER PRIMARY KEY,
         pass TEXT
      )`);

      // AUTOINCREMENT é para ir dando número automaticamente para cada item
      // INT é para número tb (creio que seja para número inteiro), no caso, se  check for 1 estará checkado, se for 0 não estará checkado
      await db.exec(`CREATE TABLE questions (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         titulo TEXT,
         check INT
      )`);

      // fechando o banco de dados (bd)
      await db.close()
   }
}

initDb.init()  


