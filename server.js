require('dotenv').config({silent: true})
const app = require('./src/config/custom-express')();

let port = process.env.PORT || 3001;

app.listen(port, function(){
  console.log('[API - desafio cubo] Servidor rodando na porta %d.', port);
});