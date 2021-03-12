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
router.post('/createusersecondryforteacher',user.createusersecondaryforteacher)

router.post('/updateuseryeardetails',user.updateuseryeardetails)
router.post('/addpreviousorgdoc',user.addpreviousorgdoc)
router.post('/updateteacheryeardetails',user.updateteacheryeardetails)

router.post('/addreportcardimage',user.addreportcardimage)

router.post('/removesecondrydataofstudent',user.removesecondrydataofstudent)
router.post('/removesecondrydataofteacher',user.removesecondrydataofteacher)


router.post('/viewpersonalinfo',user.viewpersonalinfo) // does not require roletocheck

router.post('/login',user.logincheck)

router.post('/passwordupdate',user.passwordupdate)

// google spreadsheet approach
router.post('/getstudentsspreadsheeturl',spreadsheet.getstudentsspreadsheeturl)
router.post('/getteachersspreadsheeturl',spreadsheet.getteachersspreadsheeturl)

module.exports=router;