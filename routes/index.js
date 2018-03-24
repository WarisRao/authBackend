import registerController from '../controllers/registerController';
import loginController from '../controllers/loginController';
import coursesController from '../controllers/coursesController';
import filesController from '../controllers/filesController';
import homeController from '../controllers/homeController';
import authorAuth from '../middlewares/authorAuth';
//export {registerRouter,loginRouter,coursesRouter,filesRouter};

let router =(app)=>{
    
    app.get('/',homeController.get);
    app.get('/login',loginController.get);
    app.get('/courses/:page',coursesController.get);
    app.get('/files',filesController.get);
    app.get('/register',registerController.get);

    app.post('/register',registerController.post);
    app.post('/login',loginController.post);
    app.post('/courses', authorAuth, coursesController.post);
    app.post('/courses/modules',authorAuth, coursesController.addModule);

}

export default router;