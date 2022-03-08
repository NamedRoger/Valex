<div class="modal fade" id="nuevoCliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Nuevo Cliente</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formCliente">
                    <div class="form-group">
                        <label for="">Nombre del Cliente</label>
                        <input type="text" id="nombre" name="nombre" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="">Teléfono del Cliente</label>
                        <input type="number" id="telefono" name="telefono" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="">Precio de venta</label>
                        <select id="precio" name="precio" class="form-control">
                            <option value="0">Selecciona un precio</option>
                            <option value="1">Precio Publico</option>
                            <option value="2">Medio-Mayoreo</option>
                            <option value="3">Mayoreo</option>
                        </select>
                    </div>
                    <div>
                        <button class="btn btn-primary">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="buscarCliente" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Agregar Cliente a Venta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formBuscarCliente">
                    <div class="form-group row">
                        <div class="col-9">
                            <input class="form-control" id="buscarClienteNombre" placeholder="Buscar..." name="buscarClienteNombre">
                        </div>
                        <div class="col-3">
                            <button class="btn btn-primary">Buscar</button>
                        </div>
                    </div>
                    <div>
                        <table style="width: 100%;" id="clientesEncontrados">

                        </table>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="buscarProducto" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Buscar Producto</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formBuscarProducto">
                    <div class="form-group row">
                        <div class="col-9">
                            <input class="form-control" id="buscarProductoNombre" placeholder="Buscar..." name="buscarProductoNombre">
                        </div>
                        <div class="col-3">
                            <button class="btn btn-primary">Buscar</button>
                        </div>
                    </div>
                    <div>
                        <table style="width: 100%;" id="productosEncontrados">

                        </table>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="terminarVenta" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Resumen de Venta</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formPagarVenta">
                    <div class="form-group ">
                        <h4>Total Venta:</h4>
                        <span id="totalVentaInfo"></span>
                    </div>
                    <div class="form-group ">
                        <h4>Recibe:</h4>
                        <input type="number" class="form-control" id="txtPago" name="pagoVenta" required autofocus>
                    </div>
                    <div class="form-group ">
                        <h4>Cambio Venta:</h4>
                        <span id="cambioVentaInfo"></span>
                    </div>
                    <div>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">Cancelar</button>
                        <button type="submit" class="btn btn-success">Pagar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="cerrarCaja" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Cerrar Caja</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formCerrarCaja">
                    <div class="row">
                        <div class="col">
                            <h4>Fondo:</h4>
                        </div>
                        <div class="col">
                            <h5 id="fondoCaja">$0.00</h5>
                        </div>
                    </div>
                    <div class="row">
                        <label for="" class="col">$1000</label>
                        <div class="col">
                            <input type="number" value="0" min="0" class="form-control input-cierre" name="1000" id="">
                        </div>
                    </div>
                    <div class="row">
                        <label for="" class="col">$500</label>
                        <div class="col">
                            <input type="number" value="0" min="0" class="form-control input-cierre" name="500" id="">
                        </div>
                    </div>
                    <div class="row">
                        <label for="" class="col">$200</label>
                        <div class="col">
                            <input type="number" value="0" min="0" class="form-control input-cierre" name="200" id="">
                        </div>
                    </div>
                    <div class="row">
                        <label for="" class="col">$100</label>
                        <div class="col">
                            <input type="number" value="0" min="0" class="form-control input-cierre" name="100" id="">
                        </div>
                    </div>
                    <div class="row">
                        <label for="" class="col">$50</label>
                        <div class="col">
                            <input type="number" value="0" min="0" class="form-control input-cierre" name="50" id="">
                        </div>
                    </div>
                    <div class="row">
                        <label for="" class="col">$20</label>
                        <div class="col">
                            <input type="number" value="0" min="0" class="form-control input-cierre" name="20" id="">
                        </div>
                    </div>
                    <div class="row">
                        <label for="" class="col">Monedas</label>
                        <div class="col">
                            <input type="number" value="0" min="0" class="form-control input-cierre" name="monedas" id="">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h4>Total:</h4>
                        </div>
                        <div class="col">
                            <h5 id="totalCierre">$0.00</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button type="submit" class="btn btn-success">Cerrar</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="abrirCaja" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Abrir Caja</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form id="formAbrirCaja">
                    <div class="form-group ">
                        <h4>Monto</h4>
                        <input type="number" class="form-control" id="monto" name="monto" min="0">
                    </div>
                    <div>
                        <button type="submit" class="btn btn-success">Abrir</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>