var DataTypes = require("sequelize").DataTypes;
var _admin_user_contests = require("./admin_user_contests");
var _bank_accounts = require("./bank_accounts");
var _banners = require("./banners");
var _blogs = require("./blogs");
var _competitions = require("./competitions");
var _contest_categories = require("./contest_categories");
var _contest_templates = require("./contest_templates");
var _contests = require("./contests");
var _failed_jobs = require("./failed_jobs");
var _fantasy_point_categories = require("./fantasy_point_categories");
var _fantasy_points = require("./fantasy_points");
var _faqs = require("./faqs");
var _fixtures = require("./fixtures");
var _migrations = require("./migrations");
var _notifications = require("./notifications");
var _pages = require("./pages");
var _pan_cards = require("./pan_cards");
var _password_resets = require("./password_resets");
var _payments = require("./payments");
var _personal_access_tokens = require("./personal_access_tokens");
var _players = require("./players");
var _private_contests = require("./private_contests");
var _rank_categories = require("./rank_categories");
var _ranks = require("./ranks");
var _settings = require("./settings");
var _squads = require("./squads");
var _states = require("./states");
var _temp_users = require("./temp_users");
var _user_contests = require("./user_contests");
var _user_private_contests = require("./user_private_contests");
var _user_teams = require("./user_teams");
var _users = require("./users");

