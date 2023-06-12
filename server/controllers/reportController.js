const ReportService = require("../services/reportService");
const fs = require('fs');

class ReportController {
    async saveReport(req, res, next) {
        try {
            const {userId, checkId, answers} = req.body;
            const filename = await ReportService.saveReport(userId, checkId, answers);

            res.download(filename, () => {
                fs.unlinkSync(filename);
            });
        }catch (e) {
            next(e);
        }
    }

    async findWorstChecklists(req, res, next) {
        try {
            const worstChecklists = await ReportService.findWorstChecklists();
            return res.json(worstChecklists);
        }catch (e) {
            next(e);
        }
    }
}

module.exports = new ReportController();