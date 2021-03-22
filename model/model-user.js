const user=require('./model-user')
const dbutil=require('../dbUtil');






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
            // console.log(result.rows[0].secondrydata)

        }
        return result;
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
        } 
        else
        {
            await dbutil.rollback(client)
        }
        return result;
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
        }
        else
        {
            await dbutil.rollback(client);
        }
        return result;
    }
    catch(error)
    {
        console.log("user model --> updateprimary() error : ",error)
        await dbutil.rollback(client);

    }
}





// module.exports.createusersecondary=async(Json,scholarno)=>{
//     let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
//     let data=[];
//     let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
//     let data2=[];
//     let arraytoenter=[];
//     let client=await dbutil.getTransaction();
//     try
//     {
//         let result1=await dbutil.sqlExecSingleRow(client,sqlQuery,data);
//         if(result1.rowCount>0)
//         {
//             let arr=result1.rows[0].secondrydata;
//             console.log("arr : ",arr)
//             if(arr==null){arraytoenter.push(Json)}
//             else
//             {
//                 arraytoenter=arr;
//                 arraytoenter.push(Json);
//             }
//             data2=[arraytoenter];
//             // console.log(data2)
//             let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
//             if(result2.rowCount>0)
//             {
//                 await dbutil.commit(client);
//                 return result2;
//             }
//             else
//             {
//                 await dbutil.rollback(client);
//             }
//         } 
//     }
//     catch(error)
//     {
//         console.log("model-user --> createuser()  catch error || error :",error.message);
//         await dbutil.rollback(client);
//     }
// }





// module.exports.updateuseryeardetails=async(scholarno,clas,year,rollno,percentage)=>{
//     let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
//     let data=[];
//     let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
//     let client=await dbutil.getTransaction();
//     try
//     {
//         let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
//         if(result.rowCount>0)
//         {        
//             let arr=result.rows[0].secondrydata;
//             if(arr!=null)
//             {
//                 for(let i=0;i<arr.length;i++)
//                 {
//                     let Json=arr[i];
//                     if(Json.class==clas)
//                     {
//                         if(year!='null') Json.year=year;
//                         if(rollno!='null') Json.rollno=rollno;
//                         if(percentage!='null') Json.percentage=percentage;
                        
//                         arr[i]=Json;
//                         break;
//                     }
//                 }//for loop closed
//             }//if closed
//             data2=[arr];
//             let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
//             if(result2.rowCount>0)
//             {
//                 await dbutil.commit(client);
//                 return result2;
//             }
//             else
//             {
//                 await dbutil.rollback(client);
//             }
//         }
//     }
//     catch(error)
//     {
//         console.log("error : ",error);
//         await dbutil.rollback(client);
//     }
// }


// module.exports.addreportcardimage=async(imgurl,scholarno,clas)=>{
//     let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
//     let data=[];
//     let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
//     let data2=[];
//     let client=await dbutil.getTransaction();
//     try
//     {
//         let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data);
//         if(result.rowCount>0)
//         {
//             let arr=result.rows[0].secondrydata;
//             for(let i=0;i<arr.length;i++)
//             {
//                 let Json=arr[i];
//                 // console.log(Json.class," ",clas)
//                 if(Json.class==clas) {Json.reportcardurl=imgurl;arr[i]=Json;}//console.log(Json)};
//                 // console.log("i: ",i," arr : ",arr[i])
//             }
//             data2=[arr];
//             let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2)
//             if(result2.rowCount>0)
//             {
//                 await dbutil.commit(client)
//                 return result2;
//             }
//             else
//             {
//                 await dbutil.rollback(client);
//             }
//         }
//     }
//     catch(error)
//     {
//         console.log("user model --> addreportcarimage() error : ",error)
//         await dbutil.rollback(client);

//     }
// }



// module.exports.removesecondrydata=async(scholarno,clas)=>{
//     let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
//     let data=[];
//     let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
//     let data2=[];
//     let client=await dbutil.getTransaction();
//     try
//     {
//         let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
//         if(result.rowCount>0)
//         {
//            let index;
//            let brr=[];
//            let arr=result.rows[0].secondrydata;
//             for(let i=0;i<arr.length;i++)
//             {
//                 let Json=arr[i];
//                 if(Json.class==clas) {index=i;break;}
//             }   
//             for(let j=0;j<arr.length;j++)
//             {
//                 if(j!=index) brr.push(arr[j]);
//             } 
//             data2=[brr];
//             let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
//             if(result2.rowCount>0)
//             {
//                 await dbutil.commit(client);
//                 return result2;
//             }
//             else
//             {
//                 await dbutil.rollback(client);
//             }
//         }
//     }
//     catch(error)
//     {
//         console.log(" user model --> removesecondrydata() error : ",error)
//         await dbutil.rollback(client)
//     }
// }


