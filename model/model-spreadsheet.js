const dbutil=require('../dbUtil')
const { GoogleSpreadsheet } = require('google-spreadsheet');


module.exports.getspreadsheetdata=async(clas,year,finalstr)=>{
    let sqlQuery=`select ${finalstr} from "user" where secondrydata->'${clas}'->>'class'=$1 and secondrydata->'${clas}'->>'year'=$2`;
    let data=[clas,year];
    console.log("sqlQuery : ",sqlQuery)
    let client =await dbutil.getTransaction();
    try
    {
        let result1=await dbutil.sqlExecSingleRow(client,sqlQuery,data)
        if(result1.rowCount>0)
        {
            await dbutil.commit(client);
            return result1;
        }
    }
    catch(error)
    {
        console.log("model spreadsheet ---> getspreadsheetdata() error : ",error)
        await dbutil.rollback(client)
    }
}


module.exports.getspreadsheeturl=async(result,sheetname,googlespreadsheeturl)=>{
    let colname=Object.keys(result.rows[0]);
    let title=sheetname;
    console.log("colname : ",colname)
    
    const doc= new GoogleSpreadsheet(`${googlespreadsheeturl}`);
    await doc.useServiceAccountAuth({
        client_email:"rdschool-spreadsheet-account@rdschool-307009.iam.gserviceaccount.com",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQDexR3sD8/iXyDj\nwfGbMezMRSmn5ZQt+qiYt/F2uMDGwrF8VY5fPC++XMV1/VE293XiU9mfI0iz+nJv\njz70lwgA7ewGbnJftsNvEERT860m7KwXOLqL9gnDbUx4W61GYkz+L3gvCJZ4Qrlk\nR9jgrPNYaDeAgd5HqNTo7I4hDdmWaOXPm4xHoaosfCUP2YRNldhIwghXOMB4vKTN\ni/tjEuK2rH02n6F2gBOC1nTpECerGjiRhw+micmWHPohFMSX08URzY6AFVYLYf0S\nV41XM/z2jNTU7tF4Ct0TcjBvB4ZbYCq5HjnlqHuVNKy8yiHFqynYkAYjYU9qyCgW\nF5OpNnh3AgMBAAECgf9GSxXEvldGEedeSM9fqUet+hCB71C5CIMBwhNqPxVNtw0h\nSC/c8bVmsxzO+ouCI7ytqPC1vDQvoLOkYWsvUicQimkyQizAd6iZ4xyiLcw9Gs1w\nIACowv9RsGPH6KreFP2xYF2v6lKa3X1axglcigM1Lx4W5H13mhEuZC7baDaXi7gu\nJV8HsJvUTJfTfsI/gw18XD/7QwWLKbiwoD4e/JQoXr1uAPZki19HZdjSIQFJs6Kf\nEytbSfk8yBfpSyR1g5WPPcjsTjN4Gw6CNUNxMYI3Kvfu/gyCVomBObLbyQ8o59f8\nRYwRgOF52piTXfgOKHuZOe/x86Y4IBzxA7imDbECgYEA7wBvNEBuYo1g5mp1Hern\nQserVqlP9fMAS6KKvYNVMNLAxeRtAEQ0enLx5KuKIQsbDMg7SJusd3HNJ8+FIVUu\nuWfDVp/koidDWlfFNw2QF/HVNMfUvfQrMUT/hBWdXZwHHpiEiTK6xb0GRrvVYj7m\nxJ2I5nDwrzNweRu6SyauuWcCgYEA7p0lx3diD0cLM5nEaHeAL5fdaQmmOuGwOfFu\nOAVMDTXISwB8jtOk4zViGsw1o5GmrgbO0UYhzfhXA0WfkQelu4Gl3t+WSoD4BHtd\nX/Pk9CN3+hzRXo3+M4/Ri5F+s7pTRMF6h6CT3nlg8HaVV/PjdWdNjfIL/i1IDXVt\noImVDnECgYEAvicMUvhIWuS9CdX9ZFY2tO0DpymCUt6Jh6PE2s8ZAoVLlqcNCj85\nuYqmZhcNCQk69kqA0F37M/U5EsmK1GBfkme6BLumPlUaw1A9unVyBXsE9L9gxdj0\nXHjXCpHf6FBxYahbGoVgEF86FSDwvv/ovtnPx/hnph05CUJET/Jw5VUCgYAiZjVU\nFDnmye8reTd/d/ra4aHhyqpUQsUNFWk2Wk0kemRtq5xJWumid8e05Uu2UQEehYy7\nTskA0JR6vEbMubWC2qX3A3S/OOiIfOBxPM/9AkABprXoU8AZ3tnurQL/FhV7DAmG\nE/g9UnJPOEk/bMGV41ai6AoikpSYnB05z5vVgQKBgA7pGX804BQg7YKl39FB2TY+\n2RJKnKFx+VkbYQjkXCj1eIfNQu8mYO4P1mx4ufXQbeznuhclLj1hzMzYuC47X4w5\nTybolOSTjn02xJs26SnPqECIBQC5x5iwjAfEGnIbThFuCfqfLLpZUvN0S2BggOa/\nWDLh4JyqR791otEZSTCa\n-----END PRIVATE KEY-----\n",
    });
    await doc.loadInfo();
    const sheet = await doc.addSheet({ title:`${title}`,headerValues:colname});
        const insert =await sheet.addRows(result.rows).then((x)=>{
            rownumber=x['_rowNumber'];
        });
    let spreadsheeturl=`https://docs.google.com/spreadsheets/d/${googlespreadsheeturl}/edit#gid`;
    // if(rownumber)
    return spreadsheeturl;
}