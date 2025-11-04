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