const credentials=require('../model/user')
const jwt=require('jsonwebtoken')

const authorization=async(req,res,next)=>{
    if(req.headers.authorization){
        let decode=jwt.verify(req.headers.authorization,'key123')

        if(decode){
            req.userId=decode.id

            if(req.userid!==""){
                next()
            }else{
                res.json({message:"unauthorized"})
            }
        }else{
            res.json({
                status:0,
                message:"user not found"
            })
        }
    }else{
        res.json({
            status:0,
            message:"unAuthorized"
        })
    }
}

const verifyUser=async(req,res)=>{
    try{
        if(req.body.token){
            let decode=jwt.verify(req.body.token,"key123")
            if(decode){
                req.userId=decode.id
                if(req.userId!==null){
                    let user =await credentials.findone({_id:req.userId})

                    if(user !==null){
                        res.json({status:1,message:"Authorized"})
                    }else{
                        res.json({
                            status:0,
                            message:"unathorized"
                        })
                    }
                }else{
                    res.json({
                        status:0,message:"user not found"
                    })
                }
            }
        }else{
            res.json({
                status:0,
                message:"unauthorized"
            })
        }
    }catch(error){
        console.log(error)
    }
}

module.exports={authorization,verifyUser}