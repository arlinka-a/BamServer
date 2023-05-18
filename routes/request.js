const express = require('express')
const Request = require('../models/request')
const auth = require('../middleware/auth')
const router = new express.Router()


// , auth,
// tasks
//       create
router.post('/request', auth, async (req, res) => {
    const request = new Request({
        ...req.body,
        owner: req.user._id 
    })

    try{
        await request.save()
        res.send(request)
    } catch (error) {
        res.send(error)
    }
})


//       read

// GET /requests?confirmed=true/false
// GET /requests?limit=50
// GET /requests?kind=encodingCard/blackFile/validationEntery/signShos
// GET /requests?user_id

// get for user only
router.get('/requests', auth, async (req, res) => {
    const match = {}
    try {
        await req.user.populate({
            path: 'requests', 
            match,
        })
        res.send(req.user.requests)
    } catch (error) {
        res.send(error.message)
    }
})

// get for manager
router.get('/manageRequests', async (req, res) => {

    try {
        const requests = await Request.find({  })
        if (!requests) {
            return res.send()
        }
        res.send(requests)
    } catch (error) {
        res.send(error)
    }
})

// open requests
router.get('/manageRequests/open', async (req, res) => {
    try {
        const requests = await Request.find({ confirmed: "ממתין לאישור" })
        if (!requests) {
            return res.send()
        }
        res.send(requests)
    } catch (error) {
        res.send(error.message)
    }
})

// update request
router.patch('/manageRequests/:id', async (req, res) => {
    // data and ID
    const _id = req.params.id
    const updateData = req.body

    // update
    try {
        const request = await Request.findByIdAndUpdate(_id, updateData)

        if (!request){
            return res.send()
        }
        await request.save()

        res.send(request)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router