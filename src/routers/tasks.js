const express=require('express');
const router=new express.Router();
const auth=require('../../middleware/auth');
const Task=require('../models/tasks');
router.post('/tasks',auth,async (req,res)=>{
    const task=new Task({
        ...req.body,
        owner:req.user._id
    });
    task.save().then((result)=>{
        res.status(201).send(task);
    }).catch((error)=>{res.status(404).send(error)});
})
router.get('/tasks',auth,async (req,res)=>{
    const match={};
    const sort={}
    if(req.query.completed){
        match.completed=req.query.completed==='true';
    }
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(':');
        sort[parts[0]]=parts[1]==='desc'?-1:1;
    }
  try{
      const x=await req.user.populate({
          path:'tasks',
        match,
    options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
    }}).execPopulate()
    //  const x=await Task.find({owner:req.user._id})
     res.send(x.tasks);
  } catch(error){
      res.status(500).send()
  } 
})
router.get('/tasks/:id',auth,async(req,res)=>{
    const k=req.params.id;
    try{
    const x=await Task.find({id:k,owner:req.user._id})
    res.send(x)}
    catch(error){
        console.log(error)
    }
})
router.patch('/tasks/:id',auth,async(req,res)=>{
    const id=req.params.id;
    try{
        const k=await Task.updateOne({_id:id,owner:req.user._id},req.body);
        res.send(k);
    } catch(error){
        console.log(error);
    }
})
router.delete('/tasks/:id',auth,async(req,res)=>{
    const k=req.params.id;
    try{
        const o=await Task.deleteOne({_id:k,owner:req.user._id});
        res.send(o);
    }catch(error){
        console.log(error);
    }
})
module.exports=router