module.exports.createusersecondary=async(Json,scholarno,clas)=>{
    let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
        let data=[];
        let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
        let data2=[];
        let client=await dbutil.getTransaction();
        try
       {
            let result1=await dbutil.sqlExecSingleRow(client,sqlQuery,data);
            if(result1.rowCount>0)
            {
                let Jsongot=result1.rows[0].secondrydata;
                if(Jsongot!=null)
                {
                    Jsongot[clas]=Json;
                    console.log(Jsongot)
                }//if Jsongot! null
                else
                {
                    let whenJsonnull={
                        [clas]:Json
                    };
                    Jsongot=whenJsonnull;
                }
                data2=[Jsongot];
                let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
                if(result2.rowCount>0)
                {
                    await dbutil.commit(client);
                }//if result2
                else
                {
                    await dbutil.rollback(client);
                }//else result2
                return result2;
            }//if result1
            return result1;
       }
       catch(error)
       {
        console.log("model-user --> createuser()  catch error || error :",error.message);
                await dbutil.rollback(client);
       }
}



module.exports.createusersecondaryforteacher=async(Json,scholarno,year)=>{
    let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
        let data=[];
        let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
        let data2=[];
        let client=await dbutil.getTransaction();
        try
       {
            let result1=await dbutil.sqlExecSingleRow(client,sqlQuery,data);
            if(result1.rowCount>0)
            {
                let Jsongot=result1.rows[0].secondrydata;
                if(Jsongot!=null)
                {
                    Jsongot[year]=Json;
                    // console.log(Jsongot)
                }//if Jsongot! null
                else
                {
                    let whenJsonnull={
                        [year]:Json
                    };
                    Jsongot=whenJsonnull;
                }
                data2=[Jsongot];
                let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
                if(result2.rowCount>0)
                {
                    await dbutil.commit(client);
                }//if result2
                else
                {
                    await dbutil.rollback(client);
                }//else result2
                return result2;
            }//if result1
            return result1;

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
                let Jsongot=result.rows[0].secondrydata;
                if(Jsongot[clas]!=null)
                {
                    if(year!='null') Jsongot[clas].year=year;
                    if(rollno!='null') Jsongot[clas].rollno=rollno;
                    if(percentage!='null') Jsongot[clas].percentage=percentage;
                }
                data2=[Jsongot];
                let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
                if(result2.rowCount>0)
                {
                    await dbutil.commit(client);
                }
                else
                {
                    await dbutil.rollback(client);
                }
                return result2;
            }
            return result;
        }
        catch(error)
        {
            console.log("error : ",error);
            await dbutil.rollback(client);
        }
}



module.exports.updateteacheryeardetails=async(scholarno,year,classes,adminofclass)=>{
    let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}'`;
    let data=[];
    let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {        
            let Jsongot=result.rows[0].secondrydata;
            if(Jsongot[year]!=null)
            {
                if(classes!='null') Jsongot[year].classes=classes;
                if(adminofclass!='null') Jsongot[year].adminofclass=adminofclass;
            }
            data2=[Jsongot];
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
            }
            else
            {
                await dbutil.rollback(client);
            }
            return result2;
        }
        return result;
    }
    catch(error)
    {
        console.log("user model --> updateteacheryeardetails() error : ",error);
        await dbutil.rollback(client);
    }
}





module.exports.addreportcardimage=async(imgurl,scholarno,clas)=>{
        let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}' and role='student'`;
        let data=[];
        let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
        let data2=[];
        let client=await dbutil.getTransaction();
        try
        {
            let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data);
            if(result.rowCount>0)
            {
                let Jsongot=result.rows[0].secondrydata;
                if(Jsongot[clas]!=null)
                {
                    Jsongot[clas].reportcardurl=imgurl;
                }
                data2=[Jsongot];
                let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2)
                if(result2.rowCount>0)
                {
                    await dbutil.commit(client)
                }
                else
                {
                    await dbutil.rollback(client);
                }
                return result2;
            }
            return result;
        }
        catch(error)
        {
            console.log("user model --> addreportcarimage() error : ",error)
            await dbutil.rollback(client);
        }
}          

