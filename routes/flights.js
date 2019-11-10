const express = require("express")
const router = express.Router();
const wtiteToDB = require("../utils/write_to_file")
const moment = require("moment")
require("dotenv").config()

const keys = require("../data/keys.json")

router.use("/", (req, res, next) => {
    const { userKey } = req.query
    if (!userKey) return res.status(401).send("invalid key")
    if (!keys[userKey]) return res.status(401).send("invalid key")
    next()
})

router.use("/", (req, res, next) => {
    const { userKey } = req.query
    if ((parseInt(keys[userKey]) + 120000) < parseInt(moment().format("x"))){
        delete keys[userKey]
        wtiteToDB.updateDB("./data/keys.json", JSON.stringify(keys))
        res.send("key expaierd")
    }
    next()
})

router.get("/", (req, res, next) => {
    console.log(process.env.SCHEDULE)
    res.sendFile(process.env.SCHEDULE)
})

module.exports = router;