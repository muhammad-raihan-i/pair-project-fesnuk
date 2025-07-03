const {User,Post,Tag,PostTag,Profile}=require("../models")
class GeneralController{

    //method: get
    //link: /
    //usage: read
    //number: 4b
    static async getAddMyProfile(request,response){
        try{
            //let {params,query}=request
            //let posts=await Post.findAll()
            response.render("inputProfile")
        }catch(error){
            response.send(error)
        }
    }
    //method: get
    //link: /
    //usage: read
    //number: 4c
    static async postAddMyProfile(request,response){
        try{
            //{phoneNumber,dateOfBirth,name,nickName,profilePicUrl,bio}
            let abc=request.body
            //response.send(abc)
            response.redirect("/")
        }catch(error){
            response.send(error)

        }
    }

    //method: get
    //link: /home
    //usage: read
    //number: 5
    static async getHome(request,response){
        try{
            let posts=await Post.findAll(
                {
                include:{
                    model : PostTag,
                    include: {
                        model : Tag
                    }
                }
                }
            )
            response.send(posts)
            // response.render("home",{posts})
        }catch(error){
            response.send(error)
        }
    }
    //method: get
    //link: /profile/me
    //usage: read
    //number: 6
    static async getMyProfile(request,response){
        try{
           //let {params,query}=request
            let content=await ModelName.findAll()
        }catch(error){
            response.send(error)
        }
    }
    //method: get
    //link: /profile/me/edit
    //usage: update
    //number: 7
    static async getEditMyProfile(request,response){
        try{
           //let {params,query}=request
            let content=await ModelName.findAll()
        }catch(error){
            response.send(error)
        }
    }
    //method: post
    //link: /profile/me/edit
    //usage: update
    //number: 8
    static async postEditMyProfile(request,response){
        try{
       let {params,query}=request
            await ModelName.create()
        }catch(error){
            response.send(error)
        }
    }
    //method: get
    //link: /profile/:userId
    //usage: read
    //number: 9
    static async getReadOthersProfile(request,response){
        try{
           //let {params,query}=request
            let content=await ModelName.findAll()
        }catch(error){
            response.send(error)
        }
    }
    //method: get
    //link: /account/:userId
    //usage: update
    //number: 10
    static async getEditAccount(request,response){
        try{
           //let {params,query}=request
            let content=await ModelName.findAll()
        }catch(error){
            response.send(error)
        }
    }
    //method: post
    //link: /account/:userId
    //usage: update
    //number: 11
    static async postEditAccount(request,response){
        try{
       let {params,query}=request
            await ModelName.create()
        }catch(error){
            response.send(error)
        }
    }
    //method: get
    //link: /post/add
    //usage: create
    //number: 12
    static async getAddPost(request,response){
        try{
           //let {params,query}=request
            let content=await ModelName.findAll()
        }catch(error){
            response.send(error)
        }
    }
    //method: post
    //link: /post/add
    //usage: create
    //number: 13
    static async postAddPost(request,response){
        try{
       let {params,query}=request
            await ModelName.create()
        }catch(error){
            response.send(error)
        }
    }
    //method: get
    //link: /post/:id/edit
    //usage: update
    //number: 14
    static async getEditPost(request,response){
        try{
           //let {params,query}=request
            let content=await ModelName.findAll()
        }catch(error){
            response.send(error)
        }
    }
    //method: post
    //link: /post/:id/edit
    //usage: update
    //number: 15
    static async postEditPost(request,response){
        try{
       let {params,query}=request
            await ModelName.create()
        }catch(error){
            response.send(error)
        }
    }
    //method: get
    //link: /post/:id/delete
    //usage: delete
    //number: 16
    static async getDeletePost(request,response){
        try{
           //let {params,query}=request
            let content=await ModelName.findAll()
        }catch(error){
            response.send(error)
        }
    }
}

module.exports=GeneralController