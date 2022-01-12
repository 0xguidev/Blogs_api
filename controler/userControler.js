require('dotenv').config();
const express = require('express');
const { User } = require('../models');
const Auth = require('../middlewares/validateJWT');
const {
  displayNameValidate,
  emailValidate,
  passwordValidate,
  createUser,
  getUsers,
  getUserById,
  createToken } = require('../middlewares/validateUserData');

const router = express.Router();

router.post('/',
  displayNameValidate,
  emailValidate,
  passwordValidate,
  createUser,
  createToken);

router.get('/',
  Auth,
  getUsers);

router.get('/:id',
  Auth,
  getUserById);

router.put('/:id', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const { id } = req.params;

    const [updateUser] = await User.update(
      { fullName, email },
      { where: { id } },
    );

    console.log(updateUser); // confira o que é retornado quando o user com o id é ou não encontrado;

    if (!updateUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.destroy(
      { where: { id } },
    );

    console.log(deleteUser); // confira o que é retornado quando o user com o id é ou não encontrado;

    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: e.message });
  }
});

module.exports = router;
