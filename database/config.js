const mongoose = require('mongoose');

const dbConection = async() => {

    try {

        await mongoose.connect(process.env.DB_CNN);
        
        console.log('db_online')

        
    } catch (error) {
        console.log(error);
        throw new Error('error al init basedatos'); 
    }

}

module.exports = {
    dbConection
}