const SequelizeAuto = require('sequelize-auto');
const dbConfig = require("../_config/db");
const adminConfig = require("../_config/admin-db");

const auto = new SequelizeAuto(dbConfig.db, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    directory: './_models',
});

auto.run().then(data => {
    // console.log(data.tables);      // table and field list
    // console.log(data.foreignKeys); // table foreign key list
    // console.log(data.indexes);     // table indexes
    // console.log(data.hasTriggerTables); // tables that have triggers
    // console.log(data.relations);   // relationships between models
    // console.log(data.text)         // text of generated models
});


const autoAdmin = new SequelizeAuto(adminConfig.db, adminConfig.user, adminConfig.password, {
    host: adminConfig.host,
    dialect: adminConfig.dialect,
    directory: './_admin_models',
});

autoAdmin.run().then(data => {
    // console.log(data.tables);      // table and field list
    // console.log(data.foreignKeys); // table foreign key list
    // console.log(data.indexes);     // table indexes
    // console.log(data.hasTriggerTables); // tables that have triggers
    // console.log(data.relations);   // relationships between models
    // console.log(data.text)         // text of generated models
});
