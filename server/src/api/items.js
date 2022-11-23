const express = require("express")
const mysql = require("mysql2");
const {Sequelize, DataTypes} = require('sequelize')

/*const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "todoList",
    password: "password"
});

connection.connect(function(err){
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else{
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});*/

const sequelize = new Sequelize('todoList', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
})

const checkConnection = async () => {
    try {
        await sequelize.authenticate()
        console.log('Соединение с БД было успешно установлено')
    } catch (e) {
        console.log('Невозможно выполнить подключение к БД: ', e)
    }
}

checkConnection()

const Todo = sequelize.define(
    'Todo',
    {
        // Здесь определяются атрибуты модели
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        completed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        // Здесь определяются другие настройки модели
    }
)

Todo.sync()

const router = express.Router()

router.get('/', async (req, res) => {
    try{
        let todos = await Todo.findAll()
        res.status(200).json({
            todos
        })
    }catch (e) {
        res.status(400).json({
            message: "Something went wrong"
        })
    }

})

router.post("/create", async (req, res) => {
    try {
        await Todo.create({name: req.body.name, completed: req.body.completed})
        res.status(200).json({
            message: "Success"
        })
    } catch (e) {
        res.status(400).json({
            message: "Something went wrong"
        })
    }
})

router.delete("/", async (req, res) => {
    try {
        let todo = await Todo.findAll({
            where: {
                id: req.query.id,
            },
        })
        await todo[0].destroy()
        res.status(200).send("Success")
    } catch (e) {
        res.status(400).send("Something went wrong")
    }
})

router.put("/edit", async (req, res) => {
    try {
        let todo = await Todo.findAll({
            where: {
                id: req.query.id,
            },
        })
        todo[0].name = req.body.name || todo[0].name
        todo[0].completed = req.body.completed ?? todo[0].completed
        await todo[0].save()
        res.status(200).send("Success")
    }catch (e) {
        res.status(400).send("Something went wrong")
    }
})

module.exports = router;