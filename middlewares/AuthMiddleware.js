const JWT=require("jsonwebtoken")

module.exports=async (req,res,next)=>{
    try {
        if( req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            const token=req.headers.authorization.split(" ")[1]
            console.log('---toke---',token)
            JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
                console.log(decode.id)
                if(err){
                    res.status(400).send({
                        status:false,
                        messagew:"Token Authorization failed due to unauthorized user"
                    })
                }
                else{
                    req.body.id=decode.id
                    next();
                }
            })
        }
            else{
                res.status(400).send({
                    status:false,
                    messagew:"Token doesn't exists"
                })
            }
        }
        
    catch (error) {
        res.status(500).send({
            success:false,
            message:"Network error while authentication",
            error
        })
        
    }

}