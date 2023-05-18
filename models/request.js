const mongoose = require('mongoose')

const requestShcema = new mongoose.Schema({
    kind: {
        type: String,
        required: true,
    },
    description: {
        type: String, 
        required: true,
    }, 
    confirmed: {
        type: String,
        default: "ממתין לאישור"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Request = mongoose.model('Request', requestShcema)

module.exports = Request