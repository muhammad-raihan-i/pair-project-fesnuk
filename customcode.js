let myText=`
get /login getLogin access
post /login postLogin access

get /register getRegister create
post /register postRegister create

get /home getHome read

get /profile/me getMyProfile read
get /profile/me/edit getEditMyProfile update
post /profile/me/edit postEditMyProfile update
get /profile/:userId getReadOthersProfile read (bisa baca punya orang lain)

get /account/:userId getEditAccount update
post /account/:userId postEditAccount update

get /post/add getAddPost create
post /post/add postAddPost create
get /post/:id/edit getEditPost update
post /post/:id/edit postEditPost update
get /post/:id/delete getDeletePost delete`

function splitArray(text){
    let text2=text.split("\n")
    let text2a=[]
    text2.forEach(e=>{if(e){text2a.push(e)}})
    text2=text2a
    text2=text2.map(e=>{return e.split(" ")})
    return text2
}
function makeRouter(aoaos){//array of array of string
    let result=`const express=require("express")\nconst router=express()\nconst Controller=require("../controllers/controller.js")\n\n`
    for(let i=0;i<aoaos.length;i++){
        let aos=aoaos[i]
        //app.get("/make/add",Controller.getAdd)
        let temp=`router.${aos[0]}("${aos[1]}",Controller.${aos[2]}) //${aos[3]} (${i+1})\n`
        result+=temp
    }
    result+=`\nmodule.exports=router`
    return result
}
function makeController(aoaos){
    let result=`
const Model=require("../model")
class Controller{`
    for(let i=0;i<aoaos.length;i++){
        let aos=aoaos[i]
        let method=aos[0]
        let sub=``
        if(method=="get"){
            sub=`           //let {params,query}=request 
            let content=await ModelName.findAll()`
        }
        if(method=="post"){
            sub=`       let {params,query}=request
            await ModelName.create()`
        }
        let temp=`
    //method: ${aos[0]}
    //link: ${aos[1]}
    //usage: ${aos[3]}
    //number: ${i+1}
    static async ${aos[2]}(request,response){
        try{ 
${sub}
        }catch(error){
            response.send(error)
        }
    }`
        result+=temp
    }
    result+=`
}

module.exports=Controller`
    return result
}


console.log(makeRouter(splitArray(myText)))
//console.log("---------")
//console.log(makeController(splitArray(myText)))