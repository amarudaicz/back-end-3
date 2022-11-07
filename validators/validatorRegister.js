const { check, validationResult } = require('express-validator');

const validatorRegisterUser = [
  check('name').notEmpty().withMessage('El nombre no debe estar vacio'),

  check('email').isEmail().withMessage('Completar el campo Email'),

  check('password')
    .notEmpty()
    .withMessage('Completar el campo Contraseña')
    .isLength({ max: 30, min: 8 })
    .withMessage('La contraseña tener una longitud minima de 8 caracteres'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorLoginUser = [
  check('email').isEmail().withMessage('Completar el campo Email'),

  check('password')
    .notEmpty()
    .withMessage('Completar el campo Contraseña'),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];



const validateResult = (req, res, next) => {
  try {
    
    validationResult(req).throw();

    return next();
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};



module.exports = {validatorRegisterUser,validatorLoginUser};
