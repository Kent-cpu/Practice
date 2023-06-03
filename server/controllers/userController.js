const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const {User, Institution} = require("../models/models");

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
    );
}
class UserController {
    async registration(req, res, next) {
        try {
            const {email, password, name, lastName, patronymic, role, institutionName} = req.body;
            const institution = await Institution.findOne({
                where: {
                    name: institutionName,
                }
            });

            const hashPassword = await bcrypt.hash(password, 5);
            const user = await User.create({
                email, password: hashPassword, name, last_name: lastName, patronymic, role, institutionId: institution.id
            });
            const token = generateJwt();
            return res.json({token});
        }catch (e) {
            next(e);
        }
    }

    async login(req, res) {

    }

    async check(req, res) {

    }
}

module.exports = new UserController();