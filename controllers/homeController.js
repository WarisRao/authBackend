const homeController ={
    get:_get
}

function _get (req,res){
    return res.send('home page');
}

export default homeController;