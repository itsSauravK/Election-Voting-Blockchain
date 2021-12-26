const app = require('./app')
const connectDB = require('./config/database')

const dotenv = require('dotenv')

//setting up config file
dotenv.config({ path: 'backend/config/config.env'})

//connecting to database
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server started on Port: ${process.env.PORT}`)
})