const { User} = require("../models/models");
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const ApiError = require("../error/ApiError");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    );
}

class UserService {
    async registration(body) {
        const {email, password, name, lastName, patronymic} = body;

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({
            email, password: hashPassword, name, last_name: lastName, patronymic, role: "Инспектор"
        });
        const token = generateJwt(user.id, user.email, user.role);
        return token;
    }

    async login(email, password) {
        const user = await User.findOne({where: {email}});
        if (!user) {
            throw ApiError.internal('Пользователь не найден', [{path: "emailOrPassword",  msg: "Неверная почта или пароль"}]);
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            throw ApiError.internal('Указан неверный пароль', [{path: "emailOrPassword",  msg: "Неверная почта или пароль"}]);
        }
        const token = generateJwt(user.id, user.email, user.role);
        return token;
    }

    async check(email) {
        const user = await User.findOne({where: {email}});
        const token = generateJwt(user.id, user.email, user.role);
        return token;
    }
}

module.exports = new UserService();