const {User,Post,Tag,PostTag,Profile}=require("../models")
const {Op} = require('sequelize')
class GeneralController{

    //method: get
    //link: /
    //usage: read
    //number: 4b
    static async getAddMyProfile(request,response){
        try{
            const{error}=request.query
            let UserId=request.session.userId
            let data=(await Profile.findAll({where:{UserId}}))[0]
            if(!data){
                response.render("inputProfile",{error})
            }else{
                response.redirect("/")
            }
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
            let UserId=request.session.userId
            let {phoneNumber,dateOfBirth,name,nickName,profilePicUrl,bio}=request.body
            await Profile.create({phoneNumber,dateOfBirth,name,nickName,profilePicUrl,bio,UserId})
            response.redirect("/")
        }catch(error){
            if(error.name==="SequelizeValidationError"){
                error=error.errors.map(el => el.message)
            }
            response.redirect(`/profile/input?error=${error}`)
        }
    }

    //method: get
    //link: /home
    //usage: read
    //number: 5
    static async getHome(request,response){
        try{
            
            const{search,content} = request.query
            let UserId=request.session.userId
            let myProfile=(await Profile.findAll({where:{UserId}}))[0]
            let posts=await Post.findAll({
                include:{
                    model : PostTag,
                    include: {
                        model : Tag
                    }
                }
            })
            let profiles=await Post.findAll({
                include:{
                    model : User,
                    include: {
                        model : Profile
                    }
                }
            })

            if(search){
             posts=await Post.findPostByContent(search)

            }
            response.render("home",{posts,profiles,myProfile,content})
        }catch(error){
            console.log(error);
            
            response.send(error)
        }
    }
    //method: get
    //link: /profile/me
    //usage: read
    //number: 6
    static async getMyProfile(request,response){
        try{

            let UserId=request.session.userId
            let profile=await Profile.findAll({
                where:{
                    UserId:UserId
                }
            })
            profile=profile[0]
            let user=await User.findByPk(UserId)
            let myProfile=profile
            response.render("profile",{profile,user,myProfile})
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
            let UserId=request.session.userId
            let profile=(await Profile.findAll({where:{UserId}}))[0]
            let myProfile=profile
            response.render("editProfile",{profile,myProfile})
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
            let UserId=request.session.userId
            let {phoneNumber,dateOfBirth,name,nickName,profilePicUrl,bio}=request.body
            await Profile.update(
                {phoneNumber,dateOfBirth,name,nickName,profilePicUrl,bio},
                {where:{UserId:UserId}})
            response.redirect("/profile/me")
        }catch(error){
            if(error.name==="SequelizeValidationError"){
                error=error.errors
            }
            response.send(error)
        }
    }
    //method: get
    //link: /post/add
    //usage: create
    //number: 12
    static async getAddPost(request,response){
        try{
            const{content} = request.query
            let UserId=request.session.userId
            let myProfile=(await Profile.findAll({where:{UserId}}))[0]
            response.render("addPost",{myProfile,content})
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
            let UserId=request.session.userId
            let {content,image}=request.body
            let newPost=await Post.create({content,image,UserId})
            let postId=newPost.id
            await PostTag.create({PostId:postId,TagId:1})
            response.redirect("/")
        }catch(error){
            if(error.name==="SequelizeValidationError"){
                error=error.errors
            }
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
            const {id} = request.params
            console.log(id, 'ini id')
            let data = await Post.findByPk(id)
            await data.destroy()
            response.redirect(`/?content=post dengan id ${id} sudah terhapus`)
        }catch(error){
            response.send(error)
        }
    }
}

module.exports=GeneralController