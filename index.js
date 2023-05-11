// import / intial
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')
const compression = require('compression')

// import routes
const profileRoutes = require('./routes/profile.routes')
const recipeRoutes = require('./routes/recipes.routes')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Use Helmet!
app.use(helmet())

// Use xss!
app.use(xss())

// routing
app.use(cors())

// compress
app.use(compression())

// use routing
app.use(profileRoutes)
app.use(recipeRoutes)

app.get('/', function (req, res) {
  res.send('Hello World')
})

// listener
app.listen(3000, () => {
  console.log('App running in port 3000')
})
