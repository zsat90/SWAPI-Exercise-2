const axios = require('axios')
require('dotenv').config()


const baseURL = process.env.BASE_URL

// this function uses a recursive call to get data from all pages
const fetchAllPeople = async(sortBy) => {
    let allPeople = []

    let initialURL = `${baseURL}/people`

    const fetchPeople = async(url) => {
        try{
            const response = await axios.get(url)
            const people = response.data.results
            allPeople.push(...people)

            if(response.data.next){
                await fetchPeople(response.data.next)
            }else{
                return allPeople
            }

        }catch(err){
            console.error(err)
        }

    
    }

    try{
        await fetchPeople(initialURL)
    
            if(sortBy){
                allPeople.sort((a,b) => {
                    if(sortBy === 'name'){
                        return a.name.localeCompare(b.name)

                    }else{
                        return parseFloat(a[sortBy].replace(',', ''), 10) - parseFloat(b[sortBy].replace(',', ''), 10)
                    }
                })
            }
        return allPeople

    }catch(err){
        console.error(err)
    }

}

// This function uses a while loop to determine if there is a nextpage
const getPeople = async(req, res) => {
    try {
        let allPeople = [];

        let nextPage = `${baseURL}/people`;

        while (nextPage) {
            const response = await axios.get(nextPage); 

            const peopleData = response.data.results;

            allPeople.push(...peopleData);

            nextPage = response.data.next;

            const sortBy = req.query.sortBy
            if(sortBy){
                allPeople.sort((a,b) => {
                    if(sortBy === 'name'){
                        return a.name.localeCompare(b.name)

                    }else{
                        return parseFloat(a[sortBy].replace(',', ''), 10) - parseFloat(b[sortBy].replace(',', ''), 10)
                    }
                })
            }
        }

        res.status(200).json(allPeople)
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};


const getPersonById = async(req,res) => {
     const personId = req.params.personId
     
    try{
        const response = await axios.get(`${baseURL}/people/${personId}`)
        res.status(200).json(response.data)

    }catch(err){
        console.error(err)
        res.status(500).json(err)
    }
}



module.exports = {getPeople, getPersonById, fetchAllPeople}