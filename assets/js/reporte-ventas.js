(() => document.addEventListener('DOMContentLoaded',main))();

async function main(){
    const formFiltros = document.querySelector("#formFiltros");
    const tablaVentas = document.querySelector("#ventas");

    $(tablaVentas).DataTable({
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
        ajax:{
            'url': '/controller/ventas/listar.php',
            'data': function(d){
                const {
                    idVendedor,
                    idCliente
                } = {
                    ...
                    Object.fromEntries(new FormData(formFiltros))
                };
                d.idVendedor = idVendedor;
                d.idCliente = idCliente;
            }
        },
    });
    formFiltros.addEventListener("submit",function(e){
        e.preventDefault();
    })
}