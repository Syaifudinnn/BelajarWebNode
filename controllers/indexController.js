import { db } from "../database.js"

export const indexController = (req,res)=>{
    res.render('index')
} 

export const joinController = (req,res)=>{
    res.render('adminLogin')
}

export const homeController = (req,res)=>{
    res.render('adminHome')
}

export const daftarController = (req,res)=>{
    return db.query(`select * from user`, (err,result)=>{
        if (err) throw err
        return res.render('daftarPengguna', {user : result})
    })
}

export const editController = (req,res)=>{
    const id = req.params.id

    return db.query(`select * from user where id = ${id}`, (err,result)=>{
        if (err) throw err
        return res.render('edit', {user : result[0]})
    })
}