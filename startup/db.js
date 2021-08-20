const winston = require("winston")
const mongoose = require("mongoose")

module.exports = function(){
    mongoose.connect('mongodb://localhost/vital')
            .then(()=>winston.info(`Connected to the MongoDB...`))
}