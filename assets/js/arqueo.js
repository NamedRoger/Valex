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
            const tdFechaInicio = document.createElement("td");
            const tdFechaFin = document.createElement("td");
            const tdMontoInicial = document.createElement("td");
            const tdMontoFinal = document.createElement("td");

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