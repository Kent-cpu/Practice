const { Check, CheckChecklist, Checklist, Criterion} = require("../models/models");

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

    async getChecks (userId) {
        const checks= await Check.findAll({
            where: {
                ["userId"]: userId,
                "status": "Невыполненно",
            }
        });

        return checks;
    }

    async getCheck (checkId) {
        const checkChecklist = await CheckChecklist.findAll({where: {checkId}});

        const checklists = [];
        for(let i = 0; i < checkChecklist.length; ++i) {
            const checklist = await Checklist.findOne({
                where: {
                    ["id"]: checkChecklist[i].checklistId,
                }
            });
            const criteria = await Criterion.findAll({
                where: {
                    ["checklistId"]: checklist.id
                }
            });

            checklists.push({id: checklist.id, title: checklist.title, criteria: criteria});
        }

        return checklists;
    }
}

module.exports = new CheckService();