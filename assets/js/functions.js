'use strict';
////////////////////////////Checada///////////////////////////////
$(document).ready( function () {
    $('#tablaChecador').DataTable({
        bLengthChange: false,
        bInfo: false,
        ordering: false,
        language: {
            search: '',
            searchPlaceholder: "Buscar",
            emptyTable: 'Sin resultados',
            zeroRecords: 'Sin resultados',
            paginate: {
                first: 'Primero',
                last: 'Ultimo',
                next: 'Próximo',
                previous: 'Anterio '
            }
        },
         ajax: 'controller/tablas/tablaChecadas.php',
    });
});
////////////////////////////Checada///////////////////////////////
////////////////////////////Login/////////////////////////////////
function Login(){
	let usuario = document.getElementById('usuario').value;
	let password = document.getElementById('password').value;
	 $.ajax({
        url:'controller/login.php',
        type:'post',
        data:{usuario, password},
        success:function(response){
            const { success, session} = JSON.parse(response);
            console.log(success);
        	switch(success){

        		case 1:
					title = 'Error:';
        			msg = 'Debe de ingresar su usuario';
        			Error(msg, title);
        		break;
        		case 2:
        			title = 'Error:';
        			msg = 'Debe de ingresar su contraseña';
        			Error(msg, title);
        		break;
        		case 3:
        			title = 'Error:';
        			msg = 'Caracteres no validos en el campo "Usuario"';
        			Error(msg, title);
        		break;
        		case 4:
        			title = 'Error:';
        			msg = 'Caracteres no validos en el campo "Contraseña"';
        			Error(msg, title);
        		break;
        		case 5:
        			title = 'Error:';
        			msg = 'Usuario incorrecto';
        			Error(msg, title);
        		break;
        		case 6:
        			title = 'Error:';
        			msg = 'Contraseña incorrecta';
        			Error(msg, title);
        		break;
        		case 7:
        			title = 'Error:';
        			msg = 'Accesos incorrectos';
        			Error(msg, title);
        		break;
        		case 8:
                    document.cookie = "session="+JSON.stringify(session);
                    const { rol } = session;
                    const location = rol == 1 || 2 ? "reporte-ventas" : "ventas";
        			window.location.href = "redirect.php";
        		break;
        	}
        }
    });
}
////////////////////////////Login///////////////////////////////////////////
////////////////////Alertas/////////////////////////////////////////////////
let msg = '';
let title = '';

function Error(msg, title){
    iziToast.error({
        timeout: 3000,
        title: title,
        message: msg,
        position: 'topRight',
        pauseOnHover: false,
    });
}

function Success(msg, title){
    iziToast.success({
        timeout: 3000,
        title: title,
        message: msg,
        position: 'topRight',
        pauseOnHover: false,
    });
}
////////////////////Alertas/////////////////////////////////////////////////
////////////////////Sucursales/////////////////////////////////////////////////
$(document).ready( function () {
    $('#tablaSucursales').DataTable({
        bLengthChange: false,
        bInfo: false,
        ordering: false,
        language: {
            search: '',
            searchPlaceholder: "Buscar",
            emptyTable: 'Sin resultados',
            zeroRecords: 'Sin resultados',
            paginate: {
                first: 'Primero',
                last: 'Ultimo',
                next: 'Próximo',
                previous: 'Anterio '
            }
        },
         ajax: 'controller/tablas/tablaSucursales.php',
    });
});

