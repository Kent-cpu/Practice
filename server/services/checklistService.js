const {Checklist} = require("../models/models");


class ChecklistService {
    async getChecklists() {
        const checklists = await Checklist.findAll({
            order: [['id', 'ASC']]
        });

        const formattedChecklists = checklists.map(checklist => (
            checklist.title
        ));

        return formattedChecklists;
    }
}

module.exports = new ChecklistService();