const router=require('express').Router();
const user=require('./controller/controller-user')

//check
router.get('/check',(req,res)=>{
    res.send('server ready and running')
})


//User
// router.post('/create',)



module.exports=router;