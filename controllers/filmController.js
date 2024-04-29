const axios = require('axios')
require('dotenv').config()

const baseURL = process.env.BASE_URL

const getFilms = async(req, res) => {
    try{
        const response = await axios.get(`${baseURL}/films`)

        res.status(200).json(response.data)

    }catch(err){
        res.status(500).json(err)
        console.error(err)
    }
}


module.exports = {getFilms}