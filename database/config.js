const mongoose = require('mongoose');

const dbConnection = async() => {

    try{

        await mongoose.connect( process.env.MONGODB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("*******DATABASE INICIALIZATED*******");

    }catch (error){
        console.log(error);
        throw new Error('*******ERROR IN DATABASE*******');
    }
}


module.exports = {
    dbConnection
}