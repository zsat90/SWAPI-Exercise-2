const express = require('express')
const cors = require('cors')


const app = express()
const port = 3000
const peopleRoute = require('./routes/peopleRoutes')
const planetRoute = require('./routes/planetRoutes')
const filmRoute = require('./routes/filmsRoutes')

app.use(cors())
app.use(express.json())


app.use('/people', peopleRoute)
app.use('/planets', planetRoute)
app.use('/films',filmRoute)



app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})



