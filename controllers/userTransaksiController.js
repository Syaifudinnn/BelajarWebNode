import { db } from "../database.js"

// export const userKelasController = (req,res)=>{
//     res.render('userKelas')
// }

export const userKelasController = (req,res)=>{
    db.query(`select * from items`, (err,items)=>{
        if(err) console.log(err)

    db.query(`select * from pembukuan order by create_time desc limit 5`, (err,pembukuan)=>{
        if(err) console.log(err)
        res.render("userKelas", {
            pembukuan : pembukuan || [],
            items : items || [],
            })
        })
    })
}

export const usertambahController = (req,res)=>{
    const data = req.body
    
    db.query(`insert into items (name) values (?)`, [data.name], (err,result)=>{
        if(err) console.error(err)
        res.redirect('/userKelas')
    })
}

export const usertransaksiController = (req,res)=>{
    const data = req.body

    db.query(`insert into pembukuan (nama, type, item_id, amount) values (?,?,?,?)`, [data.nama ,data.type, data.item_id, data.amount], (err,result)=>{
        if(err) {
            console.error(err)
            res.redirect('/userKelas')
            return
        }

        const qty = data.type === 'keluar' ? data.amount * -1 : data.amount
        db.query(`update items set qty = qty + ? where id = ?`, [qty, data.item_id], (err,result)=>{
            if(err) console.log(err);
            return res.redirect('/userHome')
        });

    })
}
    