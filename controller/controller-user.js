const user=require('../model/model-user')



module.exports.createuser=async(req,res)=>{
    const result=await user.createuser();
}