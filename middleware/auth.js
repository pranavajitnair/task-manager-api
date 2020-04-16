jwt=require('jsonwebtoken');
const User=require('../src/models/user');
const auth=async(req,res,next)=>{
   try{
        const token=req.header('Authorization').replace('Bearer ','');
        const decoded=jwt.verify(token,'thisismynewcourse');
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error('no user');
        } 
        req.token=token;
        req.user=user;
        next()
   }catch(error){
       res.send(401).send('error:please authenticate yourself')
   }
}
module.exports=auth;