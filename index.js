const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/Pop', db.getPop)
app.get('/Pop/:id', db.getPopByYr)
app.post('/Pop', db.createPop)
app.delete('/Pop/:id', db.deletePop)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})