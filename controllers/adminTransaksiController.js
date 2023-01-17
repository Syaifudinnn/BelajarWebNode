import { db } from "../database.js"

export const adminTransaksiController = (req,res)=>{
    db.query(`select * from items`, (err,items)=>{
        if(err) console.log(err)

    db.query(`select * from pembukuan order by create_time desc limit 5`, (err,pembukuan)=>{
        if(err) console.log(err)
        res.render("adminTransaksi", {
            pembukuan : pembukuan || [],
            items : items || [],
            })
        })
    })
}

export const tambahController = (req,res)=>{
    const data = req.body
    
    db.query(`insert into items (name, harga, gambar) values (?, ?, ?)`, [data.name, data.harga, data.gambar ], (err,result)=>{
        if(err) console.error(err)
        res.redirect('/adminTransaksi')
    })
}

export const transaksiController = (req,res)=>{
    const data = req.body

    db.query(`insert into pembukuan (type, item_id, amount) values (?,?,?)`, [data.type, data.item_id, data.amount], (err,result)=>{
        if(err) {
            console.error(err)
            res.redirect('/adminTransaksi')
            return
        }

        const qty = data.type === 'keluar' ? data.amount * -1 : data.amount
        db.query(`update items set qty = qty + ? where id = ?`, [qty, data.item_id], (err,result)=>{
            if(err) console.log(err);
            res.redirect('/adminTransaksi')
        });

    })
}
    