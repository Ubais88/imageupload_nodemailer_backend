const File = require('../models/File')
const cloudinary = require('cloudinary').v2;


exports.localFileUpload = async(req,res) => {
    try{
            const file = req.files.file;
            console.log("this is the file ",file)

            let path = __dirname +"/files/"+Date.now() + `.${file.name.split('.')[1]}`;
            console.log("PATH -> ", path)
            file.mv(path, (error) => {
                console.log(error);
            }) 
            res.json({
                success: true,
                message:'local file uploaded successfully'
            })
    }
    catch(error){
        res.json({
            success: false,
            message:error.message
        })
    }
}


function isFileTypeSupported(type , supportedTypes){
    return supportedTypes.includes(type)
}

async function uploadFileToCloudinary(file , folder , quality){
    const options = {folder}
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto"
    return await cloudinary.uploader.upload(file.tempFilePath, options)
}

exports.imageUpload = async(req,res) => {
    try{
        const {name , tags , email} = req.body;
        // console.log(name, tags, email);
        const file = req.files.file;
        console.log(file);

        // validation
        const supportedTypes = ["jpg", "jpeg","png"];
        const fileType = file.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(fileType , supportedTypes)){
            return res.status(400).json({
                success:false,
                message: 'File type not supported'
            })
        }
        console.log("fileType: " + fileType)
        const response = await uploadFileToCloudinary(file , 'FileUpload')
        console.log("secure url : ->",response.secure_url)

        const savedData = await File.create({
            name,
            tags,
            email,
            imgURL:response.secure_url
        })

        res.status(200).json({
            success: true,
            data: savedData,
            message: 'File uploaded successfully'
        })       
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}


exports.imageReducerUpload = async(req , res) => {
    try{
        const {name , email , tags} = req.body;
        const file = req.files.file;

        const supportedTypes = ["jpg", "png", "jpeg"];
        const fileType = file.name.split('.')[1].toLowerCase();
        if(!isFileTypeSupported(fileType , supportedTypes )){
            res.status(401).json({
                success: false,
                data:fileType,
                message:"file type not supported"
            })
        }

        const response = await uploadFileToCloudinary(file , 'FileUpload', 90)
        const savedData = await File.create({
            name,
            tags,
            email,
            imgURL:response.secure_url
        })

        res.status(200).json({
            success: true,
            data: savedData,
            message: 'File uploaded successfully'
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            message:error.message
        })
    }
}


exports.videoupload = async(req , res) => {
    try{
        const {name , email , tags} = req.body;
        const file = req.files.ubaisVideo;
        console.log(name , email , tags)
        const fileType = file.name.split('.')[1].toLowerCase();
        const supportedTypes = ["mp4", "mkv","webm"]
        console.log(fileType)
        if(!isFileTypeSupported(fileType , supportedTypes)){
            res.status(401).json({
                success: false,
                data:fileType,
                message:"file type not supported"
            })
        }

        const response = await uploadFileToCloudinary(file , 'FileUpload')
        console.log(response)
        const savedData = await File.create({
            name,
            tags,
            email,
            imgURL:response.secure_url
        })

        res.status(200).json({
            success: true,
            data: savedData,
            message: 'File uploaded successfully'
        })

    }

    catch(error){
        console.log(error);
        res.status(500).json({
            success: false,
            error:error.message,
            message:"errror while uploading video file"
        })
    }
}