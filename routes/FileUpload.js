const express = require("express")
const router = express.Router();

const {imageUpload,videoupload,imageReducerUpload,localFileUpload}=require('../controllers/fileUpload')

router.post('/imageUpload' , imageUpload);
router.post('/videoupload' , videoupload);
router.post('/imagereduce' , imageReducerUpload);
router.post('/localupload' , localFileUpload);

module.exports = router;