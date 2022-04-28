const { Schema,model } = require('mongoose');

const productoSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required:true
    },
    estado: {
        type: Boolean,
        default: true,
        required:true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required:true
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required:true
    },
    descripcion: {
        type: String,
        required:true
    },
    disponible: {
        type: Boolean,
        default:true
    },
    img: {
        type:String
    }
}, { timestamps: true });


productoSchema.methods.toJSON = function () {
    const { _v, estado, ...data } = this.toObject();
    return data;
}

const Producto = model('Producto', productoSchema);

module.exports = Producto;