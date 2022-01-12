const bodyParser = require('body-parser');
const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
// não remova esse endpoint, e para o avaliador funcionar

const userControler = require('./controler/userControler');
const loginControler = require('./controler/loginControler');
const categoriesControler = require('./controler/categoriesControler');

app.use('/user', userControler);
app.use('/login', loginControler);
app.use('/categories', categoriesControler);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

module.exports = app;