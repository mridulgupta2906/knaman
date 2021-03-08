const spreadsheet=require('../model/model-spreadsheet')
const helper=require('../helper')
const { GoogleSpreadsheet } = require('google-spreadsheet');


module.exports.getspreadsheeturl=async(req,res)=>{
    
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
        else if(key[i]!='sheetname' && key[i]!='googlespreadsheeturl')
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
            return spreadsheeturlJson;
        }
    }

}