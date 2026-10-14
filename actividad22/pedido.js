// ===========================================================================
//ejercicio parta manejo de errores - Rompe el pedido aparoposito - Referencia
// ===========================================================================

// PASO 1 Nuestro error, con codigo HTTP - - -

export class AppError extends Error{
    constructor(mensaje, codigo=400){
        super(mensaje);
        this.name ="AppError",
        this.codigo = codigo;
    }
}

// PASO 2  ----Datos de prueba
const productos = [
    {id:"p-01", nombre:"Molletes", precio:30, diponible:true},
    {id:"p-02", nombre:"Jugo de naranja", precio:18, diponible:false}, //agotado
    {id:"p-03", nombre:"Gelatina", precio:12, diponible:true}
];

const HORA_CORTE = 13;

// Paso 3 ----- Las cinco guardas

export function crearPedido({productoId, cantidad, hora}){
    if(!productoId){
        throw new AppError("Falta indicar el producto", 400);
    }
    if(!Number.isInteger(cantidad) || cantidad <= 0){
        throw new AppError("La cantidad debe ser un numero entero mayor a cero")
    }
    if(hora>HORA_CORTE){
        throw new AppError("Ya cerro  el horario de los pedidos", 409)

    }


// Hay que ir a buscar
const producto =  productos.find((p) => p.id == productoId)
if(!producto){
    throw new AppError("Producto no encontrado", 408);

}
if(!producto.diponible){
    throw new AppError("El producto esta agotado", 409)
}

// Creando return para leer facil
return{
    folio:"PR-" + Math.floor(Math.random() * 10000),
    producto: producto.nombre,
    cantidad,
    total: producto.precio * cantidad
}; 
}


