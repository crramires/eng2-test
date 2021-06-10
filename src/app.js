const routes = require('./jogos')




routes.listen(3000, () => {
  console.log(`Rodando em: http://localhost:3000`);
})