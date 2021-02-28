const express=require('express')
const app=express();
const bodyparser=require('body-parser')
const route=require('./routes')
const port=process.env.PORT || 3000;

app.use(bodyparser.urlencoded({extended:'true',limit:'50mb'}))
app.use(bodyparser.json({limit:'50mb'}))

app.use('/',route);

app.listen(port,()=>{
    console.log("server started : ",port)
})