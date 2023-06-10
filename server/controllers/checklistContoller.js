const ChecklistService = require("../services/checklistService");


class ChecklistContoller {
    async getChecklists(req, res, next) {
        try {
            const checklists = await ChecklistService.getChecklists();
            return res.json(checklists);
        }catch (e) {
            next(e);
        }
    }
}
module.exports = new ChecklistContoller();