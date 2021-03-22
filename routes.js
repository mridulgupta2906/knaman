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
router.post('/getstudentsfeesspreadsheeturl',spreadsheet.getstudentsfeesspreadsheeturl)
router.post('/getteacherssalaryspreadsheeturl',spreadsheet.getteacherssalaryspreadsheeturl)


router.post('/createstudentcashflow',user.createstudentcashflow)
router.post('/createinstallment',user.createinstallment)
router.post('/removeinstallment',user.removeinstallment);
router.post('/removeyearcashflow',user.removeyearcashflow)


/// can be used for create first time or create a particular month data and can also be used for update as it replaces previous data
router.post('/createteachercashflow',user.createteachercashflow)  
router.post('/deleteteachercashflow',user.deleteteachercashflow)

module.exports=router;