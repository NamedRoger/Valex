function EventProductoTabla() {
    this.handlers = [];
}

EventProductoTabla.prototype = {
    subscribe: function (fn) {
        this.handlers.push(fn);
    },
    unsubscribe: function (fn) {
        this.handlers = this.handlers.filter(i => i !== fn);
    },
    fire: function (o, thisObj) {
        const scope = thisObj || window;
        this.handlers.forEach(i => i.call(scope, o));
    }
}


const CLIENTE_VENTA_KEY = "clienteVenta";
const PRODUCTOS_VENTA_KEY = "productosVenta";
const EVENTO_ALTER_PROD = "alter.prod";
const INICIAR_VENTA_KEY = "ventaIniciada";
const FONDO_KEY = "fondo";
const eventoAltertacionProdcutos = new Event(EVENTO_ALTER_PROD);
const eventTotalProd = new EventProductoTabla();

class ProductoVenta {
    nombre;
    idProducto;
    cantidad;
    precio = 0;

    constructor(idProducto, cantidad, precio, nombre = "") {
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precio = precio;
        this.nombre = nombre;
    }
}

class Venta {
    productos = [];
    pago = 0;
    idCliente;

    constructor(idCliente, pago, productos = []) {
        this.idCliente = idCliente;
        this.pago = pago;
        this.productos = productos;
    }
}

(() => document.addEventListener('DOMContentLoaded', main))();

