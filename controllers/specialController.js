const {User} =require("../models")
const bcrypt = require('bcryptjs')
class SpecialController{
    //method: get
    //link: /login
    //usage: access
    //number: 1
    static getLogin(request,response){
        const {error} = request.query
        response.render('login',{error})
    }
    //method: post
    //link: /login
    //usage: access
    //number: 2
    static postLogin(request,response){
       const {username,password} = request.body

        User.findOne({
            where: {username} 
        })
        .then(user =>{
            if(user){
                const isValidPassword  = bcrypt.compareSync(password, user.password) //compare passwoord true or false

                if (isValidPassword) {  
                    //case berhasil login
                    request.session.userId = user.id  //cara pemanggilan sessions// ngasih jejak ada user login dengan id tersebut
                    return response.redirect('/profile/input')   //kalau valid redirect ke home
                    }else {
                        const error = 'invalid username/password'
                        return response.redirect(`/login?error=${error}`)
                    }
                  }else{
                      const error = 'invalid username/password'
                      return response.redirect(`/login?error=${error}`)
                  }

        })
        .catch(error => {console.log(error);response.send(error);} )
        
    }

    //method: get
    //link: /register
    //usage: create
    //number: 3
    static getRegister(request,response){
        response.render('register')
    }
    //method: post
    //link: /register
    //usage: create
    //number: 4
    static postRegister(request,response){
        //create user,password,email dari body
        const{username,password,email} = request.body
        User.create({username,password,email})
            .then(newUser =>{
                response.redirect('/login')
            })
            .catch(error => response.send(error))
    }
    //method: get
    //link: /login
    //usage: access
    //number: 4A
    static logout(request,response){
        request.session.destroy((error) => {
            if (error) {
                response.send(error);
                
            }else{
                response.redirect('/login')
            }
        })
    }
 
}

module.exports=SpecialController