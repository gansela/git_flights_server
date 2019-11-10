const express = require("express")
const bodyParser = require('body-parser')
require("dotenv").config()
const registerRouter = require("./routes/register")
const flightsRouter = require("./routes/flights")

const users = require("./data/users.json")
const keys = require("./data/keys.json")

const api = express()

api.listen(process.env.PORT , () => {
    console.log("server running")
})

api.use(bodyParser.json())

api.use("/register", registerRouter)

api.use("/flights", flightsRouter)