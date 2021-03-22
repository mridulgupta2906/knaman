const spreadsheet=require('../model/model-spreadsheet')
const helper=require('../helper')
const { GoogleSpreadsheet } = require('google-spreadsheet');


module.exports.getstudentsspreadsheeturl=async(req,res)=>{
    
    let roletocheck=req.body.roletocheck;
    if(roletocheck!='operator' && roletocheck!='headmaster')
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user role not authorised",
                data:[]
            })
        }
    let clas=req.body.class;
    let year=req.body.year;
    let sheetname=req.body.sheetname;
    let googlespreadsheeturl=req.body.googlespreadsheeturl || '1NLsPf8Mvhch-HGEKV4it2pkJRJTwQ74RvxCTq0ZsspM';

    let secdata='',primedata='',finalstr='';
    let key=Object.keys(req.body);
    for(let i=0;i<key.length;i++)
    {
        if(key[i]=='class' || key[i]=='year' || key[i]=='reportcardurl' || key[i]=='rollno' || key[i]=='percentage')
        {
            primedata=primedata+`secondrydata->'${clas}'->>'${key[i]}' as ${key[i]},`
        }
        else if(key[i]!='sheetname' && key[i]!='googlespreadsheeturl' && key[i]!='roletocheck')
        {
            secdata=secdata+`${key[i]},`;
        }
    }
    if(primedata=='') finalstr=secdata.substring(0,secdata.length-1);
    else finalstr=secdata+primedata.substring(0,primedata.length-1);
    
    let result=await spreadsheet.getstudentspreadsheetdata(clas,year,finalstr);
    if(result.rows.length>0)
    {
        let spreadsheeturlJson=await spreadsheet.getspreadsheeturl(result,sheetname,googlespreadsheeturl);
        if(spreadsheeturlJson!=null)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"user created",
                data:spreadsheeturlJson
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




module.exports.getteachersspreadsheeturl=async(req,res)=>{
    
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
    let year=req.body.year;
    let sheetname=req.body.sheetname;
    let googlespreadsheeturl=req.body.googlespreadsheeturl || '1plqw8u1j9iYaDXD70PdTLEdc4tQ3aMOq_DpKQKjifqQ';

    let secdata='',primedata='',finalstr='';
    let key=Object.keys(req.body);
    for(let i=0;i<key.length;i++)
    {
        if(key[i]=='classes' || key[i]=='year' || key[i]=='adminofclass')
        {
            primedata=primedata+`secondrydata->'${year}'->>'${key[i]}' as ${key[i]},`
        }
        else if(key[i]!='sheetname' && key[i]!='googlespreadsheeturl' && key[i]!='roletocheck')
        {
            secdata=secdata+`${key[i]},`;
        }
    }
    if(primedata=='') finalstr=secdata.substring(0,secdata.length-1);
    else finalstr=secdata+primedata.substring(0,primedata.length-1);
    
    let result=await spreadsheet.getteacherspreadsheetdata(year,finalstr);
    if(result.rows.length>0)
    {
        let spreadsheeturlJson=await spreadsheet.getspreadsheeturl(result,sheetname,googlespreadsheeturl);
        if(spreadsheeturlJson!=null)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"user created",
                data:spreadsheeturlJson
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




module.exports.getstudentsfeesspreadsheeturl=async(req,res)=>{
    
    let roletocheck=req.body.roletocheck;
    if(roletocheck!='operator' && roletocheck!='headmaster')
        {
            return res.status(200).json({
                status:"error",
                statusCode:400,
                message:"user role not authorised",
                data:[]
            })
        }
    let clas=req.body.class;
    let year=req.body.year;
    let noofinstallments=req.body.noofinstallments;
    let sheetname=req.body.sheetname;
    let googlespreadsheeturl=req.body.googlespreadsheeturl || '1pf0zh62uE-E_6lmb7CMUkeLv0kzV_e_hM-PE4Sq92w4';

    let secdata='';
    let key=Object.keys(req.body);
    for(let i=0;i<key.length;i++)
    {
        if(key[i]=='amount' || key[i]=='date' || key[i]=='recieptno'){}
        // else if(key[i]=='class' || key[i]=='year' || key[i]=='reportcardurl' || key[i]=='rollno' || key[i]=='percentage')
        // {
        //     primedata=primedata+`secondrydata->'${clas}'->>'${key[i]}' as ${key[i]},`
        // }
        else if(key[i]!='sheetname' && key[i]!='googlespreadsheeturl' && key[i]!='roletocheck' && key[i]!='class' && key[i]!='year' && key[i]!='noofinstallments')
        {
            secdata=secdata+`${key[i]},`;
        }
    }
    
    let result=await spreadsheet.getstudentsfeespreadsheetdata(clas,year,secdata,noofinstallments);
    if(result.rows.length>0)
    {
        let spreadsheeturlJson=await spreadsheet.getspreadsheeturl(result,sheetname,googlespreadsheeturl);
        if(spreadsheeturlJson!=null)
        {
            return res.status(200).json({
                status:"success",
                statusCode:200,
                message:"user created",
                data:spreadsheeturlJson
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




module.exports.getteacherssalaryspreadsheeturl=async(req,res)=>{
    try
    {
        let roletocheck=req.body.roletocheck;
        if(roletocheck!='headmaster')
            {
                return res.status(200).json({
                    status:"error",
                    statusCode:400,
                    message:"user role not authorised",
                    data:[]
                })
            }
        let year=req.body.year;
        let month=req.body.month;
        let sheetname=req.body.sheetname;
        let googlespreadsheeturl=req.body.googlespreadsheeturl || '1xQDOvVkK23JaqYm6rpjwTDD75XjUrMEQjelrLiMa6Fw';

        let secdata='';
        let key=Object.keys(req.body);
        for(let i=0;i<key.length;i++)
        {
            if(key[i]=='amount' || key[i]=='date' || key[i]=='year'){}
            // else if(key[i]=='class' || key[i]=='year' || key[i]=='reportcardurl' || key[i]=='rollno' || key[i]=='percentage')
            // {
            //     primedata=primedata+`secondrydata->'${clas}'->>'${key[i]}' as ${key[i]},`
            // }
            else if(key[i]!='sheetname' && key[i]!='googlespreadsheeturl' && key[i]!='roletocheck' && key[i]!='month')
            {
                secdata=secdata+`${key[i]},`;
            }
        }
        
        let result=await spreadsheet.getteacherssalaryspreadsheeturl(month,year,secdata);
        if(result.rows.length>0)
        {
            let spreadsheeturlJson=await spreadsheet.getspreadsheeturl(result,sheetname,googlespreadsheeturl);
            if(spreadsheeturlJson!=null)
            {
                return res.status(200).json({
                    status:"success",
                    statusCode:200,
                    message:"user created",
                    data:spreadsheeturlJson
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
        console.log("controller  : getteacherssalaryspreadsheeturl()  error : ",error)
    }
}