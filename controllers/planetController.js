const axios = require('axios')
require('dotenv').config()


const baseURL = process.env.BASE_URL

// this function uses a recursive call to get data from all pages
const fetchAllPlanets = async() => {
    let allPlanets = []

    let initialURL = `${baseURL}/planets`

    const fetchPlanets = async(url) => {
        try {
            const response = await axios.get(url)
            const planet = response.data.results
            allPlanets.push(...planet)

            if(response.data.next){
                await fetchPlanets(response.data.next)
            }else{
                return allPlanets
            }

        }catch(err){
            console.error(err)
        }

    }

    try{
        await fetchPlanets(initialURL)
        return allPlanets

    }catch(err){
        console.error(err)
    }
}



// This function uses a while loop to determine if there is a nextpage
const getPlanets = async(req,res) => {

    try{
        let allPlanets = []

        let nextPage = `${baseURL}/planets`

        while(nextPage){
            const response = await axios.get(nextPage)
            const planetData = response.data.results

            for (const planet of planetData) {
                if (planet.residents && planet.residents.length > 0) {
                    const residents = await Promise.all(
                        planet.residents.map(async (residentUrl) => {
                            const personId = residentUrl.split('/').slice(-2, -1)[0];
                            const personResponse = await axios.get(`${baseURL}/people/${personId}`);
                            return personResponse.data.name;
                        })
                    );

                    planet.residents = residents;
                }
            }
            
            allPlanets.push(...planetData)

            nextPage = response.data.next
        }

        res.status(200).json(allPlanets)
    
    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }


}


module.exports = {getPlanets, fetchAllPlanets}