(() => document.addEventListener('DOMContentLoaded',main))();
async function main(){
    const formFiltros = document.querySelector("#formFiltros");
    const tablaVentas = document.querySelector("#ventas tbody");
    const modalDetalleVenta = document.querySelector("#ventaModal");
    const tablaDetalle = document.querySelector("#tablaProductosDetalle tbody");
    const totalReporte = document.querySelector("#totalReporte");

    const selectSucursales = document.querySelector("#idSucursal");
    const selectVenedores = document.querySelector("#idVendedor");
    const selectClientes = document.querySelector("#idCliente");

    let sucursales = [];
    let ventas = [];
    let vendedores = [];
    let clientes = [];

    (async () => {
        sucursales = await loadSucursales();
        clientes = await loadClientes();
        cargarSelectSucursales();
        cargarSelectClientes();
    })();

    formFiltros.addEventListener("submit",function(e){
        e.preventDefault();
        const data = Object.fromEntries(new FormData(this));
        getVentas(data).then(res => {
            ventas = res;
            loadTable();
            totalReporte.textContent = totalCurrency(calcularTotalReporte());
        });
        
    });

    selectSucursales.addEventListener("change", (e) => {
        const idSucursal = parseInt(e.target.value);
        if(idSucursal){
            loadVendedores(idSucursal).then(res => {
                vendedores = res;
                cargarSelectVendedores();
            });
        }else{
            vendedores = [];
            cargarSelectVendedores();
        }
    });

    function loadTable () {
        const ventasMap = ventas.map(venta => {
            const {
                idVenta, 
                idCliente, 
                monto, 
                fecha, 
                cliente,
                vendedor} = venta;
            const tr = document.createElement("tr");
            const tdVendedor = document.createElement("td");
            tdVendedor.textContent = vendedor;
            const tdFecha = document.createElement("td");
            tdFecha.textContent = fecha;
            const tdMonto = document.createElement("td");
            tdMonto.textContent = totalCurrency(monto);
            const tdButton = document.createElement("td");
            
            const buttonVer = document.createElement("button");
            const buttonBorrar = document.createElement("button");

            buttonVer.addEventListener("click",() => showDetalleVenta(venta))
            buttonVer.innerHTML = "Ver";

            buttonBorrar.addEventListener("click",() => {})
            buttonBorrar.innerHTML = "Borrar";

            tdButton.append(buttonVer, buttonBorrar);

            tr.append(tdVendedor, tdFecha, tdMonto, tdButton);
            return tr;
        });

        tablaVentas.innerHTML = "";
        tablaVentas.append(...ventasMap);
    }

    function cargarSelectSucursales(){
        selectSucursales.append(...sucursales.map(sucursal => {
            const option = document.createElement("option");
            option.value = sucursal.idSucursal;
            option.textContent = sucursal.sucursal;
            return option;
        }));
    }

    function cargarSelectVendedores(){
        selectVenedores.innerHTML = "";
        selectVenedores.innerHTML = "<option value=''>--- Vendedor ---</option>";
        selectVenedores.append(...vendedores.map(vendedor => {
            const option = document.createElement("option");
            option.value = vendedor.idUsuario;
            option.textContent = vendedor.usuario;
            return option;
        }));
    }

    function cargarSelectClientes(){
        selectClientes.append(...clientes.map(cliente => {
            const option = document.createElement("option");
            option.value = cliente.idCliente;
            option.textContent = cliente.nombre;
            return option;
        }));
    }

    async function getVentas({idSucursal, idVendedor, idCliente, fechaInicio, fechaFin}){
        let ventas = await (
            await fetch(
                `/controller/ventas/listar.php?idSucursal=${idSucursal}&idVendedor=${idVendedor}&idCliente=${idCliente}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
                )
            ).json();
        ventas = ventas.map(venta => ({...venta, monto: parseFloat(venta.monto)}));
        return ventas;
    }

    async function showDetalleVenta(
        {
            idVenta, 
            idCliente, 
            monto, 
            fecha, 
            cliente,
            vendedor,
            direccion
        }) {
        const ventaProductos = await (await fetch("/controller/ventas/listar_productos?idVenta=" + idVenta)).json();
        const modal = bootstrap.Modal.getOrCreateInstance(modalDetalleVenta);
        
        document.getElementById("totalDetalle").textContent = totalCurrency(monto);
        document.getElementById("vendedorDetalle").textContent = vendedor;
        document.getElementById("fechaDetalle").textContent = fecha;
        document.getElementById("clienteDetalle").textContent = cliente;
        document.getElementById("idDetalle").textContent = idVenta.padStart(3,'0');
        document.getElementById("ventaDireccion").textContent = direccion;

        tablaDetalle.innerHTML = "";

        tablaDetalle.append(...ventaProductos.map(producto => {
            const tr = document.createElement("tr");
            
            const tdProducto = document.createElement("td");
            tdProducto.textContent = producto.nombre;

            const tdPrecio = document.createElement("td");
            tdPrecio.textContent = totalCurrency(producto.precio);
            const tdCantidad = document.createElement("td");
            tdCantidad.textContent = producto.cantidad;
            const tdTotal = document.createElement("td");
            tdTotal.textContent = totalCurrency(producto.total);

            tr.append(tdProducto, tdPrecio, tdCantidad, tdTotal);
            return tr;
        }));
        modal.show();
    }

    function calcularTotalReporte(){
        const totalReporte = ventas.reduce((suma, venta) => suma += venta.monto,0);
        return totalReporte;
    }
}

async function loadSucursales () {
    const res = await (await fetch("/controller/sucursales/listar.php")).json();
    return res;
}

async function loadVendedores(idSucursal) {
    const res = await (await fetch('/controller/usuarios/listar.php?idSucursal=' + idSucursal)).json();
    return res;
}

async function loadClientes(){
    const res = await (await fetch("/controller/clientes/filtro.php?filter=")).json();
    return res.data;
}

const totalCurrency = (total) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total);