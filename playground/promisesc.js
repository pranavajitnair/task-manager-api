require('../src/db/mongoose');
const User=require('../src/models/user');
const Task=require('../src/models/tasks');
/*User.findByIdAndUpdate('5d56d7537bb0177113dee0e9',{age:29})
.then((user)=>{
    console.log(user)
}).catch((error)=>{
    console.log(error);
})
User.findByIdAndDelete("5d56d7537bb0177113dee0e9",{age:29})
.then((user)=>{
    return User.countDocuments({age:29})
}).then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
})
const updateAgeCount=async(id,age)=>{
    const user=await User.findByIdAndUpdate(id,{age:age})
    const count=await User.countDocuments({age:age})
    return count;
}
updateAgeCount('5d56f92f1222fc74ecaad0a7',78).then((count)=>{
    console.log(count);
}).catch((error)=>{
    console.log(error);
})*/
const update=async(id)=>{
    const task=await Task.findByIdAndDelete(id)
    const count=await Task.countDocuments({completed:true});
    return count;
}
update("5d57a1cd98a86b225a631ae2").then((result)=>{
    console.log(result);
}).catch((error)=>{
    console.log(error);
})