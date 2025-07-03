const Model=require("../model")
class SpecialController{
    //method: get
    //link: /login
    //usage: access
    //number: 1
    static async getLogin(request,response){
        try{
           //let {params,query}=request
            let content=await ModelName.findAll()
        }catch(error){
            response.send(error)
        }
    }
    //method: post
    //link: /login
    //usage: access
    //number: 2
    static async postLogin(request,response){
        try{
       let {params,query}=request
            await ModelName.create()
        }catch(error){
            response.send(error)
        }
    }
    //method: get
    //link: /register
    //usage: create
    //number: 3
    static async getRegister(request,response){
        try{
           //let {params,query}=request
            let content=await ModelName.findAll()
        }catch(error){
            response.send(error)
        }
    }
    //method: post
    //link: /register
    //usage: create
    //number: 4
    static async postRegister(request,response){
        try{
       let {params,query}=request
            await ModelName.create()
        }catch(error){
            response.send(error)
        }
    }
}

module.exports=SpecialController