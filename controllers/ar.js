const multer = require('multer');
const { format } = require('util');

const ARData = require('../models/ar');
const bucket = require('./storage');

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

async function uploadFileToGCS(file) {
    const blob = bucket.file(file.originalname);

    const blobStream = blob.createWriteStream({
        resumable: false,
        contentType: file.mimetype
    });

    return new Promise((resolve, reject) => {
        blobStream.on('error', (err) => reject(err));

        blobStream.on('finish', async() => {
            const publicUrl = format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);

            resolve(publicUrl);
        });

        blobStream.end(file.buffer);
    });
};

async function create(req, res){
    try{
        const { title, description } = req.body;
        const files = req.files;

        const fileUrls = await Promise.all(files.map((file) => uploadFileToGCS(file)));

        const models = new ARData({
            title,
            description,
            files: fileUrls,
        });

        await models.save();

        res.status(201).json({ 
            message: 'Model Data Added.', result: models 
        });
    }catch(err) {
        console.log('Error -', err);
        
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function edit(req, res){
    try{
        const id = req.params.id;
            
        const modelExist = await ARData.findOne({_id: id})

        const files = req.files;

        const fileUrls = await Promise.all(files.map((file) => uploadFileToGCS(file)));

        if(!modelExist){
            res.status(400).json({ message: "Model Data not Found." })
        }

        const updateModel = await ARData.findByIdAndUpdate(id, {"title": req.body.title, "description": req.body.description, "files": fileUrls}, {new : true});
        res.status(201).json({message: 'Model Data Updated.', result: updateModel});
    }catch(err) {
        console.log('Error -', err);
        
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

async function fetch(req, res) {
    try {
        const models = await ARData.find();
        
        if(models.length === 0 ){
            return res.status(404).json({message : "models not Found."})
        }
        
        res.status(200).json({message: `Models List ${models.length}`, length: models.length, result: models});
    } catch (error) {
        res.status(500).json({error : "Internal Server Error."})
    }
};

async function remove(req, res) {
    try {
        const id = req.params.id;
        
        const modelExist = await ARData.findOne({_id: id})
        
        if(!modelExist){
            return res.status(404).json({message: "Model Data Not Found."})
        }
        
        await ARData.findByIdAndDelete(id);
        
        res.status(201).json({message: "Model Data deleted."})
    } catch (error) {
        res.status(500).json({error: "Internal Server Error."})
    }
}

module.exports = { fetch, edit, remove, create, upload };