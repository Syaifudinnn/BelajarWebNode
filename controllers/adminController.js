import jwt from "jsonwebtoken";
import { db } from "../database.js";

const JWT_Secret = 'rahacia'

export const adminController = (req, res) => {
    return res.render('adminLogin') 
}

export const dbadminController = (req, res) => {
    const email = req.body.email
    const password = req.body.password

    db.query(`select * from form where email = '${email}' and password = '${password}'`, (err, result) => {
        if (err) {
            console.log(err)
            return res.redirect('/adminLogin')
        }

        const admin = result[0]
        console.log(admin)
        if (!admin) return res.redirect('/adminLogin')

        const token = jwt.sign({
            email: admin.email,
            password: admin.password
        }, JWT_Secret, { expiresIn: '1h' })

        req.session.adminToken = token;
        return res.redirect('/adminHome')
    })
}

export const adminFormController = (req, res) => {
    return db.query(`select * from form`, (err, result) => {
        if (err) throw err
        return res.render('adminLogin', { user: result })
    })
}

export const logoutController = (req, res) => {
    req.session.adminToken = undefined
    return res.redirect('/index')
}

export const cekAdminController = (req, res, next) => {
    if (!req.session.adminToken) return res.redirect('/adminLogin')

    jwt.verify(req.session.adminToken, JWT_Secret, (err, admin) => {
        if (err) {
            console.log(err)
            return res.redirect('/adminLogin')
        }
        req.admin = admin
        next()
    })
}