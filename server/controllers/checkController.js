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
}

module.exports = new CheckController();