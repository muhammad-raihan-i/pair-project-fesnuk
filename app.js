const express = require('express')
const app=express()
const session = require('express-session')
const port=3000
const router=require("./routes/router")

app.set("view engine","ejs")
app.use(express.urlencoded({extended:false}))


app.use(session({
  secret: 'rahasia',  //untuk mengamankan session
  resave: false, //menyimpan data jika hanya ada perubahan agar tida banyak memory atau proses
  saveUninitialized: false, //untuk login pasti pilih false
  cookie: { 
    secure: false,
    sameSite: true //untuk security dari csrf attack
  } //https  
}));

app.use('/',router)


app.listen(port, () => {
  console.log(`FESNUK`)
})