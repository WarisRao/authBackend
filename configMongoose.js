import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/konfinity');

const userSchema = mongoose.Schema({
    name: { type:String, required:true },
    userName: { type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    mobile:{typ:Number},
    password:{type:String, required:true},
    
});

userSchema.add({
    role:{type:String,default:'user'}
})
const courseSchema = mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String,required:true},
    author:{type:String,required:true},
    modules:{type:Array}
});

export const User = mongoose.model("User",userSchema,"users");
export const Course = mongoose.model("Course",courseSchema,"courses");