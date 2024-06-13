const connectToMongo = require('./db');

connectToMongo();


const express = require('express')
const app = express()
const port = 3000

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));



// app.get('/', (req, res) => {
//   res.send('Hello Samay!')
// })

// app.get('/api/v1/login', (req, res) => {
//     res.send('Hello Login!')
// })

// app.get('/api/v1/signup', (req, res) => {
//     res.send('Hello Signup!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})