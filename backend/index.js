const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
connectToMongo();

//Available Routes
app.use(express.json())//if we want to use req.body
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`iNoteBook backend listening on port http://locahost:${port}`)
})
