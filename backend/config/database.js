const mongoose = require('mongoose');

const connectDB = () => {
   mongoose.connect(process.env.DB_LOCAL_URL, {}).then((con) => {
      console.log(`MongoDB databse connected with host : ${con.connection.host}`);
   });
};

module.exports = connectDB;
