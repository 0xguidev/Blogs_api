const codes = {
  ok: 200,
  created: 201,
  badRequest: 400,
};

const messages = {
  displayName: '"displayName" length must be at least 8 characters long',
  emailNotValid: '"email" must be a valid email',
  emailRequired: '"email" is required',
  passwordLength: '"password" length must be 6 characters long',
  passwordRequired: '"password" is required',
  userExist: 'User already registered',
};

const nameMinLen = 8;
const passMinLen = 6;

const displayNameValidate = (name) => {
  const error = { err: { code: codes.badRequest, message: messages.displayName } };

  if (!name) return error;
  if (name.length < nameMinLen) return error;
  return null;
};

const emailValidate = (email) => {
  const invalidEmail = { err: { code: codes.badRequest, message: messages.emailNotValid } };
  const requiredEmail = { err: { code: codes.badRequest, message: messages.emailRequired } };
  const isEmailValid = (value) => new RegExp(/[\w]+@[\w]+\.[\w]{3,}/g).test(value);
  if (!email) return requiredEmail;
  if (!isEmailValid(email)) return invalidEmail;

  return null;
};

const passwordValidate = (pass) => {
  const passLengthError = { err: { code: codes.badRequest, message: messages.passwordLength } };
  const passRequired = { err: { code: codes.badRequest, message: messages.passwordRequired } };

  if (!pass) return passRequired;
  if (pass.length < passMinLen) return passLengthError;
  return null;
};

const serviceCreate = (data) => {
  const { displayName, email, password } = data;

  const { err } = displayNameValidate(displayName)
    || emailValidate(email)
    || passwordValidate(password);

  if (err) return { err };
  return { code: codes.ok };
};

module.exports = {
  serviceCreate,
};