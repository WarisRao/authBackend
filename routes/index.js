import registerController from '../controllers/registerController';
import loginController from '../controllers/loginController';
import coursesController from '../controllers/coursesController';
import filesController from '../controllers/filesController';
import homeController from '../controllers/homeController';

//export {registerRouter,loginRouter,coursesRouter,filesRouter};

let router =(app)=>{
    
    app.get('/',homeController.get);
    app.get('/login',loginController.get);
    app.get('/courses',coursesController.get);
    app.get('/files',filesController.get);
    app.get('/register',registerController.get);

    app.post('/register',registerController.post);
    app.post('/login',loginController.post);

}

export default router;