function GuardarSucursal(){
	let sucursal = document.getElementById('sucursal').value;
	let direccion = document.getElementById('direccion').value;
	let telefono = document.getElementById('telefono').value;
	$.ajax({
        url:'controller/guardarSucursal.php',
        type:'post',
        data:{sucursal, direccion, telefono},
        success:function(response){
        	switch(response){
        		case '1':
					title = 'Error:';
        			msg = 'Ingresa un nombre para la sucursal';
        			Error(msg, title);
        		break;
        		case '2':
					title = 'Error:';
        			msg = 'Caracteres no validos en el campo "Nombre de la sucursal"';
        			Error(msg, title);
        		break;
        		case '3':
					title = 'Error:';
        			msg = 'Ingresa una dirección para la sucursal';
        			Error(msg, title);
        		break;
        		case '4':
					title = 'Error:';
        			msg = 'Caracteres no validos en el campo "Dirección de la sucursal"';
        			Error(msg, title);
        		break;
        		case '5':
					title = 'Error:';
        			msg = 'Ingresa un teléfono para la sucursal';
        			Error(msg, title);
        		break;
        		case '6':
					title = 'Error:';
        			msg = 'Caracteres no validos en el campo "Teléfono de la sucursal"';
        			Error(msg, title);
        		break;
        		case '7':
                    document.getElementById("formSucursal").reset();
        			$('#tablaSucursales').DataTable().ajax.reload();
        			title = 'Exito:';
        			msg = 'Sucursal registrada!';
        			Success(msg, title)
        		break;
                default:
                    title = 'Error:';
                    msg = 'Sucursal no registrada comunicate con soporte';
                    Error(msg, title);
                break;
        	}
        }
    });

}

function ModalEditarSucursal(idSucursal){
    $.get("modal/editarSucursal.php","idSucursal="+idSucursal,
        function(data){
            $("#fomularioActualizarSucursal").html(data);
        });
    $('#modalActualizarSucursal').modal({backdrop: 'static', keyboard: false})  
    $('#modalActualizarSucursal').modal('show');
}

function EditarSucursal(){
    let eSucursal = document.getElementById('eSucursal').value;
    let eDireccion = document.getElementById('eDireccion').value;
    let eTelefono = document.getElementById('eTelefono').value;
    let idSucursal = document.getElementById('idSucursal').value;
    $.ajax({
        url:'controller/editarSucursal.php',
        type:'post',
        data:{eSucursal, eDireccion, eTelefono, idSucursal},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Ingresa un nombre para la sucursal';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Nombre de la sucursal"';
                    Error(msg, title);
                break;
                case '3':
                    title = 'Error:';
                    msg = 'Ingresa una dirección para la sucursal';
                    Error(msg, title);
                break;
                case '4':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Dirección de la sucursal"';
                    Error(msg, title);
                break;
                case '5':
                    title = 'Error:';
                    msg = 'Ingresa un teléfono para la sucursal';
                    Error(msg, title);
                break;
                case '6':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Teléfono de la sucursal"';
                    Error(msg, title);
                break;
                case '7':
                    $('#modalActualizarSucursal').modal('toggle')
                    $('#tablaSucursales').DataTable().ajax.reload();
                    title = 'Exito:';
                    msg = 'Sucursal actualizada!';
                    Success(msg, title)
                break;
                default:
                    title = 'Error:';
                    msg = 'Sucursal no actualizada comunicate con soporte';
                    Error(msg, title);
                break;
            }
        }
    });
}

function EliminarSucursal(idSucursal){
    iziToast.show({
        theme: 'dark',
        icon: 'fa fa-trash-alt',
        iconColor: 'red',
        title: 'Eliminar:',
        displayMode: 2,
        message: 'Estas seguro de querer eliminar esta Sucursal.<br>Todos los datos como usuarios, ventas y productos de esta sucursal seran eliminados?',
        position: 'center',
        progressBarColor: 'red',
        layout: 2,
        timeout: false,
        buttons: [
            ['<button>Cancelar</button>', function (instance, toast) {
                iziToast.destroy();
            }, 
            true],
            ['<button>Eliminar</button>', function (instance, toast) {
                 $.ajax({
                    url:'controller/eliminarSucursal.php',
                    type:'post',
                    data:{idSucursal},
                    success:function(response){
                        switch(response){
                            case '1':
                                $('#tablaSucursales').DataTable().ajax.reload();
                                iziToast.destroy();
                                title = 'Sucursal:'
                                msg = 'eliminada con exito!'
                                Success(msg, title);
                            break;
                            default:
                               iziToast.destroy();
                                title = 'Error:';
                                msg = 'Sucursal no eliminada contacte a soporte!';
                                Error(msg, title);
                            break;
                        }
                    }
                });
            }]
        ]
    });
}
////////////////////Sucursales/////////////////////////////////////////////////
///////////////////////////Usuarios////////////////////////////////////////////
$(document).ready( function () {
    $('#tablaUsuarios').DataTable({
        bLengthChange: false,
        bInfo: false,
        ordering: false,
        language: {
            search: '',
            searchPlaceholder: "Buscar",
            emptyTable: 'Sin resultados',
            zeroRecords: 'Sin resultados',
            paginate: {
                first: 'Primero',
                last: 'Ultimo',
                next: 'Próximo',
                previous: 'Anterio '
            }
        },
         ajax: 'controller/tablas/tablaUsuarios.php',
    });
});

