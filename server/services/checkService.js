const { Check, CheckChecklist, Checklist} = require("../models/models");

class CheckService {
    async saveCheck (userId, company, status, dateTest, checklists) {
        const check = await Check.create({
            userId, company, status, dateTest
        });

        const checklistsId = [];

        for(let i = 0; i < checklists.length; ++i) {
            const checklistId = await Checklist.findOne({
                where: {
                    ["title"]: checklists[i],
                },
            });

            if(checklistId) {
                checklistsId.push(checklistId.id);
            }
        }

        for(let i = 0; i < checklistsId.length; ++i) {
            await CheckChecklist.create({
                checkId: check.id,
                checklistId: checklistsId[i],
            })
        }
    }
}

module.exports = new CheckService();