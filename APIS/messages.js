const exp = require('express')
const messApi = exp.Router();
messApi.use(exp.json())
const expressErrorHandler = require('express-async-handler');

module.exports =messApi;
messApi.post('/create', expressErrorHandler(async (req, res,next)=>{
    let messObj =req.app.get('messObj')
    let user=req.body
    let ans=await messObj.findOne({user1:user.user1,user2:user.user2});
    let ans2=await messObj.findOne({user1:user.user2,user2:user.user1});
    if (ans===null){
        if(ans2===null){
            await messObj.insertOne(user);
            let ans=await messObj.findOne({user1:user.user1,user2:user.user2});
            res.send({ message:"success",latest:ans.message})
        }
        else{
            ans2.message.push(user.message[0])
            let result=await messObj.updateOne({user1:user.user2,user2:user.user1},{$set:{...ans2}})
            let ans=await messObj.findOne({user1:user.user2,user2:user.user1});
            res.send({ message:"success",latest:ans.message})
        }
    }
    else{
        let anss=await messObj.findOne({user1:user.user1,user2:user.user2});
        console.log("kk 1")
        console.log(anss)
        anss.message.push(user.message[0])

        let result=await messObj.updateOne({user1:user.user1,user2:user.user2},{$set:{...anss}})
        console.log("kk")
        let ans=await messObj.findOne({user1:user.user1,user2:user.user2});
        console.log("kk 3")

        res.send({ message:"success",latest:anss.message})

       }
}))






messApi.get('/:user1/:user2', expressErrorHandler(async (req, res)=>{
    let use1=req.params.user1
    let use2=req.params.user2
    let messObj =req.app.get('messObj')
    let ans=await messObj.findOne({user1:use1,user2:use2});
    let ans2=await messObj.findOne({user1:use2,user2:use1});
    if(ans===null){
        if(ans2===null){
            res.send({ message:"empty"})
        }
        else{
        res.send({ message:ans2.message})}
    }
    else {
        let result=ans.message;
        res.send({ message:result})
    }


}))