import * as React from "react";
import DataTable from "react-data-table-component";

const CashReportTable = ({data}) => {
    const columns = [
        {
            name: "Sucursal",
            selector: row => row.sucursal
        },
        {
            name: "Fecha Inicio",
            selector: row => row.fechaInicio
        },
        {
            name: "Fecha Fin",
            selector: row => row.fechaFin
        },
        {
            name: "Monto Inicio",
            selector: row => row.montoInicial
        },
        {
            name: "Monto Fin",
            selector: row => row.montoFinal
        },
    ];
    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                pagination
            ></DataTable>
        </>
    );
};

export default CashReportTable;