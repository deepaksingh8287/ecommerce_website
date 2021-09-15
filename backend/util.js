import  jwt  from "jsonwebtoken"
import indeed from "./indeed"
const getToken=(user)=>{
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
    
    },indeed.JWT_SECRET,{
        expiresIn:"48h",

    })
}

const isAuth=(req,res,next)=>{
    const token=req.header.authorization;
    console.log("token=",token)
    if(token){
        const onlyToken=token.slice(7,token.length);
        jwt.verify(onlyToken,config.JWT_SECRET,(err,decode)=>{
            if(err){
                console.log("authentication failed by jwt token")
                return res.status(401).send({msg:"invalid token"})
            }
            req.user=token
            next()
            return
        })
    }
    else{
    return res.status(401).send({msg:"Token not supported"})
    }
}

const isAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
      return next()
    }
    else{
    return res.status(401).send({msg:"Admin token is not valid"})
    }
}

export {getToken,isAdmin,isAuth}