function GuardarUsuario(){
    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    let direccion = document.getElementById('direccion').value;
    let usuario = document.getElementById('usuario').value;
    let password = document.getElementById('password').value;
    let rol = document.getElementById('rol').value;
    let idSucursal = document.getElementById('idSucursal').value;
    let genero = document.getElementById('genero').value;
     $.ajax({
        url:'controller/guardarUsuario.php',
        type:'post',
        data:{nombre, telefono, direccion, usuario, password, rol, idSucursal, genero},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Ingresa el nombre del usuario';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Nombre"';
                    Error(msg, title);
                break;
                case '3':
                    title = 'Error:';
                    msg = 'Ingresa el teléfono del usuario';
                    Error(msg, title);
                break;
                case '4':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Teléfono"';
                    Error(msg, title);
                break;
                case '5':
                    title = 'Error:';
                    msg = 'Ingresa la dirección del usuario';
                    Error(msg, title);
                break;
                case '6':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Dirección"';
                    Error(msg, title);
                break;
                case '7':
                    title = 'Error:';
                    msg = 'Ingresa el usuario con el que se iniciara sesión';
                    Error(msg, title);
                break;
                case '8':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Usuario". <br> Solo se admiten letras y numeros';
                    Error(msg, title);
                break;
                case '9':
                    title = 'Error:';
                    msg = 'Ingresa la contraseña del usuario';
                    Error(msg, title);
                break;
                case '10':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Contraseña". <br> Solo se admiten letras y numeros';
                    Error(msg, title);
                break;
                case '11':
                    title = 'Error:';
                    msg = 'Selecciona un rol para el usuario';
                    Error(msg, title);
                break;
                case '12':
                    title = 'Error:';
                    msg = 'Selecciona la sucursal a la quepertanece el usuario';
                    Error(msg, title);
                break;
                 case '13':
                    title = 'Error:';
                    msg = 'Selecciona el genero del usuario';
                    Error(msg, title);
                break;
                case '100':
                    title = 'Error:';
                    msg = 'No se pueden registrar usuarios si no tienes registradas tus sucursales';
                    Error(msg, title);
                break;
                case '14':
                    document.getElementById("formUsuario").reset();
                    $('#tablaUsuarios').DataTable().ajax.reload();
                    title = 'Usuario:';
                    msg = 'registrado con exito';
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'Usuario no registrado contacte a soporte';
                    Error(msg, title);
                break;
            }
        }
    });
}

function PermisoStock(idUsuario, permiso){
    $.ajax({
        url:'controller/permisoStock.php',
        type:'post',
        data:{idUsuario, permiso},
        success:function(response){
            switch(response){
                case '1':
                    $('#tablaUsuarios').DataTable().destroy();
                    $('#tablaUsuarios').DataTable({
                        bLengthChange: false,
                        bInfo: false,
                        ordering: false,
                        language: {
                            search: '',
                            searchPlaceholder: "Buscar",
                            emptyTable: 'Sin resultados',
                            zeroRecords: 'Sin resultados',
                            paginate: {
                                first: 'Primero',
                                last: 'Ultimo',
                                next: 'Próximo',
                                previous: 'Anterio '
                            }
                        },
                         ajax: 'controller/tablas/tablaUsuarios.php',
                    });
                    title = 'Usuario:';
                    msg = 'Se reboco el permiso de gestionar stock!';
                    Success(msg, title);
                break;
                case '2':
                    $('#tablaUsuarios').DataTable().destroy();
                    $('#tablaUsuarios').DataTable({
                        bLengthChange: false,
                        bInfo: false,
                        ordering: false,
                        language: {
                            search: '',
                            searchPlaceholder: "Buscar",
                            emptyTable: 'Sin resultados',
                            zeroRecords: 'Sin resultados',
                            paginate: {
                                first: 'Primero',
                                last: 'Ultimo',
                                next: 'Próximo',
                                previous: 'Anterio '
                            }
                        },
                         ajax: 'controller/tablas/tablaUsuarios.php',
                    });
                    title = 'Usuario:';
                    msg = 'Con permiso de gestionar stock!';
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'Al usuario no se le pudo dar el permiso de gestionar el stock contacte a soporte';
                    Error(msg, title);
                break;
            }
        }
    });
}

