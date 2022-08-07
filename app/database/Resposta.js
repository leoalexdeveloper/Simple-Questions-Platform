const Sequelize = require("sequelize")
const connection = require("./database")

const Respostas = connection.define("resposta", {
	corpo:{
		type:Sequelize.TEXT,
		allowNull:false
	},
	pergunta:{
		type:Sequelize.INTEGER,
		allowNull:false
	}
})

Respostas.sync({force:false})

module.exports = Respostas