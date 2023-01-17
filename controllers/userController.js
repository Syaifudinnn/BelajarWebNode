import Jwt from "jsonwebtoken";
import { db } from "../database.js";

const JWT_Secret = 'inikuncirahasia'

export const userHomeController = (req,res)=>{
    res.render('userHome')
}

export const RegistrasiPageController = (req,res)=>{
    return res.render('userRegistrasi')
}

export const dbRegistrasiController = (req,res)=>{
    const nama = req.body.nama;
    const email = req.body.email;
    const password = req.body.password;

    db.query(`insert into user (nama, email, password) values ("${nama}","${email}","${password}")`)
    res.redirect('/userLogin')
}

export const loginController = (req,res)=>{
    res.render('userLogin')
}

export const dbLoginController = (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    db.query(`select * from user where email = "${email}" and password = "${password}"`, (err, result)=>{
        if(err){
            console.log(err)
            return res.redirect('/userLogin')
        }

        const pengguna = result[0]
        if(!pengguna) return res.redirect('/userLogin') 

        const token = Jwt.sign({
            email : pengguna.email,
            password : pengguna.password
        }, JWT_Secret, {expiresIn: '6h'})

        req.session.penggunaToken = token;
        return res.redirect('/userHome')
    }) 
}

export const logoutController = (req,res)=>{
    req.session.penggunaToken = undefined
    return res.redirect('/index')
}

export const cekuserController = (req,res, next)=>{
    if(!req.session.penggunaToken)
    return res.redirect('/userLogin')

    Jwt.verify(req.session.penggunaToken, JWT_Secret, (err, pengguna)=>{
        if(err){
            console.log(err)
            return res.redirect('/userLogin')
        }
        req.pengguna = pengguna
        next()
    })
}