function ModalEditarUsuario(idUsuario){
    $.get("modal/editarUsuario.php","idUsuario="+idUsuario,
        function(data){
            $("#fomularioActualizarUsuario").html(data);
        });
    $('#modalActualizarUsuario').modal({backdrop: 'static', keyboard: false})  
    $('#modalActualizarUsuario').modal('show');
}

function EditarUsuario(){
    let eNombre = document.getElementById('eNombre').value;
    let eTelefono = document.getElementById('eTelefono').value;
    let eDireccion = document.getElementById('eDireccion').value;
    let eUsuario = document.getElementById('eUsuario').value;
    let ePassword = document.getElementById('ePassword').value;
    let eRol = document.getElementById('eRol').value;
    let eIdSucursal = document.getElementById('eIdSucursal').value;
    let idUsuario = document.getElementById('idUsuario').value;
     $.ajax({
        url:'controller/editarUsuario.php',
        type:'post',
        data:{eNombre, eTelefono, eDireccion, eUsuario, ePassword, eRol, eIdSucursal, idUsuario},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Ingresa el nombre del usuario';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Nombre"';
                    Error(msg, title);
                break;
                case '3':
                    title = 'Error:';
                     msg = 'Ingresa el teléfono del usuario';
                    Error(msg, title);
                break;
                case '4':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Teléfono"';
                    Error(msg, title);
                break;
                case '5':
                    title = 'Error:';
                    msg = 'Ingresa la dirección del usuario';
                    Error(msg, title);
                break;
                case '6':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Dirección"';
                    Error(msg, title);
                break;
                case '7':
                    title = 'Error:';
                    msg = 'Ingresa el usuario con el que se iniciara sesión';
                    Error(msg, title);
                break;
                case '8':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Usuario". <br> Solo se admiten letras y numeros';
                    Error(msg, title);
                break;
                case '9':
                    title = 'Error:';
                    msg = 'Selecciona un rol para el usuario';
                    Error(msg, title);
                break;
                case '10':
                    title = 'Error:';
                    msg = 'Selecciona la sucursal a la quepertanece el usuario';
                    Error(msg, title);
                break;
                case '11':
                    $('#modalActualizarUsuario').modal('toggle');
                    $('#tablaUsuarios').DataTable().ajax.reload();
                    title = 'Usuario:';
                    msg = 'actualizado con exito';
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'Usuario no actualizado contacta a soporte';
                    Error(msg, title);
                break;
            }
        }
    });
 }

function EliminarUsuario(idUsuario){
    iziToast.show({
        theme: 'dark',
        icon: 'fa fa-trash-alt',
        iconColor: 'red',
        title: 'Eliminar:',
        displayMode: 2,
        message: 'Estas seguro de querer eliminar esta Usuario?',
        position: 'center',
        progressBarColor: 'red',
        layout: 2,
        timeout: false,
        buttons: [
            ['<button>Cancelar</button>', function (instance, toast) {
                iziToast.destroy();
            }, 
            true],
            ['<button>Eliminar</button>', function (instance, toast) {
                 $.ajax({
                    url:'controller/eliminarUsuario.php',
                    type:'post',
                    data:{idUsuario},
                    success:function(response){
                        switch(response){
                            case '1':
                                $('#tablaUsuarios').DataTable().ajax.reload();
                                iziToast.destroy();
                                title = 'Usuario:'
                                msg = 'eliminado con exito!'
                                Success(msg, title);
                            break;
                            default:
                                iziToast.destroy();
                                title = 'Error:';
                                msg = 'Usuario no eliminado contacte a soporte!';
                                Error(msg, title);
                            break;
                        }
                    }
                });
            }]
        ]
    });
}
///////////////////////////Usuarios////////////////////////////////////////////////////////
///////////////////////////Categorias/////////////////////////////////////////////////////

