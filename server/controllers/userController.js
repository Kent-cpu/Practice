const UserService = require("../services/userService");

class UserController {
    async registration(req, res, next) {
        try {
            const token = await UserService.registration(req.body);
            return res.json({token});
        }catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try{
            const {email, password} = req.body;
            const token = await UserService.login(email, password);
            return res.json({token});
        }catch (e) {
            next(e);
        }
    }

    async check(req, res, next) {
        try {
            const token = await UserService.check(req.user.id, req.user.email);
            return res.json({token});
        }catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();