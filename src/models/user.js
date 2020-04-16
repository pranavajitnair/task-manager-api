mongoose=require('mongoose');
validator=require('validator');
jwt=require('jsonwebtoken');
const Task=require('./tasks');
bcrypt=require('bcryptjs'); 
const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(value.length<=6||value.includes("password")==true){
                throw new Error("All password conditions must me satisfied");
            }
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email id');
            }
        }
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error('Age must be positive')
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    avatar:{
        type:Buffer
    }
}, 
{
    timestamps:true
})
userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userSchema.methods.generateAuthToken=async function(){
    const token=jwt.sign({_id:this.id.toString()},process.env.JWT_SECRET);
    this.tokens=this.tokens.concat({token});
    await this.save();
    return token;
}
userSchema.methods.toJSON=function(){
    const userObject=this.toObject();
    delete userObject.password;
    delete userObject.tokens;
    return userObject;
}
userSchema.statics.findByCredentials=async(email,password)=>{
    const user=await User.findOne({email:email})
    if(!user){
        throw new Error('Unable to log in');
    }
    console.log(user.password);
    const bool=await bcrypt.compare(password,user.password);
    if(!bool){
        throw new Error('Unable to Log in');
    }
    return user;
}
userSchema.pre('save',async function(next){
    console.log('worked');
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8);
    }
    next();
})
userSchema.pre('remove',async function(){
    const k=await Task.deleteMany({owner:this._id});
    console.log(k)
})
userSchema.post('remove',async function(){
    const sgMail=require('@sendgrid/mail');
    const sendgridAPIKey=process.env.SENDGRID_API_KEY;
    sgMail.setApiKey(sendgridAPIKey);
    sgMail.send({
        to:email,
        from :'pranavn1008@gmail.com',
        subject:'looking forward to serve you once again!',
        text:'unsatisfied with our service'
    })
})
const User=mongoose.model('User',userSchema)
module.exports=User;
