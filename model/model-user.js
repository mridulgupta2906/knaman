const user=require('./model-user')
const dbutil=require('../dbUtil')




module.exports.getuserdetails=async(scholarno)=>{
    let sqlQuery=`select * from "user" where scholarno='${scholarno}'`;
    let data=[]
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            await dbutil.commit(client);
            console.log(result.rows[0].secondrydata)

            return result;
        }
    }
    catch(error)
    {
        console.log("model-user --> getuserdetails()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
}






module.exports.createuserprimary=async(colname,coldata)=>{
    let sqlQuery=`insert into "user" ${colname} values ${coldata}`;
    let data=[];
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data);
        if(result.rowCount>0)
        {
            await dbutil.commit(client);
            return result;
        } 
        else
        {
            await dbutil.rollback(client)
        }
    }
    catch(error)
    {
        console.log("model-user --> createuser()  catch error || error :",error.message);
        await dbutil.rollback(client);

    }
}



module.exports.updateprimary=async(userid,newstr)=>{
    let sqlQuery=`update "user" set ${newstr} where userid='${userid}'`
    let data=[];
    console.log(sqlQuery)
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            await dbutil.commit(client);
            return result;
        }
        else
        {
            await dbutil.rollback(client);
        }
    }
    catch(error)
    {
        console.log("user model --> updateprimary() error : ",error)
        await dbutil.rollback(client);

    }
}





module.exports.createusersecondary=async(Json,scholarno)=>{
    let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
    let data=[];
    let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
    let data2=[];
    let arraytoenter=[];
    let client=await dbutil.getTransaction();
    try
    {
        let result1=await dbutil.sqlExecSingleRow(client,sqlQuery,data);
        if(result1.rowCount>0)
        {
            let arr=result1.rows[0].secondrydata;
            console.log("arr : ",arr)
            if(arr==null){arraytoenter.push(Json)}
            else
            {
                arraytoenter=arr;
                arraytoenter.push(Json);
            }
            data2=[arraytoenter];
            console.log(data2)
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
                return result2;
            }
            else
            {
                await dbutil.rollback(client);
            }
        } 
    }
    catch(error)
    {
        console.log("model-user --> createuser()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
}





module.exports.updateuseryeardetails=async(scholarno,clas,year,rollno,percentage)=>{
    let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
    let data=[];
    let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {        
            let arr=result.rows[0].secondrydata;
            if(arr!=null)
            {
                for(let i=0;i<arr.length;i++)
                {
                    let Json=arr[i];
                    if(Json.class==clas)
                    {
                        if(year!='null') Json.year=year;
                        if(rollno!='null') Json.rollno=rollno;
                        if(percentage!='null') Json.percentage=percentage;
                        
                        arr[i]=Json;
                        break;
                    }
                }//for loop closed
            }//if closed
            data2=[arr];
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
                return result2;
            }
            else
            {
                await dbutil.rollback(client);
            }
        }
    }
    catch(error)
    {
        console.log("error : ",error);
        await dbutil.rollback(client);
    }
}


module.exports.addreportcardimage=async(imgurl,scholarno,clas)=>{
    let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
    let data=[];
    let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
    let data2=[];
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data);
        if(result.rowCount>0)
        {
            let arr=result.rows[0].secondrydata;
            for(let i=0;i<arr.length;i++)
            {
                let Json=arr[i];
                if(Json.class==clas) Json.reportcardurl=imgurl;

                arr[i]=Json;
                break;
            }
            data2=[arr];
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2)
            if(result2.rowCount>0)
            {
                await dbutil.commit(client)
                return result2;
            }
            else
            {
                await dbutil.rollback(client);
            }
        }
    }
    catch(error)
    {
        console.log("user model --> addreportcarimage() error : ",error)
        await dbutil.rollback(client);

    }
}



module.exports.removesecondrydata=async(scholarno,clas)=>{
    let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
    let data=[];
    let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
    let data2=[];
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
           let index;
           let brr=[];
           let arr=result.rows[0].secondrydata;
            for(let i=0;i<arr.length;i++)
            {
                let Json=arr[i];
                if(Json.class==clas) {index=i;break;}
            }   
            for(let j=0;j<arr.length;j++)
            {
                if(j!=index) brr.push(arr[j]);
            } 
            data2=[brr];
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
                return result2;
            }
            else
            {
                await dbutil.rollback(client);
            }
        }
    }
    catch(error)
    {
        console.log(" user model --> removesecondrydata() error : ",error)
        await dbutil.rollback(client)
    }
}