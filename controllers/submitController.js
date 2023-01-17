import { db } from "../database.js";


export const submitController = (req,res)=>{

    const nama = req.body.name;
    const email = req.body.email;
    const password = req.body.pw;

    db.query(`insert into form (nama, email, password) values ('${nama}','${email}','${password}')`)

    res.redirect('/adminHome')

}

export const deleteController = (req,res)=>{
    const id = req.params.id
    db.query(`delete from user where id = ${id}`)

    res.redirect('/daftarPengguna')
}

// export const updateController = (req, res) => {
//     const id = req.params.id

//     db.query(`update form set tipe ="aktif" where id = %(id)`)
//     res.redirect('/')
// }

export const edittController = (req,res)=>{
    const id = req.params.id
    const data = req.body
    console.log(data);

    db.query(`update user set nama = "${data.name}", email = "${data.email}", password = "${data.password}" where id = ${id}`)

    res.redirect('/daftarPengguna')
}