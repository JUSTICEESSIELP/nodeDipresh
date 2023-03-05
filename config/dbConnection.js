
const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try{
        const connection = await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
        console.log(`Database connection :  ${connection.connection.host}     \t ${connection.connection.name}`)
    }catch(err){
        throw Error(`${err}`);
        process.exit(1);
        
       
    }
    
}


module.exports = dbConnection