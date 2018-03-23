import express from 'express';

const coursesController ={
    get:_get,
    post:_post
}

function _get(req,res){
    let courses=[
        {
            id:'c1',
            title:'FrontEnd Development',
            info:'Become a pro frontend developer by learning html,css , designing and animation ',
            modules:[
                {
                    id:'m1',
                    title:'html',
                    info:'learn html and do markup like a pro',

                }
            ]

        }
    ]
    res.json(courses);

};

function _post (req,res){
    console.log(req.body);
    const token=req.body.token, title=req.body.title, description=req.body.description;
    let decoded = jwt.verify(token,'lalalala');
    console.log('decode:',decoded);
    if(!title||!description){
        return res.send('send full data');
    }
    else{
        let course =new Course({
            title,description,author:decoded.user.userName
        });
        course.save()
            .then(course=>{
                return res.json({
                    courseId:course._id
                });
            })
            .catch(err=>{
                console.log(err);
            });
    }

};

function _post2 (req,res){
    const token= req.body.token, courseId=req.body.courseId, modules= req.body.modules;
    if(!courseId||!modules){
        return res.send('pura data de sale cheap');      
    }
    else{
        Course.findByIdAndUpdate(courseId,{
            modules
        })
        .then((course)=>{
            console.log(course);
        })
        .catch(err=>{
            console.log(err);
        });
    }
    return res.send('agya');
};

export default coursesController;