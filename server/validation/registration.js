const {body, validationResult} = require("express-validator");
const {User} = require("../models/models");
const ApiError = require("../error/ApiError");

const checkEmailIsRegistered = (email, errorMessage) => {
    return User.findOne({where: {email}})
        .then(user => {
            console.log(user)
            if(user) return Promise.reject(errorMessage);
        });
};

const registrationValidationRules = [
    body("name")
        .exists({checkFalsy: true})
        .withMessage("Обязательное поле")
        .bail(),
    body("lastName")
        .exists({checkFalsy: true})
        .withMessage("Обязательное поле")
        .bail(),
    body("patronymic")
        .exists({checkFalsy: true})
        .withMessage("Обязательное поле")
        .bail(),
    body('email')
        .exists({checkFalsy: true})
        .withMessage("Обязательное поле")
        .bail()
        .isEmail()
        .withMessage("Неверная электронная почта")
        .bail()
        .custom(email => checkEmailIsRegistered(email, "Этот e-mail уже зарегистрирован")),
    body('password')
        .exists({checkFalsy: true})
        .withMessage("Обязательное поле")
        .bail()
        .isLength({
            min: 6
        })
        .withMessage("Пароль должен содержать не менее 6 символов")
        .bail()
        .isLength({
            max: 20
        })
        .withMessage("Пароль может содержать не более 20 символов"),
];

const registrationHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest("Некорректные данные при регистрации", errors.array()));
        }
        next();
    } catch (e) {
        next(e);
    }
};

module.exports = {
    registrationValidationRules,
    registrationHandler
};