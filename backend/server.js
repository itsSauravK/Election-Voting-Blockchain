const app = require("./app");
const connectDB = require("./config/database");

const dotenv = require("dotenv");

//handle uncaught exceptions
process.on("uncaughtException", (err) => {
   console.log(`ERROR: ${err.stack}`);
   console.log("Server is being shutdown due to uncaught excpetion");
   process.exit(1);
});

//setting up config file
dotenv.config({ path: "backend/config/config.env" });

//connecting to database
connectDB();

const server = app.listen(process.env.PORT, () => {
   console.log(`Server started on Port: ${process.env.PORT}`);
});

//Handling unhandled promise rejections
process.on("unhandledRejection", (err) => {
   console.log(`Error: ${err.message}`);
   console.log("Server is being shutdown due to unhandled promise rejection");
   server.close(() => {
      process.exit(1);
   });
});
