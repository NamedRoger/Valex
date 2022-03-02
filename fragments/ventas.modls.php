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
                <form id="formCliente">
                    <div class="form-group">
                        <label for="exampleDataList" class="form-label">Cliente</label>
                        <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Buscar...">
                        <datalist id="datalistOptions">
                            <option value="San Francisco">
                            <option value="New York">
                            <option value="Seattle">
                            <option value="Los Angeles">
                            <option value="Chicago">
                        </datalist>
                    </div>
                    <div>
                        <button class="btn btn-primary">Agregar</button>
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
                <form id="formCliente">
                    <div class="form-group">
                        <label for="exampleDataList" class="form-label">Producto</label>
                        <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Buscar...">
                        <datalist id="datalistOptions">
                            <option value="San Francisco">
                            <option value="New York">
                            <option value="Seattle">
                            <option value="Los Angeles">
                            <option value="Chicago">
                        </datalist>
                    </div>
                    <div>
                        <button class="btn btn-primary">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>