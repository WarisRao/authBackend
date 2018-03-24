import express from 'express';
import jwt from 'jsonwebtoken';
import {Course,User} from '../configMongoose';

const coursesController ={
    get:_get,
    post:_post,
    addModule:_addModule
}

function _get(req,res){
    
    //let courses = [{ id: "c1", title: "FrontEnd Development", info: "Become a pro frontend developer by learning html,css , designing and animation ", modules: [{ id: "m1", title: "html", info: "learn html and do markup like a pro" }] }];
    let offset = req.params.page ;
    offset = Number(offset)*10;
    //  offset = Number(offset);
    console.log(offset);
    Course.find().limit(10).skip(offset)
        .then((courses)=>{
            return res.json(courses);
        })
        .catch((err)=>{
            console.log(err);
        })
    //res.json(courses);

}

function _post (req,res){
    console.log('req.session',req.session);
    
    User.findById(req.session.id)
        .then((user)=>{
            if(!user){
                return res.json({
                    error:'no author found',
                    courseId:null
                });
            }
            const author = user.userName;
            const title = req.body.title , description = req.body.description;
            const course = new Course({title,description,author});
            course.save()
                .then((course)=>{                
                    return res.json({
                        error:null,
                        courseId:course._id
                    })
                })
                .catch((err)=>{
                    return res.json({
                        error:'cannot add course',
                        courseId:null
                    });
                    console.log(err);
                });

        })            
}

function _addModule(req,res){
    const courseId = req.body.courseId, modules=req.body.modules;
    if(!courseId||courseId==='undefined'||!modules||modules==='undefined'){
        return res.json({
            error:'courseId and modules required '
        });
    }
    Course.findByIdAndUpdate(courseId,{modules})
        .then((course)=>{
            return res.json({
                error:null
            });
        })
        .catch((err)=>{
            return res.json({
                error:'no course found '
            });
            console.log(err);
        });
}

export default coursesController;