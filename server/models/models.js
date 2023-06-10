const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("users", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    name: {type: DataTypes.STRING, allowNull: false},
    lastName: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING, allowNull: false},
});

const Check = sequelize.define("checks", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    company: {type: DataTypes.STRING, allowNull: false},
    status: {type: DataTypes.STRING, allowNull: false},
    dateTest: {type: DataTypes.DATE, allowNull: false},
});

const Checklist = sequelize.define("checklists", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
});

const Criterion = sequelize.define("criteria", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
});

const CheckChecklist = sequelize.define("checkChecklists", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
});

const Answer = sequelize.define("answers", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING,  allowNull: false},
    note: {type: DataTypes.STRING, allowNull: true},
});

const Report = sequelize.define("reports", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    dateCompletion: {type: DataTypes.DATE, allowNull: false},
});


User.hasMany(Report);
Report.belongsTo(User);

Report.hasMany(Answer);
Answer.belongsTo(Report);

Checklist.hasMany(Criterion);
Criterion.belongsTo(Checklist);

Checklist.hasMany(CheckChecklist);
CheckChecklist.belongsTo(Checklist);

Criterion.hasMany(Answer);
Answer.belongsTo(Criterion);

User.hasMany(Check);
Check.belongsTo(User);

Check.hasMany(CheckChecklist);
CheckChecklist.belongsTo(Check);

Check.hasOne(Report);
Report.belongsTo(Check);



module.exports = {
    User,
    Criterion,
    Checklist,
    Answer,
    Report,
    Check,
    CheckChecklist,
};