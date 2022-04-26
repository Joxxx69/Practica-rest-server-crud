const { SchemaTypes } = require("mongoose");
const { Schema, model } = require("mongoose");
// const {ObjectId} = SchemaTypes;

const categoriaSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        unique: true,
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    }
}, { timestamps: true });


categoriaSchema.methods.toJSON = function () {
    const { __v,estado,...data } = this.toObject();
    return data;
}

const Categoria = model("Categoria", categoriaSchema);
 
module.exports = Categoria;
