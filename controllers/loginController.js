import {User} from '../configMongoose'; 
import jwt from 'jsonwebtoken';

const loginController = {
    get:_get,
    post:_post
}

function _get (req,res){
    return res.send('login page');
}

function _post(req,res){
    const email = req.body.email , password = req.body.password;
    if((!email||email==='undefined')||(!password||password==='undefined')){
        return res.send('pura data de cheap');
    }
    User.findOne({email})
        .then((user)=>{
            if(!user){
                return res.json({
                    error:'no user found',
                    token:null
                });
            }
            if(!user.password===password){
                return res.json({
                    error:'email and password not matched',
                    token:null
                });
            }
            let id= user._id , role =user.role;
            let token = jwt.sign({id,role},'lalala');
            return res.json({
                    error:'null',
                    token
                });
            
        })
        .catch((err)=>{
            console.log(err);
        })

    console.log('body::',req.body);
}

export default loginController;