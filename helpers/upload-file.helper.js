const path = require('path');
const {v4: uuidv4} = require('uuid');



const uploadFile = (files,folder='',validExtensions = ['png', 'jpg', 'jpeg', 'gif']) => {
    return new Promise((res, rej) => {
        
        const { archive } = files;
        const nameCut = archive.name.split('.');
        const extension = nameCut[nameCut.length - 1];
    
        // Validate extension 
        if (!validExtensions.includes(extension)) {
            return rej(`invalid extension : ${extension} --> valid extensions: ${validExtensions}`);
        }
        const nameTemp = uuidv4() +'.'+extension;
        const uploadPath = path.join(__dirname, '../uploads/',folder, nameTemp);
        
        archive.mv(uploadPath)
        .then(() => res(nameTemp))
        .catch(err=> rej(err));
        
        
    })
}


module.exports = {
    uploadFile
}





