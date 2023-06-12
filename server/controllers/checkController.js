const CheckService = require("../services/checkService");

class CheckController {
    async saveCheck(req, res, next) {
        try {
            const {userId, company, status, dateTest, checklists} = req.body;
            await CheckService.saveCheck(userId, company, status, dateTest, checklists);
            return res.sendStatus(200);
        }catch (e) {
            next(e);
        }
    }

    async getChecks(req, res, next){
        try {
            const userId = req.query.userId;
            const checks = await CheckService.getChecks(userId);
            return res.json({checks});
        } catch (e) {
            next(e);
        }
    }

    async getCheck(req, res, next) {
        try {
            const checklists = await CheckService.getCheck(req.params.id);
            return res.json(checklists);
        }catch (e) {
            console.log(e);
            next(e);
        }

    }
}

module.exports = new CheckController();