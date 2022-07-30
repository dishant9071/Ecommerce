const app = require('./app');

const dotenv=require("dotenv");
const connectDatabase = require("./config/database")

//handling uncaught Exception
process.on("uncaughtException",err=>{
    console.log(`Error: ${err.message}`);
    console.log(`sutting down server due to uncaught exception`);
    process.exit(1);
});

dotenv.config({path:"backend/config/config.env"});

//connecting to database
connectDatabase()

const server = app.listen(process.env.PORT,()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
});
// unhandled promise rejectionss
process.on("unhandledRejection",err=>{
    console.log(`error: ${err.message}`);
    console.log(`sutting down server due to unhandled promise rejection`);
    server.close(()=>{
        process.exit(1);
    });
});