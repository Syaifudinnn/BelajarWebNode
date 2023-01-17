//common js

// const express = require("express")
// const app = express();

// app.set("view engine", "ejs")
// app.get("/", function(req,res){
//     res.send("Hello Venrastha")
// })

// app.listen(3000, function(){
//     console.log("app berjalan dengan baik")
// })

//module

import express, { urlencoded } from "express";
import { daftarController, editController, homeController, indexController} from './controllers/indexController.js';
import { deleteController, edittController, submitController} from "./controllers/submitController.js";
import { cekuserController, dbLoginController, dbRegistrasiController, loginController, logoutController, RegistrasiPageController, userHomeController} from "./controllers/userController.js";
import session from "express-session";
import { adminController, cekAdminController, dbadminController } from "./controllers/adminController.js";
import { adminTransaksiController, tambahController, transaksiController} from "./controllers/adminTransaksiController.js";
import { userKelasController, usertransaksiController } from "./controllers/userTransaksiController.js";

const app = express();

app.use(urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.static('views'))
app.use(session({
    secret: 'inikuncirahasia'
}));

app.set("view engine", "ejs")
app.get("/index", indexController);
app.get("/adminHome", cekAdminController, homeController)
app.get("/daftarPengguna", daftarController)
app.post("/submit", submitController);
app.get("/delete/:id", deleteController)
// app.get("/update/:id", updateController)
app.get("/edit/:id", editController)
app.post("/edit/:id", edittController)

app.get("/userHome", cekuserController, userHomeController)
app.get("/userRegistrasi", RegistrasiPageController)
app.post("/userRegistrasi", dbRegistrasiController)
app.get("/userLogin", loginController)
app.post("/userLogin", dbLoginController)
app.get("/userKelas", cekuserController, userKelasController)
app.post("/items/transaksi", usertransaksiController)
app.get("/logout", logoutController)

app.get("/adminLogin", adminController)
app.post("/adminLogin", dbadminController)
app.get('/adminTransaksi', cekAdminController, adminTransaksiController)
app.post('/items/tambah', tambahController)
app.post('/items/transaksii', transaksiController)



app.listen(3000, ()=>{
    console.log("app berjalan dengan baik")
})