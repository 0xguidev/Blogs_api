const bodyParser = require('body-parser');
const express = require('express');

const userControler = require('./controler/userControler');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', userControler);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

module.exports = app;