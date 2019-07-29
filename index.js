const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const DB_URI = 'mongodb+srv://issue-tracker:issue-tracker@issue-tracker-tx3vl.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(DB_URI)
    .catch(err => console.log(err))
    .then(() => {
        console.log('connected to db succsesfully')
    })

app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port ${port}!`))