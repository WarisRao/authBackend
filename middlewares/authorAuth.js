import jwt from 'jsonwebtoken';

function authorAuth (req,res,next){
    
    const token=req.body.token
    
    jwt.verify(token,'lalala',function(err,decoded){

        if(err){
            next(new Error('not authorized'));
        }
            req.session ={};
            req.session.id = decoded.id;
            req.session.role = decoded.role;

            if(req.session.role!=='author'){
                return res.json({
                    error:'you are not an author',
                    courseId:null
                });
            }
            next();
    
    });
}

export default authorAuth;