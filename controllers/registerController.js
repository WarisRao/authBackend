import express from 'express';
import jwt from 'jsonwebtoken';

import {User,Course} from '../configMongoose';


const registerController ={
    get:_get,
    post:_post
}

function _get (req,res){
   return res.send('registeration page')
}

function _post (req,res){
    
    console.log('reqBody:',req.body); 
    const email = req.body.email ,mobile=req.body.mobile, userName=req.body.userName, 
                    password=req.body.password, name=req.body.name, role=req.body.role ;
    
    if((!email||email==='undefined')||(!userName||userName==='undefined')
        ||(!password||password==='undefined')||(!name||name==='undefined')){
            return  res.send('enter full detail');
    }
    
    else {
        
    User.findOne({email,userName})
        .then((user)=>{
            if(!user){                
                const newUser = new User({email,password,name,mobile,userName,role});
                newUser.save()
                    .then((user)=>{
                        let id = user._id, role = user.role;
                        let token = jwt.sign({id,role},'lalala');
                        return  res.json({token,error:'null'});
                    
                    })    
                    .catch((err)=>{
                        console.log(err);
                    });
            }
            return res.json({token:'null',error:'username or email already registered'}); 
            
        })
        .catch((err)=>{
            console.log(err);
        });

    }

};

export default registerController;