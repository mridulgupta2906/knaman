const user=require('../model/model-user')
const helper=require('../helper')
const firebase=require('../firebase');
const fs=require('fs')
const Jimp = require("jimp");


// require scholar no and retuns all that student details
module.exports.getuserdetails=async(req,res)=>{
    let scholarno=req.body.scholarno;
    let roletocheck=req.body.roletocheck;
    console.log(roletocheck)
    if(roletocheck!='master' && roletocheck!='headmaster')
    { console.log("here")
        return res.status(200).json({
            status:"error",
            statusCode:400,
            message:"user role not authorised",
            data:[]
        })
    }
    try
    {
        let result=await user.getuserdetails(scholarno);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"user details",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"details not found",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("user controller --> getuserdetails()  error : ",error)
    }
}



module.exports.createuserprimary=async(req,res)=>{
    try
    {
        let key=Object.keys(req.body);
        let value=Object.values(req.body);
        let roletocheck=req.body.roletocheck;
        if(roletocheck!='master' && roletocheck!='headmaster')
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user not created role not authorised",
                data:[]
            })
        }
        let userid=helper.generateUUID();
        let colname='',coldata='';
        for(let i=0;i<key.length;i++)
        {
            if(key[i]=='roletocheck'){}
            else
            {
                colname=colname+`${key[i]},`;
                coldata=coldata+`'${value[i]}',`
            }
        }
        colname=`(${colname}userid)`;
        coldata=`(${coldata}'${userid}')`;

        const result=await user.createuserprimary(colname,coldata);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    message:"user created",
                    data:result
                })
        }
        else
        {
            return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    message:"user not created",
                    data:[]
                })
        }
    }
    catch(error)
    {
        console.log("user controller -->createuserprimary()  error : ",error)
    }
}


module.exports.updateprimary=async(req,res)=>{
    try
    {
        let key=Object.keys(req.body);
        let value=Object.values(req.body);
        let roletocheck=req.body.roletocheck;
        let userid=req.body.userid;
        let str='';
        if(roletocheck!='master' && roletocheck!='headmaster')
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user role not authorised",
                data:[]
            })
        }
        
        for(let i=0;i<key.length;i++)
        {
            if(key[i]!=userid && key[i]!='roletocheck')
            {
                str=str+`${key[i]}='${value[i]}',`
            }
        }
        let newstr=str.substring(0,str.length-1)
        let result=await user.updateprimary(userid,newstr)
        if(result.rowCount>0)
        {
            return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    message:"user created",
                    data:result
                })
        }
        else
        {
            return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    message:"user not created",
                    data:[]
                })
        }
    }
    catch(error)
    {
        console.log("user controller --> updateprimary() : ",error);
    }
}


module.exports.createusersecondary=async(req,res)=>{
    
    try
    {
        let scholarno=req.body.scholarno;
        let roletocheck=req.body.roletocheck;
        let clas=req.body.class;
        let Json={
            year:'',
            class:'',
            percentage:'',
            rollno:'',
            reportcardurl:''
        }
        Json.year=req.body.year
        Json.class=req.body.class
        Json.rollno=req.body.rollno
        Json.percentage=req.body.percentage
        if(roletocheck!='master' && roletocheck!='headmaster')
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user role not authorised",
                data:[]
            })
        }
        const result=await user.createusersecondary(Json,scholarno,clas);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    message:"user created",
                    data:result
                })
        }
        else
        {
            return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    message:"user not created",
                    data:[]
                })
        }
    }
    catch(error)
    {
        console.log("user controller --> createusersecondry()  error : ",error);
    }
}


module.exports.createusersecondaryforteacher=async(req,res)=>{
    
    try
    {
        let scholarno=req.body.scholarno;
        let roletocheck=req.body.roletocheck;
        let year=req.body.year;
        let Json={
            year:'',
            classes:'',
            adminofclass:''
        }
        Json.year=req.body.year
        Json.adminofclass=req.body.adminofclass
        Json.classes=req.body.classes
        if(roletocheck!='master' && roletocheck!='headmaster')
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user role not authorised",
                data:[]
            })
        }
        const result=await user.createusersecondaryforteacher(Json,scholarno,year);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    message:"user created",
                    data:result
                })
        }
        else
        {
            return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    message:"user not created",
                    data:[]
                })
        }
    }
    catch(error)
    {
        console.log("user controller --> createusersecondaryforteacher()  error : ",error);
    }
}





