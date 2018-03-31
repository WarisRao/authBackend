import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import logger from 'morgan';
import cors from  'cors';

//import {registerRouter ,filesRouter, coursesRouter} from './routes/index';

import router from './routes/index';

const app = express();

app.server = http.createServer(app);
app.use(clearConsole);
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json({extended:false}));


function clearConsole(req,res,next){
    console.log('\x1Bc');
    next();
}

app.server.listen(3000,(err)=>{
    if(err){
        console.log('error in index :::',err);
    }
    else{
        console.log('server started on port 3000');
    }
    
});
 
router(app);

