const mongodb=require('mongodb');
const {MongoClient,ObjectID}=mongodb;
const id=mongodb.ObjectID;
const newid=new id();
//console.log(newid);
//console.log(newid.getTimestamp());
//console.log(newid.id.length);
const url='mongodb://127.0.0.1:27017';
const databaseName='task-manager-api';
MongoClient.connect(url,{useNewUrlParser:true},(error,client)=>{
    if(error) return console.log('Unable to Connect database');
    //const db=client.db.(databaseName);
    mongodb.dropDataBase(databaseName);
  /* db.collection('users').insertMany([
        {name:'Jen',
    age:24},
    {
        name:'Guntur',
        age:27
    }
    ],(error,result)=>{
        if(error) return console.log('Unable to connect')
        console.log(result.ops);
    })*/
    /*db.collection('users').insertOne({
        name:'Andrew',
        age:27
    },(error,result)=>{
        if(error) {return console.log('Unable to insert user')}
        console.log(result.ops)
    })*/
   /* db.collection('tasks').insertMany([{
        description:'eat',
        completed:false
    },
    {
        description:'sleep',
        completed:true
    },
    {
        description:'bath',
        completed:true
    },
    {
        description:'run',
        completed:false
    }],(error,result)=>{
        if(error) return console.log('Unable to insert data');
        console.log(result.ops);
    })*/
  /*  db.collection('users').findOne({
        name:'Jen'
    },(error,user)=>{
        if(error) return console.log('Unable to find the request');
        return console.log(user);
    })
    db.collection('users').find({age:27}).toArray((error,users)=>{
        if(error) return console.log('unable to find the query')
        console.log(users)
    })
    db.collection('users').find({age:27}).count((error,count)=>{
        console.log(count);
    })
    db.collection('tasks').find({completed:false}).toArray((error,tasks)=>{
        if(error) return console.log('unable to find the query');
        return console.log(tasks);
    })
   db.collection('users').updateOne({_id:new ObjectID("5d56d22f6dc61c660369d654")},
    {$set:{
        name:'Mike'
    }}).then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error);
    })
    db.collection('tasks').updateMany({completed:false},{
        $set:{
            completed:true
        }
    }).then((result)=>{console.log(result)}).catch((error)=>
    {console.log(error)});*/
  /*  db.collection('users').deleteOne({name:'Jen'}).then((result)=>{
        console.log(result)
    }).catch((error)=>{console.log(error)});*/
    db.collection('users').deleteMany({_id:new ObjectID("5d56d56d91ef236678f6b73f")})
    .then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error);
    });
})