async function main() {
    const modalAbrirCaja = document.querySelector('#abrirCaja');
    const formAbrirCaja = document.querySelector('#formAbrirCaja');
    const modalCerrarCaja = document.querySelector("#cerrarCaja");
    const formCerrarCaja = document.querySelector("#formCerrarCaja");
    const inputsCierre = document.querySelectorAll('.input-cierre');
    const tablaProductosVenta = document.querySelector("#tablaProductosVenta");
    const totalTabla = document.querySelector("#totalVentaTabla");
    const totalVentaDetalle = document.querySelector("#totalVentaDetalle");
    const modalFinalizarVenta = document.querySelector("#terminarVenta");
    const totalVentaInfo = document.querySelector("#totalVentaInfo");
    const cambioVentaInfo = document.querySelector("#cambioVentaInfo");
    const formPagarVenta = document.querySelector("#formPagarVenta");

    try {
        const { data } = await verificarAperturaDeCaja();
        if (!data) {
            bootstrap.Modal.getOrCreateInstance(modalAbrirCaja).show();
        } else {
            mostrarAlerta('No se puedo abrir la caja', 'error');
        }
    } catch (e) {
        mostrarAlerta('Ocurrio un error', 'error');
    }


    formAbrirCaja.addEventListener('submit', function (e) {
        e.preventDefault();
        const { monto } = Object.fromEntries(new FormData(this));
        abrirCaja(monto).then(res => {
            if (res.success) {
                mostrarAlerta("Se ha abierto la caja", 'success');
                bootstrap.Modal.getOrCreateInstance(modalAbrirCaja).hide();
                setItemLocalStorage(FONDO_KEY, JSON.stringify(res.data));
            } else {
                mostrarAlerta(res.error, 'error');
            }
        }).catch(err => mostrarAlerta('Ocurrio un error', 'error'));
    });

    modalAbrirCaja.addEventListener('hide.bs.modal', () => {
        formAbrirCaja.reset();
    });

    modalCerrarCaja.addEventListener('show.bs.modal', () => {
        const fondo = JSON.parse(getItemLocalStorage(FONDO_KEY)).montoInicial;
        document.querySelector('#fondoCaja').textContent = totalCurrency(fondo);
        document.querySelector('#totalCierre').textContent = totalCurrency(0);
    });

    modalCerrarCaja.addEventListener('hide.bs.modal', () => {
        formCerrarCaja.reset();
        document.querySelector('#fondoCaja').textContent = totalCurrency(0);
        document.querySelector('#totalCierre').textContent = totalCurrency(0);
    });

    inputsCierre.forEach(i => i.addEventListener('keyup', function () {
        const total = totalCierreForm();
        console.log(total)
        document.querySelector('#totalCierre').textContent = totalCurrency(isNaN(total) ? 0 : total);
    }));

    formCerrarCaja.addEventListener('submit', function (e) {
        e.preventDefault();
        const { id } = JSON.parse(getItemLocalStorage(FONDO_KEY));
        cerrarCaja(id, totalCierreForm()).then(res => {
            if (res.success) {
                mostrarAlerta("Se ha cerrado la caja", 'success');
                bootstrap.Modal.getOrCreateInstance(modalCerrarCaja).hide();
                removeItemLocalStorage(FONDO_KEY);
            } else {
                mostrarAlerta(res.error, 'error');
            }
        }).catch(err => mostrarAlerta('Ocurrio un error', 'error'));
    });

    const totalCierreForm = () => {
        return Object.entries(Object.fromEntries(new FormData(formCerrarCaja)))
            .map(m => {
                const t = (m[0] == 'monedas') ? parseInt(m[1]) : parseInt(m[0]) * parseInt(m[1]);
                return isNaN(t) ? 0 : t;
            })
            .reduce((s, c) => s + c, 0);
    }

    document.querySelector("#txtPago").addEventListener("keyup", function () {
        const productosEnVenta = obtenerProductosEnVenta();
        const total = productosEnVenta.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
        const pago = new Number(this.value);
        const cambio = pago < total ? 0 : pago - total;
        cambioVentaInfo.textContent = totalCurrency(cambio);
    });

    formPagarVenta.addEventListener("submit", function (e) {
        e.preventDefault();
        const productos = obtenerProductosEnVenta();
        const cliente = obtenerClienteVenta();
        const { pagoVenta } = Object.fromEntries(new FormData(this));
        const venta = new Venta(cliente.idCliente, new Number(pagoVenta), productos);
        registarVenta(venta).then(res => {
            if (res.success) {
                finalizarVenta();
                eventTotalProd.fire();
                mostrarAlerta("se creo la venta " + res.data, "success");
                bootstrap.Modal.getInstance(modalFinalizarVenta).hide();
            } else {
                mostrarAlerta(res.error, "error");
            }
        }).catch(err => mostrarAlerta('Ocurrio un error', 'error'))
    });

    modalFinalizarVenta.addEventListener('show.bs.modal', () => {
        const productosEnVenta = obtenerProductosEnVenta();
        const total = productosEnVenta.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
        totalVentaInfo.textContent = totalCurrency(total);
        cambioVentaInfo.textContent = totalCurrency(0);
        document.querySelector('#txtPago').focus();
    });

    modalFinalizarVenta.addEventListener('hide.bs.modal', () => {
        formPagarVenta.reset();
        totalVentaInfo.textContent = totalCurrency(0);
        cambioVentaInfo.textContent = totalCurrency(0);
    });

    eventTotalProd.subscribe(() => {
        const productosEnVenta = obtenerProductosEnVenta();
        const total = productosEnVenta.reduce((sum, producto) => sum + (producto.precio * producto.cantidad), 0);
        totalTabla.textContent = totalCurrency(total);
        totalVentaDetalle.textContent = totalCurrency(total);
    });

    eventTotalProd.subscribe(function (l) {
        tablaProductosVenta.innerHTML = "";
        const productosVenta = obtenerProductosEnVenta();

        productosVenta.forEach(producto => {
            tablaProductosVenta.append(crearProductoVenta(producto));
        });
    });

    if (ventaExistente()) {
        reanudarVenta();
        eventTotalProd.fire();
    }

    const btnCancelarVenta = document.querySelector("#cancelarVenta");

    btnCancelarVenta.addEventListener("click", () => {
        finalizarVenta();
        eventTotalProd.fire();
        tablaProductosVenta.innerHTML = "";
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
        }).catch(err => mostrarAlerta('Ocurrio un error', 'error'));
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
        if (buscarProductoNombre.length > 3) {
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
                    button.type = "button";

                    tdButton.append(button);
                    tdNombre.textContent = producto.nombre;

                    tr.append(tdNombre);
                    tr.append(tdButton);
                    tablaProductosEncontrados.append(tr);

                    button.addEventListener('click', function () {
                        validarExistenciaProducto(producto).then(res => {
                            if (res) {
                                bootstrap.Modal.getInstance(buscarProductoModal).hide();
                                let productoVenta = transformarProductoToProductoVenta(producto);
                                agregarProductoAVenta(productoVenta);
                                eventTotalProd.fire("agregar");
                            } else {
                                mostrarAlerta("No hay en exitencia", "error");
                            }
                        });
                    });
                });
            }).catch(err => mostrarAlerta('Oucrrio un error', 'error'));
        }
    });
}


