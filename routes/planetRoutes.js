const express = require('express')
const router = express.Router()
const {getPlanets, fetchAllPlanets} = require('../controllers/planetController')
const axios = require('axios')
require('dotenv').config()


const baseURL = process.env.BASE_URL

// route for recursive call
router.get('/', async (req,res) => {
    try{
        const allPlanets = await fetchAllPlanets()
        for(const planet of allPlanets){
            const residents = await Promise.all(
                planet.residents.map(async (residentUrl) => {
                    const personId = residentUrl.split('/').slice(-2, -1)[0];
                    const personResponse = await axios.get(`${baseURL}/people/${personId}`);
                    return personResponse.data.name;
                })
            );
                
            planet.residents = residents;

        }

        res.status(200).json(allPlanets)

    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }

})


// route for while loop
// router.get('/', getPlanets)



module.exports = router