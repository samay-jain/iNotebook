const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

//const mongoURI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const mongoURI = 'mongodb://localhost:27017/inotebook';

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to mongo successfully");
    });
}

module.exports = connectToMongo;