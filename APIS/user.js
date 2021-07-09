const exp = require('express')
const userApi = exp.Router();
userApi.use(exp.json())
const expressErrorHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
module.exports =userApi;


userApi.post("/create", expressErrorHandler(async (req, res, next) => {

    let userCollectionObj = req.app.get("userCollectionObj")

    //get user obj
    let newUser = req.body

    //search for existing user
    let user = await userCollectionObj.findOne({ username: newUser.username })
    //if user existed
    if (user !== null) {
        res.send({ message: "User already existed" });
    }
    else {
        //hash password
        let hashedPassword = await bcryptjs.hash(newUser.password, 7)
        //replace password
        newUser.password = hashedPassword;
        //add image url
        //insert
        await userCollectionObj.insertOne(newUser)
        res.send({ message: "User created" })
    }
}))








userApi.post('/login', expressErrorHandler(async (req, res) => {
    let userCollectionObj = req.app.get("userCollectionObj")

    //get user credetials
    let credentials = req.body;
    //search user by username
    let user = await userCollectionObj.findOne({ username: credentials.username })
    //if user not found
    if (user === null) {
        res.send({ message: "invalid username" })
    }
    else {
        //compare the password
        let result = await bcryptjs.compare(credentials.password, user.password)
        //if not matched
        if (result === false) {
            res.send({ message: "Invalid password" })
        }
        else {
            //create a token
            let signedToken = jwt.sign({ username: credentials.username }, 'abcdef', { expiresIn: 10 })
            //send token to client
            res.send({ message: "login success", token: signedToken, username: credentials.username, userObj: user })
        }

    }

}))








userApi.get('/userlist',expressErrorHandler(async (req, res)=>{
    let userCollectionObj = req.app.get("userCollectionObj")
    let userlist=await userCollectionObj.find().toArray()
    res.send({ message: userlist})
}))