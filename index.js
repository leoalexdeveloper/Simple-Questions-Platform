require("dotenv").config()

const express = require("express")
const app = express()
const connection = require("./app/database/database.js")
// eslint-disable-next-line no-unused-vars
const Pergunta = require("./app/database/Pergunta")
// eslint-disable-next-line no-unused-vars
const Resposta = require("./app/database/Resposta")

connection
	.authenticate()
	.then(() => {
		console.log("Sucess")
	})
	.catch((e) => {
		console.log(e)
	})

app.set("view engine", "ejs")
app.set("views", "app/views")

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static("app/public"))

app.get("/", (req, res) => {
	Pergunta.findAll({raw: true, order:[
		["id", "desc"]
	]}).then((perguntas) => {
		res.render("index", {perguntas})	
	})
})

app.get("/pergunta/:id", (req, res) => {
	var id = req.params.id
	Pergunta.findOne({
		where: {id:id}
	}).then(pergunta => {
		
		if(pergunta !== null){
			Resposta.findAll({
				where:{pergunta:pergunta.id},
				order:[["createdAt", "desc"]]
			}).then(respostas => {
				res.render("pergunta", {pergunta, respostas})
			})
		}else{
			res.redirect("/")
		}
	})
})

app.get("/perguntar", (req, res) => {
	res.render("perguntar")
})

app.post("/salvarpergunta", (req, res) => {
	const titulo = req.body.titulo
	const descricao = req.body.descricao

	Pergunta.create({
		titulo,
		descricao
	}).then(() => {
		res.redirect("/")
	})
})

app.post("/responder", (req, res) => {
	const corpo = req.body.corpo
	const pergunta = req.body.pergunta
	
	Resposta.create({
		corpo,
		pergunta
	}).then(() => {
		res.redirect(`/pergunta/${pergunta}`)
	})
})

app.listen(8000, () => console.log("Server is running"))