module.exports.removesecondrydataofstudent=async(scholarno,clas)=>{
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
                let Jsongot=result.rows[0].secondrydata;
                if(Jsongot[clas]!=null) delete Jsongot[clas];
                data2=[Jsongot];
                let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
                if(result2.rowCount>0)
                {
                    await dbutil.commit(client);
                }
                else
                {
                    await dbutil.rollback(client);
                }
                return result2;
            }
            return result;
        }
        catch(error)
        {
            console.log(" user model --> removesecondrydataofstudents() error : ",error)
            await dbutil.rollback(client)
        }
}


module.exports.removesecondrydataofteacher=async(scholarno,year)=>{
    let sqlQuery=`select secondrydata from "user" where scholarno='${scholarno}' and role='master'`;
    let data=[];
    let sqlQuery2=`update "user" set secondrydata=$1 where scholarno='${scholarno}'`;
    let data2=[];
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            let Jsongot=result.rows[0].secondrydata;
            if(Jsongot[year]!=null) delete Jsongot[year];
            data2=[Jsongot];
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
            }
            else
            {
                await dbutil.rollback(client);
            }
            return result2;
        }
        return result;
    }
    catch(error)
    {
        console.log(" user model --> removesecondrydataofteacher() error : ",error)
        await dbutil.rollback(client)
    }
}







module.exports.viewpersonalinfo=async(scholarno)=>{
    let sqlQuery=`select * from "user" where scholarno='${scholarno}'`;
    let data=[];
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            await dbutil.commit(client);
        }
        return result;
    }
    catch(error)
    {
        console.log("model-user --> viewpersonalinfo()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
}




module.exports.logincheck=async(scholarno,password,role)=>{
    let sqlQuery=`select * from "user" where scholarno='${scholarno}' and password='${password}'`;
    let data=[];
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            await dbutil.commit(client);
        }
        return result;
    }
    catch(error)
    {
        console.log("model-user --> viewpersonalinfo()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
}



module.exports.passwordupdate=async(scholarno,oldpassword,newpassword,role)=>{
    let sqlQuery=`select scholarno from "user" where scholarno='${scholarno}' and password='${oldpassword}' and role='${role}'`;
    let data=[];
    let sqlQuery2=`update "user" set password='${newpassword}' where scholarno='${scholarno}'`;
    let data2=[];

    let client=await dbutil.getTransaction();
    try
    {
        let result1=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result1.rowCount>0)
        {
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2)
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
            }
            return result2;
        }
        else
        {
            await dbutil.rollback(client);
            return result1;
        }
    }
    catch(error)
    {
        console.log("model-user --> passwordupdate()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
}


module.exports.addpreviousorgdoc=async(imgurl,scholarno)=>{
    let sqlQuery=`update "user" set previousORGdoc='${imgurl}' where scholarno='${scholarno}'`;
    let data=[];
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            await dbutil.commit(client);

        }
        else
        {
            await dbutil.rollback(client);
        }
        return result;
    }
    catch(error)
    {
        console.log("model-user --> addpreviousorgdoc()  catch error || error :",error.message);
        await dbutil.rollback(client);
    }
}



module.exports.createstudentcashflow=async(Json,scholarno,clas)=>{
    let sqlQuery=`select cashflow from "user" where scholarno='${scholarno}' and role='student'`;
        let data=[];
        let sqlQuery2=`update "user" set cashflow=$1 where scholarno='${scholarno}'`;
        let data2=[];
        let client=await dbutil.getTransaction();
        try
       {
            let result1=await dbutil.sqlExecSingleRow(client,sqlQuery,data);
            if(result1.rowCount>0)
            {
                let Jsongot=result1.rows[0].cashflow;
                if(Jsongot!=null)
                {
                    Jsongot[clas]=Json;
                    // console.log(Jsongot)
                }//if Jsongot! null
                else
                {
                    let whenJsonnull={
                        [clas]:Json
                    };
                    Jsongot=whenJsonnull;
                }
                data2=[Jsongot];
                let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
                if(result2.rowCount>0)
                {
                    await dbutil.commit(client);
                }//if result2
                else
                {
                    await dbutil.rollback(client);
                }//else result2
                return result2;
            }//if result1
            return result1;

        }
       catch(error)
       {
        console.log("model-user --> creatstudentcashflow()  catch error || error :",error.message);
                await dbutil.rollback(client);
       }
}

