const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const morgan = require('morgan');

const DB_LOCAL = 'mongodb+srv://issue-tracker:issue-tracker@issue-tracker-tx3vl.mongodb.net/test?retryWrites=true&w=majority';
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('combined'));

//Connecting to our mongodb database
mongoose.connect(DB_LOCAL)
    .catch(err => console.log(err))
    .then(() => {
        console.log("Connected to DB successfully")
    })

// User Routes
const UserModel = require('./models/user.model');
//Create User
app.post('/user', (req, res, next) => {
    let user = new UserModel({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    })
    UserModel.create(user, (err, response) => {
        if(err) {
            console.log(err);
            return;
        }
        res.json(response);
    })
})
// Get all users
app.get('/user', (req, res) => {
    UserModel.find({}, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})
//Delete user by id
app.delete('/user/:id', (req, res, next) => {
    const id = req.params.id;
    UserModel.deleteOne({_id: id}, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

// find user by Id
app.get('/user/:id', (req, res, next) => {
    const id = req.params.id;
    UserModel.findById({_id: id}, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

// edit user by id 
app.put('/user', (req, res, next) => {
    UserModel.update({
        _id: req.body.id
    },{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    }, (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.json(result);
    })
})

////////////////////LOGIN AUTHENTICATED


  app.post('/user/login',(req, res) => {
    let userEmail = req.body.email;
    let userPassword = req.body.password;

    UserModel.findOne({ email: userEmail}, (err,result) => {
        if(err){
            console.log(err);
            return;
        }
        if(result == null){
            res.json({
                message: "User does not exist",
                loggedIn: false
            })
            return;
        }
        if(userPassword == result.password){
            res.json({
                message: 'logged in successfuly',
                loggedIn: true
            })
            return;
        }
        res.json({
            message: 'Email or password incorrect',
            loggedIn: false
        })
    })
  });






app.get('/', (req, res) => res.send('Hello World!'))
app.get('/test', (req, res) => res.json({
    message: "Cohuni o njerz"
}))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))