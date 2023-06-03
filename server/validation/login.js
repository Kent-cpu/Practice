const {validationResult} = require("express-validator");
const {body} = require("express-validator");
const ApiError = require("../error/ApiError");

const loginValidationRules = [
    body('email')
        .exists({checkFalsy: true})
        .withMessage("Обязательное поле")
        .bail()
        .isEmail()
        .withMessage("Неверная электронная почта"),
    body('password')
        .exists({checkFalsy: true})
        .withMessage("Обязательное поле")
        .bail()
];

const loginHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.badRequest("Некорректные данные при авторизации", errors.array()));
        }
        next();
    }catch (e) {
        next(e);
    }
};

module.exports = {
    loginValidationRules,
    loginHandler
};