async function verificarAperturaDeCaja() {
    const res = await (await fetch('/controller/caja/verificar.php')).json();
    return res;
}

async function abrirCaja(monto) {
    const res = await (await fetch('/controller/caja/abrir.php', {
        method: 'post',
        body: JSON.stringify({ monto })
    })).json();

    return res;
}

async function cerrarCaja(id, monto) {
    const res = await (await fetch('/controller/caja/cerrar.php', {
        method: 'post',
        body: JSON.stringify({ id, monto })
    })).json();

    return res;
}

//--------------------------------- ventas
function ventaExistente() {
    let cliente = obtenerClienteVenta();
    return cliente !== null && cliente !== undefined;
}

async function registarVenta(data) {
    const res = await (await fetch("/controller/ventas/crear.php", {
        body: JSON.stringify(data),
        method: 'post'
    })).json();

    return res;
}

function finalizarVenta() {
    quitarClienteVenta();
    removerTodosLosProductos();
}

function reanudarVenta() {
    const cliente = obtenerClienteVenta();
    actualizarInformacionClientVenta(cliente);
}

//--------------------------------- clietnes
function registrarNuevoCliente() {

}

async function buscarCliente($nombre) {
    let res = await fetch('/controller/clientes/filtro.php?filter=' + $nombre);
    return await res.json();
}

function agregarClienteAVenta(cliente) {
    actualizarClienteVenta(cliente);
}

function quitarClienteVenta() {
    removeItemLocalStorage(CLIENTE_VENTA_KEY);
    actualizarInformacionClientVenta(null);
}

function obtenerClienteVenta() {
    let cliente = JSON.parse(getItemLocalStorage(CLIENTE_VENTA_KEY));
    return cliente;
}


function actualizarClienteVenta(cliente) {
    cliente.idCliente = new Number(cliente.idCliente);
    cliente.precio = new Number(cliente.precio);
    setItemLocalStorage(CLIENTE_VENTA_KEY, JSON.stringify(cliente));
    actualizarInformacionClientVenta(cliente);
}

function actualizarInformacionClientVenta(cliente) {
    const infoCliente = document.querySelector("#infoVenta #infoCliente");
    infoCliente.textContent = "---";
    infoCliente.textContent = (cliente) ? cliente.nombre : "---";
}

//--------------------------------- productos
function buscarProductoPorCodigo() {

}

async function buscarProductoPorNombre($filter = "") {
    const res = await fetch('/controller/productos/filtro.php?filter=' + $filter);
    return await res.json();
}

function transformarProductoToProductoVenta(producto) {
    let productoVenta;
    const cliente = obtenerClienteVenta();
    let precio = (cliente.precio === 1) ? new Number(producto.venta) :
        (cliente.precio === 2) ? new Number(producto.medio) : new Number(producto.mayoreo);

    productoVenta = new ProductoVenta(producto.idProducto, 1, precio, producto.nombre);
    return productoVenta;
}

