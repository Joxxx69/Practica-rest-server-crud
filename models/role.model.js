const { Schema,model } = require('mongoose');

const roleSchema = new Schema({
    rol:{
        type:String,
        required:[true,'El rol es obligatorio']
    }
},{timestamps:true});

const Role = model('Role',roleSchema);

module.exports =Role;