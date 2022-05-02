import * as React from "react";
import DataTable from "react-data-table-component";

const SalesReportTable = ({ sales, onDelete, onView }) => {
    const columns = [
        {
            name: "Vendedor",
            selector: row => row.vendedor
        },
        {
            name: "Fecha/Hora",
            selector: row => row.fecha
        },
        {
            name: "Monto",
            selector: row => row.monto
        },
        {
            name: "Acciones",
            cell: (row) => {
                return (
                    <>
                        <button className="btn btn-iconbtn btn-sm" onClick={() => handleView(row)}>
                            <i className="fas fa-edit" style={{ color: "#278CCD" }}></i>
                        </button>
                        <button className="btn btn-iconbtn btn-sm" onClick={() => handleDelete(row)}>
                            <i className="fas fa-trash-alt" style={{ color: "red" }}></i>
                        </button>
                    </>
                );
            }
        }
    ];

    const handleView = (sale) => {
        onView(sale);
    }

    const handleDelete = (sale) => {
        onDelete(sale);
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={sales}
                pagination>
            </DataTable>
        </>
    );
}

export default SalesReportTable;