function crearProductoVenta(producto) {
    const tr = crearElemento('tr');
    const tdProducto = crearElemento('td');
    const tdPrecio = crearElemento('td');
    const tdCantidad = crearElemento('td');
    const tdTotal = crearElemento('td');
    const tdBotones = crearElemento('td');
    const boton = crearElemento('button');
    const inputCantidad = crearElemento('input');

    boton.textContent = "Borrar";
    boton.classList.add("btn", "btn-sm", "btn-danger");
    boton.addEventListener('click', () => {
        console.log('hola')
        removerProductoDeVenta(producto);
        eventTotalProd.fire();
    });


    inputCantidad.classList.add('w-25');
    inputCantidad.type = "number";
    inputCantidad.min = 1;
    inputCantidad.value = producto.cantidad;

    inputCantidad.addEventListener('change', function () {
        const cantidad = new Number(this.value)
        aumentarCantidadProducto(producto, cantidad);
        eventTotalProd.fire();
    });

    tdProducto.textContent = producto.nombre;
    tdPrecio.textContent = totalCurrency(producto.precio);
    tdCantidad.append(inputCantidad);
    tdTotal.textContent = totalCurrency(producto.precio * producto.cantidad);
    tdBotones.append(boton);

    tr.append(tdProducto);
    tr.append(tdPrecio);
    tr.append(tdCantidad);
    tr.append(tdTotal);
    tr.append(tdBotones);

    return tr;
}

function agregarProductoAVenta(producto) {
    let productosVenta = obtenerProductosEnVenta();
    const idxProductoEnVenta = obtenerProductoEnVenta(producto);
    if (idxProductoEnVenta > -1) {
        productosVenta[idxProductoEnVenta].cantidad++;
    } else {
        productosVenta.push(producto);
    }
    actualizarProductosEnVenta(productosVenta);
}

function aumentarCantidadProducto(producto, cantidad) {
    const productosEnVenta = obtenerProductosEnVenta();
    const productoEnVenta = obtenerProductoEnVenta(producto);
    productosEnVenta[productoEnVenta].cantidad = cantidad;
    actualizarProductosEnVenta(productosEnVenta);
}

function reducirCantidadProducto(producto, cantidad) {
    const productosEnVenta = obtenerProductosEnVenta();
    const productoEnVenta = obtenerProductoEnVenta(producto);
    productosEnVenta[productoEnVenta].cantidad = cantidad < 0 ? 0 : cantidad;
    actualizarProductosEnVenta(productosEnVenta);
}


function obtenerProductosEnVenta() {
    let productos = getItemLocalStorage(PRODUCTOS_VENTA_KEY) ? JSON.parse(getItemLocalStorage(PRODUCTOS_VENTA_KEY)) : [];
    return productos;
}

function obtenerProductoEnVenta(producto) {
    let productosVenta = obtenerProductosEnVenta();
    return productosVenta.findIndex(p => p.idProducto === producto.idProducto);
}

function removerProductoDeVenta(producto) {
    let productosEnVenta = obtenerProductosEnVenta();
    productosEnVenta = productosEnVenta.filter(i => i.idProducto !== producto.idProducto);
    actualizarProductosEnVenta(productosEnVenta);
}

function removerTodosLosProductos() {
    removeItemLocalStorage(PRODUCTOS_VENTA_KEY);
}

function actualizarProductosEnVenta(productos) {
    setItemLocalStorage(PRODUCTOS_VENTA_KEY, JSON.stringify(productos));
}


async function validarExistenciaProducto(producto) {
    let { data } = await (await fetch('/controller/stock/validar?idProducto=' + producto.idProducto)).json();
    return data;
}


const totalCurrency = (total) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total);
const crearElemento = elemento => document.createElement(elemento);
const getItemLocalStorage = key => localStorage.getItem(key);
const setItemLocalStorage = (key, value) => localStorage.setItem(key, value);
const removeItemLocalStorage = key => localStorage.removeItem(key);
const mostrarAlerta = (mensaje, tipo) => {
    if (tipo === 'error') iziToast.error({ title: 'Oops!', message: mensaje });
    if (tipo === 'success') iziToast.success({ title: 'Ok!', message: mensaje });
};