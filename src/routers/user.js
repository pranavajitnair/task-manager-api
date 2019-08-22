const auth=require('../../middleware/auth');
const express=require('express');
const bcrypt=require('bcryptjs');
const multer=require('multer');
const sharp=require('sharp');
const router=new express.Router();
const User=require('../models/user');
const {sendWelcomeEmail}=require('../emails/account');
router.post('/users',async(req,res)=>{
    console.log(req.body)
    const user=new User(req.body);
    try{
        await user.save()
        sendWelcomeEmail(user.email,user.name);
        console.log('jhcgcgj')
        res.status(201).send(user);
    } catch(error){
        res.status(500).send(error);
    }
})
const upload=multer({
    limits:{ 
        fileSize:1000000
    },
    fileFilter(req,file,cb){
         if(!file.originalname.match(/\.(doc|docx|jpg|pdf)$/)){
             return cb(new Error('Please upload a PDF'))
         }
         cb(undefined,true);
    }
})
router.post('/users/me/upload',auth,upload.single('upload'),async(req,res)=>{
   const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar=buffer;
    await req.user.save();
    res.send().status(200);
},(error,req,res,next)=>{
    res.send({error:error.message}).status(400)
})
router.delete('/users/me/pic/delete',auth,async(req,res)=>{
    req.user.avatar=undefined;
    try{await req.user.save();
    res.send().status(500)}catch(error){
        res.send().status(500)
    }
})
router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password);
        const token=await user.generateAuthToken(); 
        //console.log(user);
        res.send({user,token});
    }catch(error){
        console.log(error);
    }
})
router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save();
        res.send();
    }catch(error){
        res.status(500).send();
    }
})
router.post('/users/logoutall',auth,async(req,res)=>{
    try{
        req.user.tokens=[];
        console.log(req.user.tokens);
        await req.user.save();
        res.send();
    }catch(error){
        res.status(500).send()
    }
})
router.patch('/users/update',auth,async(req,res)=>{
    const t=Object.keys(req.body);
    const k=['name','password','email','age']
    if(!t.every((update)=>k.includes(update))){
        return res.send('Invalid Update');
    }
    try{
        t.forEach((update)=>{
            req.user[update]=req.body[update];
        })
        await req.user.save();
            res.send(req.user);
        }
        catch(error){
            console.log(error);
        }
})
router.get('/users/me',auth,async (req,res)=>{
    res.send(req.user); 
})
router.delete('/users/delete',auth,async(req,res)=>{
    try{
       await req.user.remove()
       res.status(200).send()
    }
    catch(error){
        console.log(error);
    }

})
router.get('/users/:id',async(req,res)=>{
    try{
       const user=await User.findById(req.params.id)
        if(!user||!user.avatar) throw new Error('does not Exist');
        res.set('Content-Type','image/png')
        res.send(user.avatar);
    }catch(error){
        res.send().status(500);
    }
})
router.get('/test',(req,res)=>{
    res.send('Finally worked');
})
module.exports=router;