const express=require("express")
const router=express.Router()
const SpecialController=require("../controllers/specialController.js")// (1-4)
const GeneralController=require("../controllers/generalController.js")// (5-16)


router.get('/register',SpecialController.getRegister)
router.post('/register',SpecialController.postRegister)
router.get('/login',SpecialController.getLogin)
router.post('/login',SpecialController.postLogin)


const isLoggedIn = function (req, res, next) {  //untuk setealah login
  console.log(req.session);
  if (!req.session.userId) {
    const error = 'Login first'
    res.redirect(`/login?error=${error}`)
  }else{
    next()
  }
  
//   console.log('Time:', Date.now())
//   next() //untuk proses selanjutnya, di console kelular tetapi di localhost gakeluar atau buffering
}

router.use(isLoggedIn)


router.get("/profile/input",GeneralController.getAddMyProfile) //create (4b)
router.post("/profile/input",GeneralController.postAddMyProfile) //create (4c)
router.get("/",GeneralController.getHome) //read (5)
router.get("/profile/me",GeneralController.getMyProfile) //read (6)
// router.get("/profile/:userId",GeneralController.getReadOthersProfile) //read (9)
router.get("/post/add",GeneralController.getAddPost) //create (12)
router.post("/post/add",GeneralController.postAddPost) //create (13)
// router.get("/post/:id/delete",GeneralController.getDeletePost) //delete (16)
router.get('/logout', SpecialController.logout)//logout 17

module.exports=router