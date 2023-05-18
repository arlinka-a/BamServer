const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisuser')
        const user = await User.findOne({ _id: decoded._id, 'token': token })
        
        req.token = token
        req.user = user 
        next()
    } catch (error) {
        res.send(error.message)
    }
}

module.exports = auth