module.exports.createinstallment=async(Json,newinstallment,clas,scholarno)=>{
    let sqlQuery=`select cashflow from "user" where scholarno='${scholarno}' and role='student'`
    let data=[];
    let sqlQuery2=`update "user" set cashflow=$1 where scholarno='${scholarno}'`
    let data2=[];
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            let Jsongot=result.rows[0].cashflow;
            if(Jsongot!=null)
            {
                Jsongot[clas][newinstallment]=Json;
            }
            console.log(newinstallment)
            console.log(Jsongot)
            data2=[Jsongot];
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2)
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
            }//if result2
            else
            {
                await dbutil.rollback(client);
            }//else result2
            return result2;
        }
        return result;
    }
    catch(error)
    {
        console.log("model-user --> creatinstallment()  catch error || error :",error.message);
                await dbutil.rollback(client);
    }
}

module.exports.removeinstallment=async(scholarno,clas,installment)=>{
    let sqlQuery=`select cashflow from "user" where scholarno='${scholarno}' and role='student'`;
    let data=[];
    let sqlQuery2=`update "user" set cashflow=$1 where scholarno='${scholarno}'`
    let data2=[];
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            let Jsongot=result.rows[0].cashflow;
            if(Jsongot!=null)
            {
                if(Jsongot[clas][installment]!=null) delete Jsongot[clas][installment];
            }
            data2=[Jsongot];
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
            }//if result2
            else
            {
                await dbutil.rollback(client);
            }//else result2

            return result2;
        }
        return result;
    }
    catch(error)
    {
        console.log("model-user --> removeinstallment()  catch error || error :",error.message);
                await dbutil.rollback(client);
    }
}


module.exports.removeyearcashflow=async(scholarno,clas)=>{
    let sqlQuery=`select cashflow from "user" where scholarno='${scholarno}' and role='student'`
    let data=[];
    let sqlQuery2=`update "user" set cashflow=$1 where scholarno='${scholarno}'`
    let data2=[]
    let client=await dbutil.getTransaction();
    try
    {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            let Jsongot=result.rows[0].cashflow;
            if(Jsongot!=null)
            {
                if(Jsongot[clas]!=null) delete Jsongot[clas]
            }
            data2=[Jsongot];
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2);
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
            }//if result2
            else
            {
                await dbutil.rollback(client);
            }//else result2

            return result2;
        }
        return result;
    }
    catch(error)
    {
        console.log("model-user --> removeyearcashflow()  catch error || error :",error.message);
                await dbutil.rollback(client);
    }
}



module.exports.createteachercashflow=async(scholarno,Json,year,month)=>{
     let sqlQuery=`select cashflow from "user" where scholarno='${scholarno}' and role='master'`
     let data=[];
     let sqlQuery2=`update "user" set cashflow=$1 where scholarno='${scholarno}'`
     let data2=[];
     let col=`${month}-${year}`
     let client=await dbutil.getTransaction();
     try
     {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            let Jsongot=result.rows[0].cashflow;
            if(Jsongot!=null) Jsongot[col]=Json;
            else 
            {
                let nullJson={
                    [col]:Json
                }
                Jsongot=nullJson;
            }
            console.log(Jsongot)
            data2=[Jsongot];
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2)
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
            }//if result2
            else
            {
                await dbutil.rollback(client);
            }//else result2
            return result2;
        }
        return result;
     }
     catch(error)
     {
        console.log("model-user --> createteachercashflow()  catch error || error :",error.message);
        await dbutil.rollback(client);
     }
}

module.exports.deleteteachercashflow=async(scholarno,year,month)=>{
     let sqlQuery=`select cashflow from "user" where scholarno='${scholarno}' and role='master'`
     let data=[];
     let sqlQuery2=`update "user" set cashflow=$1 where scholarno='${scholarno}'`
     let data2=[];
     let col=`${month}-${year}`
     let client=await dbutil.getTransaction();
     try
     {
        let result=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result.rowCount>0)
        {
            let Jsongot=result.rows[0].cashflow;
            if(Jsongot!=null)
            {
                if(Jsongot[col]!=null) delete Jsongot[col]
            }
            data2=[Jsongot];
            let result2=await dbutil.sqlExecSingleRow(client,sqlQuery2,data2)
            if(result2.rowCount>0)
            {
                await dbutil.commit(client);
            }//if result2
            else
            {
                await dbutil.rollback(client);
            }//else result2
            return result2;
        }
        return result;
     }
     catch(error)
     {
        console.log("model-user --> deleteteachercashflow()  catch error || error :",error.message);
        await dbutil.rollback(client);
     }
}