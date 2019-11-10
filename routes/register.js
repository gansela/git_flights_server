const express = require("express")
const router = express.Router();
const logger = require("../utils/logger")
const validator = require("email-validator")
const wtiteToDB = require("../utils/write_to_file")
const moment = require("moment")
const keyGenerator = require("../utils/keyGenerator")

const users = require("../data/users.json")
const keys = require("../data/keys.json")

router.use("/", (req, res, next) => {
    const { userName, password, firstName, lastName, userMail } = req.body
    if ((!userName) || (!password) || (!firstName) || (!lastName)) return res.send(" please fill all fields")
    if (!validator.validate(userMail)) return res.send(" please enter a valid email acount")
    if (users[userName]) return res.send("user name already exists")
    next();
})

router.use("/", (req, res, next) => {
    const { userName, password, firstName, lastName, userMail } = req.body
    users[userName] = { userName, password, firstName, lastName, userMail }
    wtiteToDB.updateDB("./data/users.json", JSON.stringify(users))
    next()
})

router.post("/", (req, res, next) => {
    const key = keyGenerator.uuidv4()
    keys[key] = moment().format("x")
    wtiteToDB.updateDB("./data/keys.json", JSON.stringify(keys))
    logger.info(`time: ${moment().format("hh:mm:ss")} key: ${key}`)
    res.send(key)
})




module.exports = router;