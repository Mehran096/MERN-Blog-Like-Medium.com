const app = require('express')
const { ProfileNameUpdate, validatePassword, profilePasswordUpdate } = require('../controllers/profileController')
const auth = require('../utils/auth')
const router = app.Router()

//update name
router.post('/updateName', auth, ProfileNameUpdate)

//update password
router.post('/updatePassword', [auth, validatePassword], profilePasswordUpdate)

module.exports = router