function initModels(sequelize) {
    var admin_user_contests = _admin_user_contests(sequelize, DataTypes);
    var bank_accounts = _bank_accounts(sequelize, DataTypes);
  var banners = _banners(sequelize, DataTypes);
  var blogs = _blogs(sequelize, DataTypes);
  var competitions = _competitions(sequelize, DataTypes);
  var contest_categories = _contest_categories(sequelize, DataTypes);
  var contest_templates = _contest_templates(sequelize, DataTypes);
  var contests = _contests(sequelize, DataTypes);
  var failed_jobs = _failed_jobs(sequelize, DataTypes);
  var fantasy_point_categories = _fantasy_point_categories(sequelize, DataTypes);
  var fantasy_points = _fantasy_points(sequelize, DataTypes);
  var faqs = _faqs(sequelize, DataTypes);
  var fixtures = _fixtures(sequelize, DataTypes);
  var migrations = _migrations(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var pages = _pages(sequelize, DataTypes);
  var pan_cards = _pan_cards(sequelize, DataTypes);
    var password_resets = _password_resets(sequelize, DataTypes);
    var payments = _payments(sequelize, DataTypes);
    var personal_access_tokens = _personal_access_tokens(sequelize, DataTypes);
    var players = _players(sequelize, DataTypes);
    var private_contests = _private_contests(sequelize, DataTypes);
    var rank_categories = _rank_categories(sequelize, DataTypes);
    var ranks = _ranks(sequelize, DataTypes);
    var settings = _settings(sequelize, DataTypes);
    var squads = _squads(sequelize, DataTypes);
    var states = _states(sequelize, DataTypes);
    var temp_users = _temp_users(sequelize, DataTypes);
    var user_contests = _user_contests(sequelize, DataTypes);
    var user_private_contests = _user_private_contests(sequelize, DataTypes);
    var user_teams = _user_teams(sequelize, DataTypes);
    var users = _users(sequelize, DataTypes);

    fixtures.belongsTo(competitions, {as: "competition", foreignKey: "competition_id"});
    competitions.hasMany(fixtures, {as: "fixtures", foreignKey: "competition_id"});
    contests.belongsTo(contest_categories, {as: "contest_category", foreignKey: "contest_category_id"});
    contest_categories.hasMany(contests, {as: "contests", foreignKey: "contest_category_id"});
    payments.belongsTo(contests, {as: "contest", foreignKey: "contest_id"});
    contests.hasMany(payments, {as: "payments", foreignKey: "contest_id"});
    user_contests.belongsTo(contests, {as: "contest", foreignKey: "contest_id"});
    contests.hasMany(user_contests, {as: "user_contests", foreignKey: "contest_id"});
    fantasy_points.belongsTo(fantasy_point_categories, {
        as: "fantasy_point_category",
        foreignKey: "fantasy_point_category_id"
    });
    fantasy_point_categories.hasMany(fantasy_points, {as: "fantasy_points", foreignKey: "fantasy_point_category_id"});
    contests.belongsTo(fixtures, {as: "fixture", foreignKey: "fixture_id"});
    fixtures.hasMany(contests, {as: "contests", foreignKey: "fixture_id"});
    private_contests.belongsTo(fixtures, {as: "fixture", foreignKey: "fixture_id"});
    fixtures.hasMany(private_contests, {as: "private_contests", foreignKey: "fixture_id"});
    squads.belongsTo(fixtures, {as: "fixture", foreignKey: "fixture_id"});
    fixtures.hasMany(squads, {as: "squads", foreignKey: "fixture_id"});
    user_teams.belongsTo(fixtures, {as: "fixture", foreignKey: "fixture_id"});
    fixtures.hasMany(user_teams, {as: "user_teams", foreignKey: "fixture_id"});
    squads.belongsTo(players, {as: "player", foreignKey: "player_id"});
    players.hasMany(squads, {as: "squads", foreignKey: "player_id"});
    payments.belongsTo(private_contests, {as: "private_contest", foreignKey: "private_contest_id"});
    private_contests.hasMany(payments, {as: "payments", foreignKey: "private_contest_id"});
    user_private_contests.belongsTo(private_contests, {as: "private_contest", foreignKey: "private_contest_id"});
    private_contests.hasMany(user_private_contests, {as: "user_private_contests", foreignKey: "private_contest_id"});
    ranks.belongsTo(rank_categories, {as: "rank_category", foreignKey: "rank_category_id"});
    rank_categories.hasMany(ranks, {as: "ranks", foreignKey: "rank_category_id"});
    bank_accounts.belongsTo(states, {as: "state", foreignKey: "state_id"});
    states.hasMany(bank_accounts, {as: "bank_accounts", foreignKey: "state_id"});
    users.belongsTo(states, {as: "state", foreignKey: "state_id"});
    states.hasMany(users, {as: "users", foreignKey: "state_id"});
    temp_users.belongsTo(temp_users, {as: "referral", foreignKey: "referral_id"});
    temp_users.hasMany(temp_users, {as: "temp_users", foreignKey: "referral_id"});
    admin_user_contests.belongsTo(user_teams, {as: "user_team", foreignKey: "user_team_id"});
    user_teams.hasMany(admin_user_contests, {as: "admin_user_contests", foreignKey: "user_team_id"});
    user_contests.belongsTo(user_teams, {as: "user_team", foreignKey: "user_team_id"});
    user_teams.hasMany(user_contests, {as: "user_contests", foreignKey: "user_team_id"});
    user_private_contests.belongsTo(user_teams, {as: "user_team", foreignKey: "user_team_id"});
    user_teams.hasMany(user_private_contests, {as: "user_private_contests", foreignKey: "user_team_id"});
    admin_user_contests.belongsTo(users, {as: "user", foreignKey: "user_id"});
    users.hasMany(admin_user_contests, {as: "admin_user_contests", foreignKey: "user_id"});
    bank_accounts.belongsTo(users, {as: "user", foreignKey: "user_id"});
    users.hasMany(bank_accounts, {as: "bank_accounts", foreignKey: "user_id"});
    pan_cards.belongsTo(users, {as: "user", foreignKey: "user_id"});
    users.hasMany(pan_cards, {as: "pan_cards", foreignKey: "user_id"});
    payments.belongsTo(users, {as: "user", foreignKey: "user_id"});
    users.hasMany(payments, {as: "payments", foreignKey: "user_id"});
    private_contests.belongsTo(users, {as: "user", foreignKey: "user_id"});
    users.hasMany(private_contests, {as: "private_contests", foreignKey: "user_id"});
    user_contests.belongsTo(users, {as: "user", foreignKey: "user_id"});
    users.hasMany(user_contests, {as: "user_contests", foreignKey: "user_id"});
    user_private_contests.belongsTo(users, {as: "user", foreignKey: "user_id"});
    users.hasMany(user_private_contests, {as: "user_private_contests", foreignKey: "user_id"});
    user_teams.belongsTo(users, {as: "user", foreignKey: "user_id"});
    users.hasMany(user_teams, {as: "user_teams", foreignKey: "user_id"});

  return {
      admin_user_contests,
      bank_accounts,
      banners,
      blogs,
      competitions,
      contest_categories,
      contest_templates,
      contests,
      failed_jobs,
      fantasy_point_categories,
      fantasy_points,
    faqs,
    fixtures,
    migrations,
    notifications,
    pages,
    pan_cards,
    password_resets,
    payments,
    personal_access_tokens,
    players,
    private_contests,
    rank_categories,
    ranks,
    settings,
    squads,
    states,
    temp_users,
    user_contests,
    user_private_contests,
    user_teams,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
