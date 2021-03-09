const spreadsheet=require('../model/model-spreadsheet')
const helper=require('../helper')
const { GoogleSpreadsheet } = require('google-spreadsheet');


module.exports.getspreadsheeturl=async(req,res)=>{
    
    let roletocheck=req.body.roletocheck;
    if(roletocheck!='master' || roletocheck!='headmaster')
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
    
    let result=await spreadsheet.getspreadsheetdata(clas,year,finalstr);
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

}