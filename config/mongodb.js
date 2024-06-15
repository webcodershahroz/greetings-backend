const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectToMongodb = async () => {
    try {
        const con = await mongoose.connect("mongodb+srv://shahrozshahzad17:zwdLTaum21qH3F37@greetings.3qh2m53.mongodb.net/?retryWrites=true&w=majority&appName=greetings", {
            useNewUrlParser:true,
            useUnifiedTopology: true
         })
        console.log(`Connected Successfully: ${con.connection.host} `);
    } catch (error) {
        console.log("Error: " + error.message)
    }
}

module.exports =connectToMongodb;