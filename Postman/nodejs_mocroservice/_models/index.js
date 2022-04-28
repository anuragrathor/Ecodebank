const db = require("../_db");
const {initModels} = require("./init-models");

const models = initModels(db.sequelize);

module.exports = models;
