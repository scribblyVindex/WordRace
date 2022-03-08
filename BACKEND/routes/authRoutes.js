const express = require('express')
const router = express.Router()
const User = require('../Models/User')
const bcrypt  = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const JWT_SECRET = process.env.WEB_SECRET

router.post('/signup', async(req,res)=>{
    try {
        let user = await User.findOne({username:req.body.username})
        if(user){
            return res.status(400).json({message:"User already exists, please login! "})
        }
        
        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            username:req.body.username,
            password:securePassword
        })
        let id = {
            user:{id:user.id}
        }
        let data = {username:user.username,gamesPlayed:user.gamesPlayed,highScore:user.highScore, avgScore:user.avgScore, maxLevel:user.maxLevel}
        const authToken=jwt.sign(id, JWT_SECRET)
        res.status(200).json({message:"Registered successfully", authToken, data})
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"User couldn't be created, please try again"})
    }
})

router.post('/login',async(req,res)=>{
    
    try {
        let user =await  User.findOne({username:req.body.username})
        if(!user){return res.status(400).json({message:"Invalid credentials"})}
        let passwordCompare = await bcrypt.compare(req.body.password, user.password)
        if(!passwordCompare){return res.status(400).json({message:"Invalid credentials"})}
        let id = {
            user:{id:user.id}
        }
        let data = {username:user.username,gamesPlayed:user.gamesPlayed,highScore:user.highScore, avgScore:user.avgScore, maxLevel:user.maxLevel}
        const authToken=jwt.sign(id, JWT_SECRET)
        res.status(200).json({message:"Logged in successfully", authToken, data})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Error while logging in, please try again."})
    }
})
router.put('/update',async(req,res)=>{
    try {
        
        const userId = jwt.verify(req.header('auth-token'),JWT_SECRET).user.id;
        
        const user = await User.findById(userId);
        let gamesPlayed = user.gamesPlayed;
        let avgScore = user.avgScore;

        avgScore = parseInt((avgScore*gamesPlayed+req.body.score)/(gamesPlayed+1));
        gamesPlayed=gamesPlayed+1;
        const highScore = req.body.score>user.highScore?req.body.score:user.highScore
        const maxLevel = req.body.level>user.maxLevel?req.body.level:user.maxLevel

        user.avgScore = avgScore;
        user.gamesPlayed=gamesPlayed;
        if(req.body.score>user.highScore){user.highScore=req.body.score;}
        if(req.body.level>user.maxLevel){user.maxLevel=req.body.level;}
        user.save()
        
        let data={avgScore,gamesPlayed, highScore, maxLevel}

        res.status(200).json({data,message:"Score submitted successfully"})

    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Score couldnt be submitted, please try again."})
    }
})

router.get('/getScores',async (req,res)=>{
    try {
        const users = await User.find({}).select(['-_id','username','highScore'])
        let scores = users.sort(function compare(a, b) {
            if(a.highScore>b.highScore){return -1}
            else if(a.highScore<b.highScore){return 1}
            else{return 0}
          }).slice(0,11)
        
        res.status(200).json(scores)
    } catch (error) {
        console.log(error)
    }
})

router.get('/getUser', async (req,res)=>{
    
    try {
        
        const userId = jwt.verify(req.header('auth-token'),JWT_SECRET).user.id;
        const user = await User.findById(userId).select(['-_id','highScore','avgScore','gamesPlayed','maxLevel'])
        
        res.status(200).json(user)
    } catch (error) {
        console.log(error)
    }
})
module.exports = router
