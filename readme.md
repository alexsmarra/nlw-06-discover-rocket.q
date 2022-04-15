Usamos o comando  npm init -y  para dar início ao node (na aula 4).
Depois instalamos o ejs e o express, com os comandos  npm install ejs  e  npm install express  respectivamente. 

O  server.js  dentro de  src , será o responsável por iniciar o nosso servidor. O node é como um servidor, e para que o nosso projeto seja renderizado, precisamos iniciar o node para mostrar o nosso projeto no navegador. 

Para rodar o projeto pelo terminal com um comando mais simples, basta no  package.json, na parte de  scripts  apagar esta linha ("test": "echo \"Error: no test specified\" && exit 1") e colocar no lugar (em nosso caso, após a palavra  node  especificar a pasta onde está o nosso servidor)  ("start": node src/server.js) e pelo terminal basta o cmd  npm start  . Caso queiramos alterar o nome do script  start  por outro nome, como por exemplo  alex , no terminal teremos que dar o cmd  npm run alex 

Dentro da pasta  views  é aonde colocamos nossos arquivos html. O node não roda html, por isso precisaremos do  ejs, por isso deixaremos o final dos arquivos html com o  .ejs  ao invés do  .html  .

Criamos uma rota para dar caminhos à URL, no arquivo  route.js  .

A pasta  public  é para tudo que pode ser acessado do projeto todo.

"main": "src/server.js",
Instalamos o  nodemon  que é o nosso live reload, para a renderização ser simultânea com o código na medida que for sendo alterado e salvo, usamos o cmd  npm install nodemon -D   para instalar como uma ferramenta apenas para desenvolvimento, e depois no package.json na parte de  "start": "node src/server.js"  colocamos  "start": "nodemon ."  , o  .  já faz referência ao main, que é o nosso  src/server.js que colocamos no "main"  (no "main": "index.js"  colocamos  "main": "src/server.js").

Para banco de dados instalamos o sqlite e o sqlite3, com os cmd  npm install sqlite  e  npm install sqlite3. No package.json criamos um script  "init-db": "node src/db/init.js"  para o nosso banco de dados, e no terminal usamos o cmd  npm run init-db

