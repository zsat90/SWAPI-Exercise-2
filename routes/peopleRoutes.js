const express = require('express')
const router = express.Router()
const {getPeople, getPersonById, fetchAllPeople} = require('../controllers/peopleController')

// route for recurcive function
router.get('/', async(req, res) => {
      try{  
        const sortBy = req.query.sortBy  
        const allPeople = await fetchAllPeople(sortBy)
        res.status(200).json(allPeople)       

        }catch(err){
            console.error(err)
            res.status(500).json(err)
        }
    })

// route for while loop 
// router.get('/', getPeople)

router.get('/:personId', getPersonById)


module.exports = router