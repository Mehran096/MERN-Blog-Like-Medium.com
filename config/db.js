const mongoose = require('mongoose');
require('dotenv').config()

module.exports = connect = async () => {
    try {
        const response = await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,    
          } )
        console.log('mongoose connected successfully')
    } catch (error) {
        console.log(error)
    }
}