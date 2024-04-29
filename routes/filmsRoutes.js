const express = require('express')
const router = express.Router()
const {getFilms} = require('../controllers/filmController')

router.get('/', getFilms)



module.exports = router