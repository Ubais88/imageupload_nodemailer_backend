const express = require('express');
const dbConnect = require('./config/database')
const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 4000;
dbConnect();

app.use(express.json());

const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

const cloudinary = require('./config/cloudinary')
cloudinary.cloudinaryConnect();

const router = require('./routes/FileUpload')
app.use('/api/v1', router)

app.listen(PORT , () => {
    console.log('listening on port',PORT);
})

app.get('/', (req, res) => {
    res.send('<h1>WELCOME</h1>')
})



