const CLIENTE_VENTA_KEY = "clienteVenta";
const PRODUCTOS_VENTA_KEY = "productosVenta";
const EVENTO_ALTER_PROD = "alter.prod";
const INICIAR_VENTA_KEY = "";

const eventoAltertacionProdcutos = new Event(EVENTO_ALTER_PROD);

class ProductoVenta {
    idProducto;
    cantidad;
    precio = 0;

    constructor(idProducto, cantidad, precio){
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}


(() => document.addEventListener('DOMContentLoaded', main))();


async function main() {
    if(ventaExistente()){
        console.log(ventaExistente());
    } 
    const tablaProductosVenta = document.querySelector("#tablaProductosVenta");


    tablaProductosVenta.addEventListener(EVENTO_ALTER_PROD, () => {
        console.log(getItemLocalStorage(PRODUCTOS_VENTA_KEY));
    });

    const btnCancelarVenta = document.querySelector("#cancelarVenta");

    btnCancelarVenta.addEventListener("click", () => {
        quitarClienteVenta();
        removerProductoDeVenta();
    });

    const buscarClienteModal = document.querySelector('#buscarCliente');
    const formBuscarCliente = document.querySelector("#formBuscarCliente");
    const tablaClientesEncontrados = document.querySelector('#clientesEncontrados');


    buscarClienteModal.addEventListener("hide.bs.modal", () => {
        tablaClientesEncontrados.innerHTML = "";
        formBuscarCliente.reset();
    });

    formBuscarCliente.addEventListener("submit", function (e) {
        e.preventDefault();
        let { buscarClienteNombre } = Object.fromEntries(new FormData(this));
        buscarCliente(buscarClienteNombre).then(res => {
            tablaClientesEncontrados.innerHTML = "";
            let clientes = res.data;
            clientes.forEach((cliente) => {
                const tr = crearElemento('tr');
                const tdNombre = crearElemento('td');
                const tdButton = crearElemento('td');
                const button = crearElemento('button');

                button.classList.add('btn', 'btn-sm', 'btn-success')
                button.textContent = 'agregar';

                button.addEventListener('click', function () {
                    bootstrap.Modal.getInstance(buscarClienteModal).hide();
                    agregarClienteAVenta(cliente);
                });

                tdButton.append(button);
                tdNombre.textContent = cliente.nombre;

                tr.append(tdNombre);
                tr.append(tdButton);
                tablaClientesEncontrados.append(tr);
            });
        });
    });


    const buscarProductoModal = document.querySelector("#buscarProducto");
    const formBuscarProducto = document.querySelector("#formBuscarProducto");
    const tablaProductosEncontrados = document.querySelector("#productosEncontrados");

    buscarProductoModal.addEventListener("hide.bs.modal", () => {
        formBuscarProducto.reset();
        tablaProductosEncontrados.innerHTML = "";
    });

    formBuscarProducto.addEventListener("submit", function (e) {
        e.preventDefault();
        let { buscarProductoNombre } = Object.fromEntries(new FormData(this));
        buscarProductoPorNombre(buscarProductoNombre).then(res => {
            tablaProductosEncontrados.innerHTML = "";
            let productos = res.data;

            productos.forEach((producto) => {
                const tr = crearElemento('tr');
                const tdNombre = crearElemento('td');
                const tdButton = crearElemento('td');
                const button = crearElemento('button');

                button.classList.add('btn', 'btn-sm', 'btn-success')
                button.textContent = 'agregar';

                button.addEventListener('click', function () {
                    validarExistenciaProducto(producto).then(res => {
                        if (res) {
                            agregarProductoAVenta(producto);
                            tablaProductosVenta.dispatchEvent(eventoAltertacionProdcutos);
                            bootstrap.Modal.getInstance(buscarProductoModal).hide();
                        } else {
                            mostrarAlerta("No hay en exitencia", "error");
                        }
                    });
                });

                tdButton.append(button);
                tdNombre.textContent = producto.nombre;

                tr.append(tdNombre);
                tr.append(tdButton);
                tablaProductosEncontrados.append(tr);
            });
        });
    });
    // if(await verificarAperturaDeCaja()) {

    // }
}


function registrarNuevoCliente() {

}

function verificarAperturaDeCaja() {

}

function abrirCaja() {

}

function cerrarCaja() {

}

function retirarCaja() {

}

function ventaExistente(){
    let cliente = obtenerClienteVenta();
    return cliente !== null || cliente !== undefined;
}

function empezarVenta(){
    setItemLocalStorage("")
}

function registarVenta() {

}

function cancelarVenta() {

}

function reanudarVenta() {
    const infoCliente = document.querySelector("#infoVenta #infoCliente");
    infoCliente.textContent = cliente.nombre;
}

async function buscarCliente($nombre) {
    let res = await fetch('controller/clientes/filtro.php?filter=' + $nombre);
    return await res.json();
}

function agregarClienteAVenta(cliente) {
    const infoCliente = document.querySelector("#infoVenta #infoCliente");
    infoCliente.textContent = cliente.nombre;
    cliente.idCliente = new Number(cliente.idCliente);
    cliente.precio = new Number(cliente.precio);

    setItemLocalStorage(CLIENTE_VENTA_KEY, JSON.stringify(cliente));
}

function quitarClienteVenta() {
    const infoCliente = document.querySelector("#infoVenta #infoCliente");
    infoCliente.textContent = "---";

    removeItemLocalStorage(CLIENTE_VENTA_KEY);
}

function obtenerClienteVenta(){
    let cliente = JSON.parse(getItemLocalStorage(CLIENTE_VENTA_KEY));
    return cliente;
}


function buscarProductoPorCodigo() {

}

async function buscarProductoPorNombre($filter = "") {
    const res = await fetch('controller/productos/filtro.php?filter=' + $filter);
    return await res.json();
}

function agregarProductoAVenta(producto) {
    let productosVenta = obtenerProductosEnVenta();
    const idxProductoEnVenta = obtenerProductoEnVenta(producto);
    if(idxProductoEnVenta > -1){
        productosVenta[idxProductoEnVenta].cantidad++;
    }else {
        let productoVenta;
        const cliente = obtenerClienteVenta();
        let precio = (cliente.precio === 1)? new Number(producto.venta) :
                    (cliente.precio === 2)? new Number(producto.medio) : new Number(producto.mayoreo);
        console.log(precio)
        productoVenta = new ProductoVenta(producto.idProducto,1,precio);
        productosVenta.push(productoVenta);
    }
    setItemLocalStorage(PRODUCTOS_VENTA_KEY, JSON.stringify(productosVenta));
}

function aumentarCantidadProducto(producto, cantidad) {
    const productoEnVenta = obtenerProductoEnVenta(producto);
    // prod
}

function reducirCantidadProducto(producto, cantidad) {

}

function obtenerProductosEnVenta() {
    let productos = getItemLocalStorage(PRODUCTOS_VENTA_KEY) ? JSON.parse(getItemLocalStorage(PRODUCTOS_VENTA_KEY)) : [];
    return productos;
}

function obtenerProductoEnVenta (producto) {
    let productosVenta = obtenerProductosEnVenta();
    return productosVenta.findIndex(p => p.idProducto === producto.idProducto);
}

function removerProductoDeVenta(producto) {
    removeItemLocalStorage(PRODUCTOS_VENTA_KEY);
}



async function validarExistenciaProducto(producto) {
    let { data } = await (await fetch('/controller/stock/validar?idProducto=' + producto.idProducto)).json();

    return data;
}






const crearElemento = elemento => document.createElement(elemento);
const getItemLocalStorage = key => localStorage.getItem(key);
const setItemLocalStorage = (key, value) => localStorage.setItem(key, value);
const removeItemLocalStorage = key => localStorage.removeItem(key);
const mostrarAlerta = (mensaje, tipo) => {
    if (tipo === 'error') iziToast.error({ title: 'Oops!', message: mensaje });
    if (tipo === 'success') iziToast.success({ title: 'Ok!', message: mensaje });
};