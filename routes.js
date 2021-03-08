const router=require('express').Router();
const user=require('./controller/controller-user')
const spreadsheet=require('./controller/controller-spreadsheet')

//check
router.get('/check',(req,res)=>{
    res.send('server ready and running')
})


//User
router.post('/getuserdetails',user.getuserdetails)

router.post('/createuserprimary',user.createuserprimary)
router.post('/updateprimary',user.updateprimary)

router.post('/createusersecondary',user.createusersecondary)
router.post('/updateuseryeardetails',user.updateuseryeardetails)
router.post('/addreportcardimage',user.addreportcardimage)
router.post('/removesecondrydata',user.removesecondrydata)


// google spreadsheet approach
router.post('/spreadsheetlink',spreadsheet.getspreadsheeturl)

module.exports=router;