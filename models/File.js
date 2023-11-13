const mongoose = require('mongoose')
const nodemailer = require('nodemailer')

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imgURL:{
        type:String,

    },
    tags:{
        type:String,
    },
    email:{
        type:String,
    }
})

// post middleware
fileSchema.post('save', async function(doc){
    try{
        console.log("DOC", doc)

        // transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });

        // send mail notification
        let info = await transporter.sendMail({
            from: `Mohd Ubais`,
            to: doc.email,
            subject: 'New File is uploaded successfully',
            html: `<h1>Hello ${doc.name}</h1> <br><p>File Uploaded</p>
            <a href=${doc.imgURL}><b>Watch image</b></a>`
        })

        console.log("info ->",info);
    }
    catch(error){
        console.log(error)
    }
})


module.exports = mongoose.model('File', fileSchema)