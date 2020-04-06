const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'POSTGRES',
  port: 5432,
})

const getPop = (request, response) => {
  pool.query('SELECT * FROM population ORDER BY year ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getPopByYr = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM population WHERE year = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createPop = (request, response) => {
  const { year, pop } = request.body

  pool.query('INSERT INTO population (year, pop) VALUES ($1, $2)', [year, pop], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send('User added with ID: ${result.insertId}')
  })
}


const deletePop = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM population WHERE year = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send('Year deleted with ID: ${id}')
  })
}

module.exports = {
  getPop,
  getPopByYr,
  createPop,
  deletePop,
}