$(document).ready( function () {
    $('#tablaCategorias').DataTable({
        bLengthChange: false,
        bInfo: false,
        ordering: false,
        language: {
            search: '',
            searchPlaceholder: "Buscar",
            emptyTable: 'Sin resultados',
            zeroRecords: 'Sin resultados',
            paginate: {
                first: 'Primero',
                last: 'Ultimo',
                next: 'Próximo',
                previous: 'Anterio '
            }
        },
         ajax: 'controller/tablas/tablaCategorias.php',
    });
});

function GuardarCategoria(){
    let categoria =  document.getElementById('categoria').value;
    $.ajax({
        url:'controller/guardarCategoria.php',
        type:'post',
        data:{categoria},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Debe de ingresar un nombre de categoría';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Categoría"';
                    Error(msg, title);
                break;
                case '3':
                    document.getElementById("formCategorias").reset();
                    $('#tablaCategorias').DataTable().ajax.reload();
                    title = 'Categoría:';
                    msg = 'registrada con exito';
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'Categoría no Registrada contacta a soporte';
                    Error(msg, title);
                break;
            }
        }
    });
}

function EliminarCategoria(idCategoria){
    iziToast.show({
        theme: 'dark',
        icon: 'fa fa-trash-alt',
        iconColor: 'red',
        title: 'Eliminar:',
        displayMode: 2,
        message: 'Estas seguro de querer eliminar esta Categoría?',
        position: 'center',
        progressBarColor: 'red',
        layout: 2,
        timeout: false,
        buttons: [
            ['<button>Cancelar</button>', function (instance, toast) {
                iziToast.destroy();
            }, 
            true],
            ['<button>Eliminar</button>', function (instance, toast) {
                 $.ajax({
                    url:'controller/eliminarCategoria.php',
                    type:'post',
                    data:{idCategoria},
                    success:function(response){
                        switch(response){
                            case '1':
                               $('#tablaCategorias').DataTable().ajax.reload();
                                iziToast.destroy();
                                title = 'Categoría:'
                                msg = 'eliminada con exito!'
                                Success(msg, title); 
                            break;
                            default:
                                iziToast.destroy();
                                title = 'Error:';
                                msg = 'Categoría no eliminada contacte a soporte!';
                                Error(msg, title);
                            break;
                        }
                    }
                });
            }]
        ]
    });
}
///////////////////////////Categorias/////////////////////////////////////////////////////
///////////////////////////Productos/////////////////////////////////////////////////////

$(document).ready( function () {
    $('#tablaProductos').DataTable({
        bLengthChange: false,
        bInfo: false,
        ordering: false,
        language: {
            search: '',
            searchPlaceholder: "Buscar",
            emptyTable: 'Sin resultados',
            zeroRecords: 'Sin resultados',
            paginate: {
                first: 'Primero',
                last: 'Ultimo',
                next: 'Próximo',
                previous: 'Anterio '
            }
        },
         ajax: 'controller/tablas/tablaProductos.php',
    });
});

