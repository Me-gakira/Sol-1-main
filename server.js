const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const {ApolloServer, gql} = require('apollo-server-express');
const Usuario = require('./models/usuario');
const Perfil = require('./models/perfil');
const Producto = require('./models/producto');
const Categoria = require('./models/categoria');
const Precio = require('./models/precio');
const Pedido = require('./models/pedido');
const Estado = require('./models/estado');
const MetodoPago = require('./models/metodoPago');
const Carro = require('./models/carro');
const ItemCarro = require('./models/itemCarro');
const usuario = require("./models/usuario");
const producto = require("./models/producto");
const precio = require("./models/precio");
const categoria = require("./models/categoria");
const pedido = require("./models/pedido");
const carro = require("./models/carro");
const metodoPago = require("./models/metodoPago");
const estado = require("./models/estado");
const estado = require("./models/estado");

mongoose.connect('mongodb://localhost:27017/DWMSol1');
const typeDefs = gql`
type Perfil{
    id: ID!
    nombre: String!
}
input PerfilInput{
    nombre: String!
}
type Usuario{
    id: ID!
    nombre: String!
    correo: String!
    pass: String!
    perfil: Perfil
}
input UsuarioInput{
    nombre: String!
    correo: String!
    pass: String!
    perfil: String
}
type Carro{
    id: ID!
    fecha: timestamp!
    usuario: Usuario
    sesionkey: String!
    subtotal: int!
}
input CarroInput{
    fecha: timestamp!
    usuario: String
    sesionkey: String!
    subtotal: int!
}
type ItemCarro{
    id: ID!
    carro: Carro
    producto: Producto
    cantidad: int!
}
input ItemCarroInput{
    carro: String
    producto: String
    cantidad: int!
}
type Producto{
    id: ID!
    nombre: String!
    descripcion: String!
    precio: Precio
    categoria: Categoria
}
input ProductoInput{
    nombre: String!
    descripcion: String!
    precio: String
    categoria: String
}
type Precio{
    id: ID!
    fecha: timestamp!
    precio: int!
    producto: Producto
}
input PrecioInput{
    fecha: timestamp!
    precio: int!
    producto: String
}
type Categoria{
    id: ID!
    nombre: String!
    descripcion: String!
    esAlergeno: bool!
}
input CategoriaInput{
    nombre: String!
    descripcion: String!
    esAlergeno: bool!
}
type Pedido{
    id: ID!
    estado: Estado
    direccion: String!
    carro: Carro
    metodoPago: MetodoPago
    total: int!
    fechaPedido: timestamp!
}
input PedidoInput{
    estado: String
    direccion: String!
    carro: String
    usuario: String
    metodoPago: String
    total: int!
    fechaPedido: timestamp!
}
type Estado{
    id: ID!
    fecha: timestamp!
    estado: String!
    pedido: Pedido
}
input EstadoInput{
    fecha: timestamp!
    estado: String!
    pedido: String
}
type MetodoPago{
    id: ID!
    infoTarjeta: String
    infoCuenta: String
    pass: String!
}
input MetodoPagoInput{
    infoTarjeta: String
    infoCuenta: String
    pass: String!
}
type Response{
    status: String
    message: String
}
type Query{
    getUsuarios: [Usuario]
    getUsuariosPerfil(perfil: Perfil!): [Usuario]
    getUsuarioById(id: ID!): Usuario
    getUsuarioByIdPerfil(id: ID!): Usuario
    getPerfiles: [Perfil]
    getPerfilById(id: ID!): Response
    getProductos: [Producto]
    getProductoByID(id: ID!): Producto
    getCategorias: [Categoria]
    getCategoriaByID(id: ID!): Categoria
    getPedidos: [Pedido]
    getPedidoByID(id: ID!): Pedido
    getCarros: [Carro]
    getCarroByID(id: ID!): Carro
    getItemCarro: [ItemCarro]
    getItemCarroByID(id: ID!): ItemCarro
    getItemCarroByCarro(carro: Carro!): [ItemCarro]
    getPrecios: [Precio]
    getPreciosByID(id: ID!): Precio
    getPreciosByProducto(producto: Producto!): [Precios]
    getEstados: [Estado]
    getEstadoByID(id: ID!): Estado
    getEstadoByPedido(pedido: Pedido!): Estado
    getMetodoPagos: [MetodoPago]
    getMetodoPagoByID(id: ID!): MetodoPago
    getMetodoPagoByPedido(pedido: Pedido!): MetodoPago
}
type Mutation{
    addUsuario(input: UsuarioInput): Usuario
    updUsuario(id: ID!, input: UsuarioInput): Usuario
    delUsuario(id: ID!): Response
    addCarro(input: CarroInput): Carro
    updCarro(id: ID!, input: CarroInput): Carro
    delCarro(id: ID!): Response
    addItemCarro(input: ItemCarroInput): ItemCarro
    updItemCarro(id: ID!, input: ItemCarroInput): ItemCarro
    delItemCarro(id: ID!): Response
    addProducto(input: ProductoInput): Producto
    updProducto(id: ID!, input: ProductoInput): Producto
    delProducto(id: ID!): Response
    addPrecio(input: PrecioInput): Precio
    updPrecio(id: ID!, input: PrecioInput): Precio
    delPrecio(id: ID!): Response
    addCategoria(input: CategoriaInput): Categoria
    updCategoria(id: ID!, input: CategoriaInput): Categoria
    delCategoria(id: ID!): Response
    addPedido(input: PedidoInput): Pedido
    updPedido(id: ID!, input: PedidoInput): Pedido
    delPedido(id: ID!): Response
    addEstado(input: EstadoInput): Estado
    updEstado(id: iD!, input: EstadoInput): Estado
    delEstado(id:ID!): Response
    addPerfil(input: PerfilInput): Perfil
    updPerfil(id: ID!, input: PerfilInput): Perfil
    delPerfil(id: ID!): Response
    addMetodoPago(input: MetodoPagoInput): MetodoPago
    updMetodoPago(id: ID!, input: MetodoPagoInput): MetodoPago
    delMetodoPago(id; ID!): Response
}
`;

