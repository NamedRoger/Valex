async function main () {
    const tablaArqueos = document.querySelector("#arqueoTabla tbody");

    let arqueos = [];

   
    const getArqueos = async () => {
        const res = (await fetch("/controller/arqueos/listar.php")).json();
        return res;
    }

    const loadTableArqueos = () => {
        console.log(tablaArqueos);
        tablaArqueos.append(...arqueos.map((arqueo) => {
            const tr = document.createElement("tr");
            
            const tdSucursal = document.createElement("td");
            tdSucursal.textContent = arqueo.sucursal;
            const tdFechaInicio = document.createElement("td");
            tdFechaInicio.textContent = arqueo.fechaInicio;
            const tdFechaFin = document.createElement("td");
            tdFechaFin.textContent = arqueo.fechaFin;
            const tdMontoInicial = document.createElement("td");
            tdMontoInicial.textContent = totalCurrency(arqueo.montoInicial);
            const tdMontoFinal = document.createElement("td");
            tdMontoFinal.textContent = totalCurrency(arqueo.montoFinal);


            tr.append(tdSucursal, tdFechaInicio, tdFechaFin, tdMontoInicial, tdMontoFinal);
            return tr;
        }));
    }

    (async () => {
        arqueos = await getArqueos();
        loadTableArqueos();
    })();

}

document.addEventListener("DOMContentLoaded", () => {
    main();
});

const totalCurrency = (total) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total);