function GuardarProducto(){
    let codigo =  document.getElementById('codigo').value;
    let idCategoria =  document.getElementById('idCategoria').value;
    let medida =  document.getElementById('medida').value;
    let nombre =  document.getElementById('nombre').value;
    let descripcion =  document.getElementById('descripcion').value;
    let compra =  document.getElementById('compra').value;
    let venta =  document.getElementById('venta').value;
    let medio =  document.getElementById('medio').value;
    let mayoreo =  document.getElementById('mayoreo').value;
    $.ajax({
        url:'controller/guardarProducto.php',
        type:'post',
        data:{codigo, idCategoria, medida, nombre, descripcion, compra, venta, medio, mayoreo},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Producto ya registrado, no puedes duplicar el nombre del producto';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Debes seleccionar una categoria para el producto';
                    Error(msg, title);
                break;
                case '3':
                    title = 'Error:';
                    msg = 'Debes seleccionar una unidad de medida para el producto';
                    Error(msg, title);
                break;
                case '4':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Nombre del Producto"';
                    Error(msg, title);
                break;
                case '5':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Descripción del Producto"';
                    Error(msg, title);
                break;
                case '6':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Precio de compra"';
                    Error(msg, title);
                break;
                case '7':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Precio Venta"';
                    Error(msg, title);
                break;
                case '8':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Precio Medio-Mayoreo"';
                    Error(msg, title);
                break;
                case '9':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Precio Mayoreo"';
                    Error(msg, title);
                break;
                case '100':
                    title = 'Error:';
                    msg = 'No se pueden registrar productos si no tienes registradas tus sucursales';
                    Error(msg, title);
                break;
                case '10':
                    document.getElementById("formProductos").reset();
                    $('#tablaProductos').DataTable().ajax.reload();
                    title = 'Producto:'
                    msg = 'registrado con exito!'
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'Categoría no eliminada contacte a soporte!';
                    Error(msg, title);
                break;
            }
        }
    });
}

function ModalEditarProducto(idProducto){
    $.get("modal/editarProducto.php","idProducto="+idProducto,
        function(data){
            $("#fomularioActualizarProducto").html(data);
        });
    $('#modalActualizarProducto').modal({backdrop: 'static', keyboard: false})  
    $('#modalActualizarProducto').modal('show');
}
function EditarProducto(){
    let eCodigo =  document.getElementById('eCodigo').value;
    let eNombre =  document.getElementById('eNombre').value;
    let eDescripcion =  document.getElementById('eDescripcion').value;
    let eCompra =  document.getElementById('eCompra').value;
    let eVenta =  document.getElementById('eVenta').value;
    let eMedio =  document.getElementById('eMedio').value;
    let eMayoreo =  document.getElementById('eMayoreo').value;
    let idProducto =  document.getElementById('idProducto').value;
     $.ajax({
        url:'controller/editarProducto.php',
        type:'post',
        data:{eCodigo, eNombre, eDescripcion, eCompra, eVenta, eMedio, eMayoreo, idProducto},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Codigo de barras"';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Nombre del Producto"';
                    Error(msg, title);
                break;
                case '3':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Descripción del Producto"';
                    Error(msg, title);
                break;
                case '4':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Precio de compra"';
                    Error(msg, title);
                break;
                case '5':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Precio Venta"';
                    Error(msg, title);
                break;
                case '6':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Precio Medio-Mayoreo"';
                    Error(msg, title);
                break;
                case '7':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Precio Mayoreo"';
                    Error(msg, title);
                break;
                case '8':
                    $('#modalActualizarProducto').modal('toggle');
                    $('#tablaProductos').DataTable().ajax.reload();
                    title = 'Producto:'
                    msg = 'actualizado con exito!'
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'Producto no acualizado contacte a soporte"';
                    Error(msg, title);
                break;
            }
        }
    });
}

function EliminarProducto(idProducto){
    iziToast.show({
        theme: 'dark',
        icon: 'fa fa-trash-alt',
        iconColor: 'red',
        title: 'Eliminar:',
        displayMode: 2,
        message: 'Estas seguro de querer eliminar este Producto?<br>Sera eliminado de todas tus sucursales!',
        position: 'center',
        progressBarColor: 'red',
        layout: 2,
        timeout: false,
        buttons: [
            ['<button>Cancelar</button>', function (instance, toast) {
                iziToast.destroy();
            }, 
            true],
            ['<button>Eliminar</button>', function (instance, toast) {
                 $.ajax({
                    url:'controller/eliminarProducto.php',
                    type:'post',
                    data:{idProducto},
                    success:function(response){
                        switch(response){
                            case '1':
                               $('#tablaProductos').DataTable().ajax.reload();
                                iziToast.destroy();
                                title = 'Producto:'
                                msg = 'eliminada con exito!';
                                Success(msg, title);
                            break;
                            default:
                                Success(msg, title);
                                iziToast.destroy();
                                title = 'Error:';
                                msg = 'Producto no eliminada contacte a soporte!';
                                Error(msg, title);
                            break;
                        }
                    }
                });
            }]
        ]
    });
}
/////////////////////////////////Productos//////////////////////////////////////
////////////////////////////////Stock///////////////////////////////////////////
$(document).ready( function () {
    $('#tablaStock').DataTable({
        bLengthChange: false,
        bInfo: false,
        ordering: false,
        language: {
            search: '',
            searchPlaceholder: "Buscar",
            emptyTable: 'Sin resultados',
            zeroRecords: 'Sin resultados',
            paginate: {
                first: 'Primero',
                last: 'Ultimo',
                next: 'Próximo',
                previous: 'Anterio '
            }
        },
         ajax: 'controller/tablas/tablaStock.php',
    });
});

