const Sequelize = require("sequelize")

// eslint-disable-next-line no-undef
const host = process.env.host
// eslint-disable-next-line no-undef
const database = process.env.database
// eslint-disable-next-line no-undef
const user = process.env.user
// eslint-disable-next-line no-undef
const password = process.env.password

console.log(host, database, user, password)

const connection = new Sequelize(database, user, password, {host:host, dialect:"mysql"}
)

module.exports = connection