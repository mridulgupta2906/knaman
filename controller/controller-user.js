const user=require('../model/model-user')
const helper=require('../helper')
const firebase=require('../firebase')


module.exports.getuserdetails=async(req,res)=>{
    let scholarno=req.body.scholarno;
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
        let userid=helper.generateUUID();
        let colname='',coldata='';
        for(let i=0;i<key.length;i++)
        {
            colname=colname+`${key[i]},`;
            coldata=coldata+`'${value[i]}',`
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
        let userid=req.body.userid;
        let str='';
        for(let i=0;i<key.length;i++)
        {
            if(key[i]!=userid)
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
        const result=await user.createusersecondary(Json,scholarno);
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





module.exports.updateuseryeardetails=async(req,res)=>{
    try
    {
        let scholarno=req.body.scholarno;
        let clas=req.body.class;
        let percentage=req.body.percentage;
        let rollno=req.body.rollno;
        let year=req.body.year;

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



module.exports.addreportcardimage=async(req,res)=>{
    let imgbuffer=req.body.imgbuffer;
    let scholarno=req.body.scholarno;
    let clas=req.body.class
    let path=`${clas}/${scholarno}`;
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


module.exports.removesecondrydata=async(req,res)=>{
    try
    {
        let scholarno=req.body.scholarno;
        let clas=req.body.class;
        let result=await user.removesecondrydata(scholarno,clas);
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
        console.log("user controller --> removesecondrydata() error : ",error);
    }
}