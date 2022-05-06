import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../Models/userModel.js'

const protect=asyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token=req.headers.authorization.split(' ')[1]
            const decoded= jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password')
            console.log(req.user);
        next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }
    if(!token){
        console.log(req.headers.authorization)
        res.status(401)
        throw new Error('Not authorized,no token')
    }
})

const admin=(req,res, next)=>{
    if(req.user&&req.user.isAdmin){
        next()
    }else{
        res.status(401)
        throw new Error('Not authorized as an admin')
    }
}

const isBlocked = (req,res,next)=>{
    console.log("here");
    console.log(req.user);
    if(req.user && !req.user.isBlocked){
        next()
    }else{
        console.log("Blocked");
        res.status(401).json({blocked:true})
    }
}

export {protect,admin,isBlocked}