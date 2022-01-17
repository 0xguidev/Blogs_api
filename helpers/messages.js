const messages = {
  displayName: '"displayName" length must be at least 8 characters long',
  nameRequire: '"name" is required',

  emailNotValid: '"email" must be a valid email',
  emailRequired: '"email" is required',
  emailEmpty: '"email" is not allowed to be empty',

  passwordLength: '"password" length must be 6 characters long',
  passwordRequired: '"password" is required',
  passwordEmpty: '"password" is not allowed to be empty',

  userExist: 'User already registered',
  userNotExist: 'User does not exist',
  userNotAuth: 'Unauthorized user',

  invalidField: 'Invalid fields',

  tokenNotFound: 'Token not found',
  TokenExpiredOrInvalid: 'Expired or invalid token',

  titleRequired: '"title" is required',

  contentRequired: '"content" is required',

  categoryIdRequired: '"categoryIds" is required',
  categoryIdsNotFound: '"categoryIds" not found',
  categoryNotEdit: 'Categories cannot be edited',

  postNotExist: 'Post does not exist',
};

module.exports = messages;