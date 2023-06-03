const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const User = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    name: {type: DataTypes.STRING, allowNull: false},
    last_name: {type: DataTypes.STRING, allowNull: false},
    patronymic: {type: DataTypes.STRING, allowNull: false},
});

const Institution = sequelize.define("institution", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

const Criterion = sequelize.define("criterion", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    text: {type: DataTypes.STRING, allowNull: false},
});

const Checklist = sequelize.define("checklist", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
});

const Answer = sequelize.define("answer", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    status: {type: DataTypes.STRING,  allowNull: false},
    note: {type: DataTypes.STRING, allowNull: true},
});

const Report = sequelize.define("report", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    test_date: {type: DataTypes.DATE, allowNull: false},
    check_type: {type: DataTypes.STRING, defaultValue: "Плановая"},
});

const Company = sequelize.define("company", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
});

Institution.hasMany(User);
User.belongsTo(Institution);

Institution.hasMany(Checklist);
Checklist.belongsTo(Institution);

Institution.hasMany(Report);
Report.belongsTo(Institution);

User.hasMany(Report);
Report.belongsTo(User);

Company.hasMany(Report);
Report.belongsTo(Company);

Report.hasMany(Answer);
Answer.belongsTo(Report);

Checklist.hasMany(Criterion);
Criterion.belongsTo(Checklist);

Criterion.hasOne(Answer);
Answer.belongsTo(Criterion);

module.exports = {
    User,
    Institution,
    Criterion,
    Checklist,
    Answer,
    Report,
    Company,
};