const resolvers = {
    Query: {
        async getUsuarios(obj){
            const usuarios = await Usuario.find();
            return usuarios;
        },
        async getUsuarioByID(obj,{id}){
            const usuarioBus = await Usuario.findById(id);
            if (usuarioBus == null){
                return null;
            } else {
                return usuarioBus;
            }
        },
        async getPerfiles(obj){
            const perfiles = await Perfil.find();
            return perfiles;
        },
        async getPerfilByID(obj,{id}){
            const perfilBus = await Perfil.findById(id);
            if (perfilBus == null){
                return null;
            } else {
                return perfilBus;
            }
        },
        async getProductos(obj){
            const productos = await Producto.find();
            return productos;
        },
        async getProductoByID(obj,{id}){
            const productoBus = await Producto.findById(id);
            if (productoBus == null){
                return null;
            } else {
                return productoBus;
            }
        },
        async getCategorias(obj){
            const categorias = await Categoria.find();
            return categorias;
        },
        async getCategoriaByID(obj,{id}){
            const categoriaBus = await Categoria.findById(id);
            if (categoriaBus == null){
                return null;
            } else {
                return categoriaBus;
            }
        },
        async getPedidos(obj){
            const pedidos = await Pedido.find();
            return pedidos;
        },
        async getPedidoByID(obj,{id}){
            const pedidoBus = await Pedido.findById(id);
            if (pedidoBus == null){
                return null;
            } else {
                return pedidoBus;
            }
        },
        async getCarros(obj){
            const carros = await Carros.find();
            return carros;
        },
        async getCarroByID(obj,{id}){
            const carroBus = await Carro.findById(id);
            if (carroBus == null){
                return null;
            } else {
                return carroBus;
            }
        },
        async getItemCarros(obj){
            const itemCarros = await ItemCarro.find();
            return itemCarros;
        },
        async getItemCarroByID(obj,{id}){
            const itemCarroBus = await ItemCarro.findById(id);
            if (itemCarroBus == null){
                return null;
            } else {
                return itemCarroBus;
            }
        },
        async getPrecios(obj){
            const precios = await Precio.find();
            return precios;
        },
        async getPrecioByID(obj,{id}){
            const precioBus = await Precio.findById(id);
            if (precioBus == null){
                return null;
            } else {
                return precioBus;
            }
        },
        async getEstados(obj){
            const estados = await Estado.find();
            return estados;
        },
        async getEstadoByID(obj,{id}){
            const estadoBus = await Estado.findById(id);
            if (estadoBus == null){
                return null;
            } else {
                return estadoBus;
            }
        },
//        async getEstadoByPedido(obj, {pedido}){
 //           const estadoBus = await Estado.
   //         if (estadoBus == null){
     //           return null;
       //     } else {
         //       return estadoBus;
           // }
        //},
        async getMetodoPagos(obj){
            const metodoPagos = await MetodoPago.find();
            return metodoPagos;
        },
        async getMetodoPagoByID(obj,{id}){
            const mteodoPagoBus = await MetodoPago.findById(id);
            if (metodoPagoBus == null){
                return null;
            } else {
                return metodoPagoBus;
            }
        }
    },
    Mutation: {
        async addUsuario(obj, {input}){
            // { nombre: String, pass: String, perfil: String} Input
            const nombre = input.nombre;
            const pass = input.pass;
            const perfilId = input.perfil;
            const perfilObj = await Perfil.findById(perfilId);
            if (perfilObj == null){
                return null;
            } else {
                //{ nombre: String, pass: String, perfil: Perfil} Type
                const usuario = new Usuario({nombre: nombre, pass: pass, perfil: perfilObj});
                await usuario.save();
                return usuario;
            }
        },
        async updUsuario(obj, {id, input}){
            const nombre = input.nombre;
            const pass = input.pass;
            const perfilId = input.perfil;
            const perfilObj = await Perfil.findById(perfilId);
            if (perfilObj == null){
                return null;
            } else {
                const usuario = await Usuario.findByIdAndUpdate(id, {nombre: nombre, pass: pass, perfil: perfilObj});
                return usuario;
            }
        },
        async delUsuario(obj, {id}){
            await Usuario.deleteOne({_id: id});
            return{
                status: "200",
                message: "Usuario Eliminado"
            }
        },
        async addCarro(obj, {input}){
            const fecha = input.fecha;
            const usuarioID = input.usuario;
            const usuarioObj = await Usuario.findById(usuarioObj);
            const sesionkey = input.sesionkey;
            const subtotal = input.subtotal;
            if (usuarioObj == null){
                return null;
            } else {
                const carro = new Carro({fecha: fecha, usuario: usuarioObj, sesionkey: sesionkey, subtotal: subtotal});
                await carro.save();
                return carro;
            }
        },
        async updCarro(obj, {id, input}){
            const fecha = input.fecha;
            const usuarioID = input.usuario;
            const usuarioObj = await Usuario.findById(usuarioObj);
            const sesionkey = input.sesionkey;
            const subtotal = input.subtotal;
            if (usuarioObj == null){
                return null;
            } else {
                const carro = await Carro.findByIdAndUpdate(id, {fecha: fecha, usuario: usuarioObj, sesionkey: sesionkey, subtotal: subtotal});
                return carro;
            }
        },
        async delCarro(obj, {id}){
            await Carro.deleteOne({_id: id});
            return{
                status: "202",
                message: "Carro Eliminado"
            }
        },
        async addItemCarro(obj, {input}){
            const carroID = input.carro;
            const carroObj = await Carro.findById(carroID);
            const productoID = input.producto;
            const productoObj = await Producto.findById(productoID);
            const cantidad = input.cantidad;
            if (carroObj == null || productoObj == null){
                return null;
            } else {
                const itemcarro = new ItemCarro({carro: carroObj, producto: productoObj, cantidad: cantidad});
                await itemcarro.save();
                return itemcarro;
            }
        },
        async updItemCarro(obj, {id, input}){
            const carroID = input.carro;
            const carroObj = await Carro.findById(carroID);
            const productoID = input.producto;
            const productoObj = await Producto.findById(productoID);
            const cantidad = input.cantidad;
            if (carroObj == null || productoObj == null){
                return null;
            } else {
                const itemcarro = await ItemCarro.findByIdAndUpdate(id, {carro: carroObj, producto: productoObj, cantidad: cantidad});
                return itemcarro;
            }
        },
        async delItemCarro(obj, {id}){
           await ItemCarro.deleteOne({_id: id});
            return{
                status: "203",
                message: "ItemCarro Eliminado"
            }
        },
        async addProducto(obj, {input}){
            const nombre = input.nombre;
            const descripcion = input.descripcion;
            const precioID = input.precio;
            const precioObj = await Precio.findById(precioID);
            const categoriaID = input.categoria;
            const categoriaObj = await Producto.findById(categoriaID);
            if (precioObj == null || categoriaObj == null){
                return null;
            } else {
                const producto = new Producto({nombre: nombre, descripcion: descripcion, precio: precioObj, categoria: categoriaObj});
                await producto.save();
                return producto;
            }
        },
        async updProducto(obj, {id, input}){
            const nombre = input.nombre;
            const descripcion = input.descripcion;
            const precioID = input.precio;
            const precioObj = await Precio.findById(precioID);
            const categoriaID = input.categoria;
            const categoriaObj = await Producto.findById(categoriaID);
            if (precioObj == null || categoriaObj == null){
                return null;
            } else {
                const producto = await Producto.findByIdAndUpdate(id, {nombre: nombre, descripcion: descripcion, precio: precioObj, categoria: categoriaObj});
                return producto;
            }
        },
        async delProducto(obj, {id}){
            await Producto.deleteOne({_id: id});
            return{
                status: "204",
                message: "Producto Eliminado"
            }
        },
        async addPrecio(obj, {input}){
            const fecha = input.fecha;
            const precio = input.precio;
            const productoID = input.producto;
            const productoObj = await Producto.findById(productoID);
            if (productoObj == null){
                return null;
            } else {
                const precio = new Precio({fecha: fecha, precio: precio, producto: productoObj});
                await precio.save();
                return precio;
            }
        },
        async updPrecio(obj, {id, input}){
            const fecha = input.fecha;
            const precio = input.precio;
            const productoID = input.producto;
            const productoObj = await Producto.findById(productoID);
            if (productoObj == null){
                return null;
            } else {
                const precio = await Precio.findByIdAndUpdate(id, {fecha: fecha, precio: precio, producto: productoObj});
                return precio;
            }
        },
        async delPrecio(obj, {id}){
            await Precio.deleteOne({_id: id});
            return{
                status: "205",
                message: "Precio Eliminado"
            }
        },
        async addCategoria(obj, {input}){
            const categoria = new Categoria(input);
            await categoria.save();
            return categoria;
        },
        async updCategoria(obj, {id, input}){
            const categoria = await Categoria.findByIdAndUpdate(id, input);
            return categoria;
        },
        async delCategoria(obj, {id}){
            await Categoria.deleteOne({_id: id});
            return{
                status: "206",
                message: "Categoria Eliminada"
            }
        },
        async addPedido(obj, {input}){
            const estadoID = input.estado;
            const estadoObj = await Estado.findById(estadoID);
            const direccion = input.direccion;
            const carroID = input.carro;
            const carroObj = await Carro.findById(carroID);
            const metodoPagoID = input.metodoPago;
            const metodoPagoObj = await MetodoPago.findById(metodoPagoID);
            const total = input.total;
            const fechaPedido = input.fechaPedido;
            if (estadoObj == null || carroObj == null || metodoPagoObj == null){
                return null;
            } else {
                const pedido = new Pedido({estado: estadoObj, direccion: direccion, carro: carroObj, metodoPago: metodoPagoObj, total: total, fechaPedido: fechaPedido});
                await pedido.save();
                return pedido;
            }
        },
        async updPedido(obj, {id, input}){
            const estadoID = input.estado;
            const estadoObj = await Estado.findById(estadoID);
            const direccion = input.direccion;
            const carroID = input.carro;
            const carroObj = await Carro.findById(carroID);
            const metodoPagoID = input.metodoPago;
            const metodoPagoObj = await MetodoPago.findById(metodoPagoID);
            const total = input.total;
            const fechaPedido = input.fechaPedido;
            if (estadoObj == null || carroObj == null || metodoPagoObj == null){
                return null;
            } else {
                const pedido = await Pedido.findByIdAndUpdate(id, {estado: estadoObj, direccion: direccion, carro: carroObj, metodoPago: metodoPagoObj, total: total, fechaPedido: fechaPedido});
                return pedido;
            }
        },
        async delPedido(obj, {id}){
            await Pedido.deleteOne({_id: id});
            return{
                status: "207",
                message: "Pedido Eliminado"
            }
        },
        async addEstado(obj, {input}){
            const fecha = input.fecha;
            const estado = input.estado;
            const pedidoID = input.pedido;
            const pedidoObj = await Pedido.findById(pedidoID);
            if (pedidoObj == null){
                return null;
            } else {
                const estado = new Estado({fecha: fecha, estado: estado, pedido: pedidoObj});
                await estado.save();
                return estado;
            }
        },
        async updEstado(obj, {id, input}){
            const fecha = input.fecha;
            const estado = input.estado;
            const pedidoID = input.pedido;
            const pedidoObj = await Pedido.findById(pedidoID);
            if (pedidoObj == null){
                return null;
            } else {
                const estado = await Estado.findByIdAndUpdate(id, {fecha: fecha, estado: estado, pedido: pedidoObj});
                return estado;
            }
        },
        async delEstado(obj, {id}){
            await Estado.deleteOne({_id: id});
            return{
                status: "208",
                message: "Estado Eliminado"
            }
        },
        async addMetodoPago(obj, {input}){
            const MetodoPago = new MetodoPago(input);
            await MetodoPago.save();
            return MetodoPago;
        },
        async updMetodoPago(obj, {id, input}){
            const MetodoPago = await MetodoPago.findByIdAndUpdate(id, input);
            return MetodoPago;
        },
        async delMetodoPago(obj, {id}){
            await MetodoPago.deleteOne({_id: id});
            return{
                status: "209",
                message: "MetodoPago Eliminado"
            }
        },
        async addPerfil(obj, {input}){
            const perfil = new Perfil(input);
            await perfil.save();
            return perfil;
        },
        async updPerfil(obj, {id, input}){
            const perfil = await Perfil.findByIdAndUpdate(id, input);
            return perfil;
        },
        async delPerfil(obj, {id}){
            await Perfil.deleteOne({_id: id});
            return{
                status: "201",
                message: "Perfil Eliminado"
            }
        },
    }
}

let apolloServer = null;

const corsOptions = {
    origin: "http://localhost:8159",
    credentials: false
};

async function startServer(){
    apolloServer = new ApolloServer({typeDefs, resolvers, corsOptions});
    await apolloServer.start();
    apolloServer.applyMiddleware({app, cors:false});
}

startServer();

const app = express();
app.use(cors());
app.listen(8159, function(){
    console.log("Servidor Iniciado en puerto: 8159");
})