function ModalStock(idStock){
    $.get("modal/modalStock.php","idStock="+idStock,
        function(data){
            $("#formStock").html(data);
        });
    $('#modalStock').modal({backdrop: 'static', keyboard: false})  
    $('#modalStock').modal('show');
}

function GuardarStock(){
    let stock =  document.getElementById('stock').value;
    let idStock =  document.getElementById('idStock').value;
    $.ajax({
        url:'controller/guardarStock.php',
        type:'post',
        data:{idStock, stock},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Debes de ingresar las existencias de el producto';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Stock"';
                    Error(msg, title);
                break;
                case '3':
                    $('#modalStock').modal('toggle');
                    document.getElementById("formularioStock").reset();
                    $('#tablaStock').DataTable().ajax.reload();
                    title = 'Stock:'
                    msg = 'actualizado con exito!'
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'No se puedo guardar el stock comunicate con soporte';
                    Error(msg, title);
                break;
            }
        }
    });
}

function ModalMerma(idStock){
    $.get("modal/modalMermas.php","idStock="+idStock,
        function(data){
            $("#formMerma").html(data);
        });
    $('#modalMerma').modal({backdrop: 'static', keyboard: false})  
    $('#modalMerma').modal('show');
}

function GuardarMerma(){
    let merma =  document.getElementById('merma').value;
    let idStock =  document.getElementById('idStock').value;
    $.ajax({
        url:'controller/guardarMerma.php',
        type:'post',
        data:{idStock, merma},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Debes de ingresar la cantidad a restar';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Restar Stock"';
                    Error(msg, title);
                break;
                case '3':
                    $('#modalMerma').modal('toggle');
                    document.getElementById("formularioStock").reset();
                    $('#tablaStock').DataTable().ajax.reload();
                    title = 'Stock:'
                    msg = 'actualizado con exito!'
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'No se puedo ajustar el stock comunicate con soporte';
                    Error(msg, title);
                break;
            }
        }
    });
}

function EditarStock(){
    let stock =  document.getElementById('stock').value;
    let idStock =  document.getElementById('idStock').value;
    $.ajax({
        url:'controller/editarStock.php',
        type:'post',
        data:{idStock, stock},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Debes de ingresar las existencias de el producto';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Stock"';
                    Error(msg, title);
                break;
                case '3':
                    $('#modalStock').modal('toggle');
                    document.getElementById("formularioStock").reset();
                    $('#tablaStock').DataTable().ajax.reload();
                    title = 'Stock:'
                    msg = 'actualizado con exito!'
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'No se puedo actualizar el stock comunicate con soporte';
                    Error(msg, title);
                break;
            }
        }
    });
}
/////////////////////////////////////////Stock////////////////////////////////////////////////
/////////////////////////////////////////////Clientes////////////////////////////////////////
$(document).ready( function () {
    $('#tablaClientes').DataTable({
        bLengthChange: false,
        bInfo: false,
        ordering: false,
        language: {
            search: '',
            searchPlaceholder: "Buscar",
            emptyTable: 'Sin resultados',
            zeroRecords: 'Sin resultados',
            paginate: {
                first: 'Primero',
                last: 'Ultimo',
                next: 'Próximo',
                previous: 'Anterio '
            }
        },
         ajax: 'controller/tablas/tablaClientes.php',
    });
});

