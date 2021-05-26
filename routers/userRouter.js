const userRouter = require('express').Router()
const User = require('../models/userModel')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.post('/register', async (req, res) => {
    const body = req.body;
    const saltHash = 10

    const passwordHash = await bcrypt.hash(body.password, saltHash)

    if(!body.username || !body.password || !body.passwordVerify){
        return res.status(400).json({errorMessage: "Please enter all required fields"})
    }

    if(body.username.length < 6){
        return res.status(400).json({errorMessage: "Username must be greater than 6 characters"})
    }

    if(body.password.length < 6){
        return res.status(400).json({errorMessage: "Password must be greater than 6 characters"})
    }

    if(body.password !== body.passwordVerify){
        return res.status(400).json({errorMessage: "Passwords must be the same"})
    }

    const user = new User({
        username: body.username,
        passwordHash
    })

    const savedUser = await user.save()
    const token = jwt.sign({id: savedUser._id}, process.env.SECRET, {expiresIn: 60*60})

    res.cookie("token", token, {
        httpOnly: true,
    }).send()
    //this send might be wrong
})

userRouter.post('/login', async(req, res) => {
    try {
    const body = req.body

    const user = await User.findOne({username: body.username})
    const passwordCheck = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

    if(!(user && passwordCheck)){
        return res.status(401).json({
            errorMessage: "Invalid username or password"
        })
    }

    const token = jwt.sign({id: user._id}, process.env.SECRET, {expiresIn: 60*60})
    res.cookie("token", token, {
        httpOnly: true,
    }).send()
    } catch (err){
        res.status(500).send()
    }
})

userRouter.get("/logout", (req, res) => {
    try {
        res.clearCookie("token").send();
    } catch (err){
        return res.json(null)
    }
})

userRouter.get("/loggedIn", (req, res) => {
    try{
        const token = req.cookies.token

        if(!token){
            return res.json(null)
        }
        const verifiedToken = jwt.verify(token, process.env.SECRET)
        res.json(verifiedToken.id);
    } catch (err) {
        return res.json(null)
    }
})

module.exports = userRouter