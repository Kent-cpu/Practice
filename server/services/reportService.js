const {Report, Answer, Criterion, Check, Checklist} = require("../models/models");
const ExcelJS = require('exceljs');
const sequelize = require("../db");
const {QueryTypes} = require("sequelize");

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
        const statisticsChecklists = await sequelize.query(`
                 SELECT checklists.id, checklists.title, 
                        COUNT(CASE WHEN answers.status = 'Нет' THEN 1 END) AS "incorrectAnswers",
                        COUNT(DISTINCT criteria.id) AS "numCriteriaChecklist",
                        COUNT(DISTINCT reports.id) AS "numChecks"
                 FROM checklists 
                 JOIN criteria ON checklists.id = criteria."checklistId" 
                 JOIN answers ON criteria.id = answers."criterionId"
                 JOIN reports ON answers."reportId" = reports.id
                 GROUP BY checklists.id;
               `, {type: QueryTypes.SELECT});

        const statisticsWithDiscrepancyRate = statisticsChecklists.map(checklistStatistics => {
            const discrepancyRate = Math.round(checklistStatistics["incorrectAnswers"]
                    / (checklistStatistics["numCriteriaChecklist"] * checklistStatistics["numChecks"]) * 100);
            return { ...checklistStatistics, discrepancyRate };
        });

        const sumDiscrepancyRate = statisticsWithDiscrepancyRate.reduce((sum, checklistStatistics) =>
            sum + checklistStatistics.discrepancyRate
        , 0);

        const results = statisticsWithDiscrepancyRate
            .map(checklistStatistics => {
                return {
                    id: checklistStatistics.id,
                    title: checklistStatistics.title,
                    discrepancyRate: checklistStatistics.discrepancyRate,
                    numDiscrepanciesChecks: Math.round(checklistStatistics.discrepancyRate / sumDiscrepancyRate * 100),
                };
            }).sort((a, b) => b.numDiscrepanciesChecks - a.numDiscrepanciesChecks);

        return results;
    }
}

module.exports = new ReportService();