function GuardarCliente(){
    let nombre =  document.getElementById('nombre').value;
    let telefono =  document.getElementById('telefono').value;
    let precio =  document.getElementById('precio').value;
    $.ajax({
        url:'controller/guardaCliente.php',
        type:'post',
        data:{nombre, telefono, precio},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "nombre"';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Teléfono"';
                    Error(msg, title);
                break;
                case '3':
                    title = 'Error:';
                    msg = 'Debes seleccionar un precio';
                    Error(msg, title);
                break;
                case '4':
                    document.getElementById("formCliente").reset();
                    $('#tablaClientes').DataTable().ajax.reload();
                    title = 'Cliente:'
                    msg = 'registrado con exito!'
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'Cliente no registrado contacte a soporte';
                    Error(msg, title);
                break;
            }
        }
    });
}

function ModalEditarCliente(idCliente){
    $.get("modal/editarCliente.php","idCliente="+idCliente,
        function(data){
            $("#fomularioActualizarCliente").html(data);
        });
    $('#modalActualizarCliente').modal({backdrop: 'static', keyboard: false})  
    $('#modalActualizarCliente').modal('show');
}

function EditarCliente(){
    let eNombre =  document.getElementById('eNombre').value;
    let eTelefono =  document.getElementById('eTelefono').value;
    let ePrecio =  document.getElementById('ePrecio').value;
    let idCliente =  document.getElementById('idCliente').value;
    $.ajax({
        url:'controller/editarCliente.php',
        type:'post',
        data:{eNombre, eTelefono, ePrecio, idCliente},
        success:function(response){
            switch(response){
                case '1':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "nombre"';
                    Error(msg, title);
                break;
                case '2':
                    title = 'Error:';
                    msg = 'Caracteres no validos en el campo "Teléfono"';
                    Error(msg, title);
                break;
                case '3':
                    title = 'Error:';
                    msg = 'Debes seleccionar un precio';
                    Error(msg, title);
                break;
                case '4':
                    $('#modalActualizarCliente').modal('toggle');
                    $('#tablaClientes').DataTable().ajax.reload();
                    title = 'Cliente:'
                    msg = 'actualizado con exito!'
                    Success(msg, title);
                break;
                default:
                    title = 'Error:';
                    msg = 'Cliente no se actualizo contacte a soporte';
                    Error(msg, title);
                break;
            }
        }
    });
}

function EliminarCliente(idCliente) {
    iziToast.show({
        theme: 'dark',
        icon: 'fa fa-trash-alt',
        iconColor: 'red',
        title: 'Eliminar:',
        displayMode: 2,
        message: 'Estas seguro de querer eliminar este Cliente?',
        position: 'center',
        progressBarColor: 'red',
        layout: 2,
        timeout: false,
        buttons: [
            ['<button>Cancelar</button>', function (instance, toast) {
                iziToast.destroy();
            }, 
            true],
            ['<button>Eliminar</button>', function (instance, toast) {
                 $.ajax({
                    url:'controller/eliminarCliente.php',
                    type:'post',
                    data:{idCliente},
                    success:function(response){
                        switch(response){
                            case '1':
                               $('#tablaClientes').DataTable().ajax.reload();
                                iziToast.destroy();
                                title = 'Cliente:'
                                msg = 'eliminada con exito!';
                                Success(msg, title);
                            break;
                            default:
                                Success(msg, title);
                                iziToast.destroy();
                                title = 'Error:';
                                msg = 'Cliente no eliminada contacte a soporte!';
                                Error(msg, title);
                            break;
                        }
                    }
                });
            }]
        ]
    });
}
////////////////////////////Clientes///////////////////////////////
$('.select').select2({
  placeholder: 'Buscar cliente'
});
$(document).ready( function () {
    $('#tablaVentas').DataTable({
        bLengthChange: false,
        bInfo: false,
        ordering: false,
        language: {
            search: '',
            searchPlaceholder: "Buscar",
            emptyTable: 'Sin resultados',
            zeroRecords: 'Sin resultados',
            paginate: {
                first: 'Primero',
                last: 'Ultimo',
                next: 'Próximo',
                previous: 'Anterio '
            }
        },
         ajax: 'controller/tablas/tablaVentas.php',
    });
});

function ModalCliente(){
    $('#nuevoCliente').modal({backdrop: 'static', keyboard: false})  
    $('#nuevoCliente').modal('show');
}
////////////////////////////Ventas///////////////////////////////
 