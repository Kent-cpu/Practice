const {Report, Answer, Criterion, Check, Checklist} = require("../models/models");
const ExcelJS = require('exceljs');
const {Sequelize} = require("sequelize");


class ReportService {
    async saveReport(userId, checkId, answers) {
        const report = await Report.create({
            dateCompletion: Date.now(),
            userId,
            checkId,
        });

        for(let i = 0; i < answers.length; ++i) {
            await Answer.create({
                criterionId: answers[i].id,
                reportId: report.id,
                status: answers[i].status,
                note: answers[i].note,
            });
        }

        const groupedAnswersByChecklists = answers.reduce((result, obj) => {
            const checklistId = obj.checklistId;
            if (!result[checklistId]) {
                result[checklistId] = [];
            }
            result[checklistId].push(obj);
            return result;
        }, {});


        const workbook = new ExcelJS.Workbook();
        for (const key in groupedAnswersByChecklists) {
            const worksheet = workbook.addWorksheet(`Проверочный лист №${key}`);
            worksheet.columns = [
                {
                    header: 'Перечень вопросов, отражающих содержание обязательных требований',
                    key: 'titleColumn',
                    width: 150
                },
                {
                    header: 'Ответы на вопросы, содержащиеся в перечне вопросов',
                    key: 'answerColumn',
                    width: 20
                },
                { header: 'Примечание', key: 'noteColumn', width: 50 },
            ];

            worksheet.getColumn("titleColumn").style.alignment = { vertical: "top", wrapText: true };

            if (groupedAnswersByChecklists.hasOwnProperty(key)) {
                const checklist = groupedAnswersByChecklists[key];
                for(const ans in checklist) {
                    const answer = checklist[ans];
                    const criterion = await Criterion.findByPk(answer.id);
                    const row =
                        worksheet.addRow({
                            titleColumn: criterion.title,
                            answerColumn: answer.status,
                            noteColumn: answer.note
                        });
                    row.height = 70;
                }
            }
        }

        const filePath = 'Отчет.xlsx';
        await workbook.xlsx.writeFile(filePath);

        const check = await Check.findByPk(checkId);
        check.status = "Выполнено";
        await check.save();
        return filePath;
    }

    async findWorstChecklists() {
        const worstChecklists = await Checklist.findAll({
            attributes: ['title', 'id', [Sequelize.fn('COUNT', Sequelize.literal('*')), 'incorrect_answers_count']],
            include: [
                {
                    model: Criterion,
                    attributes: [],
                    include: [
                        {
                            model: Answer,
                            attributes: []
                        }
                    ]
                }
            ],
            where: { '$criteria.answers.status$': 'Нет' },
            group: ['checklists.id'],
            order: [[Sequelize.literal('incorrect_answers_count'), 'DESC']],
            raw: true,
            nest: true
        });

        return worstChecklists;
    }
}

module.exports = new ReportService();