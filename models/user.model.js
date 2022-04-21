const {Schema,model} = require('mongoose');


const userSchema = new Schema({
    nombre:{
        type:String,
        required:[true,'name is required']
    },
    correo:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'password is required'],
        minlength:[6,'tiene que ser de minimo 6 caracteres']
    },
    img:{
        type:String
    },
    rol:{
        type:String,
        required:true,
        enum:['ADMIN_ROLE', 'USER_ROLE','VENTAS_ROLE']   // puedo comentar el enum, ya que valido con una coleccion.
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }

},{timestamps:true});


userSchema.methods.toJSON = function(){
    const {__v,password,_id,...usuario}= this.toObject();
    usuario.uid = _id;
    return usuario;

}



// const User = model('User',userSchema);
module.exports = model('Users',userSchema);