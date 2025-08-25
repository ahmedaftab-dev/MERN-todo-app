// const JWT=require("jsonwebtoken")

// module.exports=async (req,res,next)=>{
//     try {
//         const authHeader = req.headers['authorization'];
//         if (!authHeader) {
//           return res.status(401).json({ success: false, message: "No token provided" });
//         }
//         const token = authHeader.split(" ")[1];
//             console.log(token, process.env.JWT_SECRET)
          
//             JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
//                 console.log(decode.id)
//                 if(err){
//                     return res.status(401).send({
//                         status:false,
//                         messagew:"Token Authorization failed due to unauthorized user"
//                     })
//                 }
//                 else{
//                     req.body.id=decode.id
//                     next();
//                 }
//             })
//         }
          
        
//     catch (error) {
//         res.status(500).send({
//             success:false,
//             message:"Network error while authentication",
//             error
//         })
        
//     }

// }
const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ success: false, message: "Authorization header missing" });
    }

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ success: false, message: "Malformed authorization header" });
    }

    const token = parts[1];
    JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Invalid or expired token",
          error: err.message
        });
      }

      // Attach user id to request
      req.userId = decoded.id;
      console.log("Authenticated user:", decoded.id);

      next();
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Network error while authentication",
      error: error.message
    });
  }
};
