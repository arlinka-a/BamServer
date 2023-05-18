const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://arlinka:p8o60mxjJVp0U65d@cluster0.xsek6pl.mongodb.net/BamProject');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection failed'));
db.once('open', () => {
    console.log('connection open!')
})