module.exports.updateuseryeardetails=async(req,res)=>{
    try
    {
        let scholarno=req.body.scholarno;
        let roletocheck=req.body.roletocheck;
        let clas=req.body.class;
        let percentage=req.body.percentage;
        let rollno=req.body.rollno;
        let year=req.body.year;
        if(roletocheck!='master' && roletocheck!='headmaster')
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user role not authorised",
                data:[]
            })
        }
        let result=await user.updateuseryeardetails(scholarno,clas,year,rollno,percentage);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"user details",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"details not found",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("user controller --> updateuseryeardetails()  error : ",error)
    }
}


module.exports.updateteacheryeardetails=async(req,res)=>{
    try
    {
        let scholarno=req.body.scholarno;
        let roletocheck=req.body.roletocheck;
        let year=req.body.year;
        let classes=req.body.classes
        let adminofclass=req.body.adminofclass;
        if(roletocheck!='master' && roletocheck!='headmaster')
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user role not authorised",
                data:[]
            })
        }
        let result=await user.updateteacheryeardetails(scholarno,year,classes,adminofclass);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"user details",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"details not found",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("user controller --> updateuseryeardetails()  error : ",error)
    }
}




module.exports.addreportcardimage=async(req,res)=>{

    const imgbuffer = await Buffer.from(req.body.imgbuffer, "base64");
    let scholarno=req.body.scholarno;
    let clas=req.body.class;
    let roletocheck=req.body.roletocheck;
    if(roletocheck!='master' && roletocheck!='headmaster')
    {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user role not authorised",
                data:[]
            })
    }
    let path=`class_${clas}/scholarno_${scholarno}`;
    try
    {
        let imgurl=await firebase.uploadToFirebase(path,imgbuffer)
        let result =await user.addreportcardimage(imgurl,scholarno,clas);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"result url generated",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"url not generated",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("contorller user --> addreportcarimage() error : ",error);
    }
}


module.exports.removesecondrydataofstudent=async(req,res)=>{
    try
    {
        let scholarno=req.body.scholarno;
        let clas=req.body.class;
        let roletocheck=req.body.roletocheck;
        if(roletocheck!='master' && roletocheck!='headmaster')
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user role not authorised",
                data:[]
            })
        }
        let result=await user.removesecondrydataofstudent(scholarno,clas);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"deleted",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"not deleted",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("user controller --> removesecondrydataofstudent() error : ",error);
    }
}



module.exports.removesecondrydataofteacher=async(req,res)=>{
    try
    {
        let scholarno=req.body.scholarno;
        let year=req.body.year;
        let roletocheck=req.body.roletocheck;
        if(roletocheck!='master' && roletocheck!='headmaster')
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user role not authorised",
                data:[]
            })
        }
        let result=await user.removesecondrydataofteacher(scholarno,year);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"deleted",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"not deleted",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("user controller --> removesecondrydataofteacher() error : ",error);
    }
}






module.exports.viewpersonalinfo=async(req,res)=>{
    try
    {
        let scholarno=req.body.scholarno;
        let result=await user.viewpersonalinfo(scholarno);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"info got",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"no info",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("user controller --> viewpersonalinfo() error : ",error);

    }
}



module.exports.logincheck=async(req,res)=>{
    try
    {
        let scholarno=req.body.scholarno;
        let role=req.body.role;
        let password=req.body.password;
        let result=await user.logincheck(scholarno,password,role);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"deleted",
                data:result.rows
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"not deleted",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("user controller --> logincheck() error : ",error);
    }
}



module.exports.passwordupdate=async(req,res)=>{
    try
    {
        let scholarno=req.body.scholarno;
        let oldpassword=req.body.oldpassword;
        let newpassword=req.body.newpassword;
        let role=req.body.role;
        let result=await user.passwordupdate(scholarno,oldpassword,newpassword,role);
        if(result.rowCount>0)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"updated",
                data:result
            })
        }
        else
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"not updated",
                data:[]
            })
        }
    }
    catch(error)
    {
        console.log("user controller --> passwordupdate() error : ",error);

    }
}



module.exports.addpreviousorgdoc=async(req,res)=>{

        const imgbuffer = await Buffer.from(req.body.imgbuffer, "base64");
        let scholarno=req.body.scholarno;
        let roletocheck=req.body.roletocheck;
        if(roletocheck!='master' && roletocheck!='headmaster')
        {
                return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    message:"user role not authorised",
                    data:[]
                })
        }
        let path=`previousORGdoc/scholarno_${scholarno}`;
        try
        {
            let imgurl=await firebase.uploadToFirebase(path,imgbuffer)
            let result =await user.addpreviousorgdoc(imgurl,scholarno);
            if(result.rowCount>0)
            {
                return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    message:"previousorgdoc url generated",
                    data:result.rows
                })
            }
            else
            {
                return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    message:"url not generated",
                    data:[]
                })
            }
        }
        catch(error)
        {
            console.log("contorller user --> addpreviousorgdoc() error : ",error);
        }
}