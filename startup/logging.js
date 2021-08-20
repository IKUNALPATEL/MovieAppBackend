require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');


module.exports = function(){

winston.handleExeptions(
   new winston.transports.Console({colorize:true, prettyPrint : true}),
    new winston.transports.File,{filename : 'exceptions.log'}
    );

process.on('unhandleRejection',ex =>{
    throw ex
})


// process.on('uncaughtException',(ex) => {
//     console.log('we got an uncaught exception');
//     winston.error(ex.message,ex);
//     process.exit(1)
// });

// throw new Error('Somethings failed during startup)

// process.on('unhandleRejection',(ex) => {
//     console.log('we got an unhandleRejection');
//     winston.error(ex.message,ex);
//     process.exit(1)
// });

// const p = Promise.reject(new Error("something failed"));
// p.then(() => console.log("Done"));


winston.add(winston.transports.File,{filename : 'logfile.log'});
winston.add(winston.transports.MongoDB,{
            db : "mongodb://localhost/vital",
            level:"error"
});
}