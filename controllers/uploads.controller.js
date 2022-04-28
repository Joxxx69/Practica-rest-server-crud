const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const { request, response } = require("express");
const { uploadFile } = require("../helpers/upload-file.helper");
const User = require('../models/user.model');
const Product = require('../models/producto.model');

const chargeArchive = async(req = request, res = response) => {
    
    try {
        const name = await uploadFile(req.files,'products',['txt','md']);
        res.json({name})
    } catch (error) {
        res.status(400).json({msg:error})
    }
    
}

const updateFile = async(req=request, res = response) => {
    const {id, collection} = req.params;
    let model;
    try {
        switch (collection) {
            case 'users':
                model = await User.findById(id);
                if (!model) return res.status(400).json({ msg: `There is not user with the id: ${id}` });
                break;
        
            case 'products':
                model = await Product.findById(id);
                if (!model) return res.status(400).json({ msg: `There is not product with the id: ${id}` });
                break;
            default:
                return res.status(500).json({ msg: 'I forgot to validate this' });
        }
        // Clean previous imgs
        if (model.img) {
            // Delete img from server 
            const pathImage = path.join(__dirname, '../uploads', collection, model.img);
            if (fs.existsSync(pathImage)) {
                fs.unlinkSync(pathImage);
            }
        }
        model.img = await uploadFile(req.files, collection);
        await model.save(); 
        res.json({model});
    } catch (error) {
        res.status(500).json({ msg: error });        
    }

}
const updateFileCloudinary = async(req=request, res = response) => {
    const {id, collection} = req.params;
    let model;
    try {
        switch (collection) {
            case 'users':
                model = await User.findById(id);
                if (!model) return res.status(400).json({ msg: `There is not user with the id: ${id}` });
                break;
        
            case 'products':
                model = await Product.findById(id);
                if (!model) return res.status(400).json({ msg: `There is not product with the id: ${id}` });
                break;
            default:
                return res.status(500).json({ msg: 'I forgot to validate this' });
        }
        // Clean previous imgs
        if (model.img) {
            const nameArray = model.img.split('/');
            const name = nameArray[nameArray.length - 1];
            const [public_id] = name.split('.');
            await cloudinary.uploader.destroy(public_id);
        }
        const { tempFilePath } = req.files.archive;
        const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
        model.img = secure_url;
        await model.save(); 
        res.json({model});
    } catch (error) {
        res.status(500).json({ msg: error });        
    }

}

const showImage = async(req = request, res = response) => {
    const { id, collection } = req.params;
    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) return res.status(400).json({ msg: `There is not user with the id: ${id}` });
            break;
    
        case 'products':
            model = await Product.findById(id);
            if (!model) return res.status(400).json({ msg: `There is not product with the id: ${id}` });
            break;
        default:
            return res.status(500).json({ msg: 'I forgot to validate this' });
    }
    // Clean previous imgs
    if (model.img) {
        console.log(model.img);
        // Delete img from server 
        const pathImage = path.join(__dirname, '../uploads', collection, model.img);
        if (fs.existsSync(pathImage)) {
            return res.sendFile(pathImage);
        }
    }
    const pathNoImage = path.join(__dirname, '../assets/reptar.jpg');
    res.sendFile(pathNoImage);

}


module.exports = {
    chargeArchive,
    updateFile,
    showImage,
    updateFileCloudinary
}
