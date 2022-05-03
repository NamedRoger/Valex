import * as React from "react";
import { createRoot } from "react-dom/client";
import { SessionContext, SessionProvider } from "../../providers/useSession";
import SalesFilter from "./filtros";
import { getProductsSale, getSales, removeSales } from "./request";
import SalesReportTable from "./table";
import { Modal } from "react-bootstrap";
import { totalCurrency } from "../../utils/functions";

const container = document.getElementById("divContainer");
const root = createRoot(container);

const SalesReport = () => {
    const [session] = React.useContext(SessionContext);
    const [sales, setSales] = React.useState([]);
    const [sale, setSale] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);

    const handleView = (sale) => {
        getProductsSale(sale.idVenta)
            .then((res) => {
                sale.products = res;
                setSale(sale);
                setOpenModal(true);
            });
    }

    const handleDelete = (sale) => {
        (async () => {
            const res = await removeSales(sale.idVenta, session.idSucursal);
            setSales([]);
        })();
    }

    const submitFilters = async (filters) => {
        const sales = await getSales(filters);
        setSales(sales);
    }

    return (
        <div className="row">
            <div className="card">
                <div className="card-body">
                    <h5>Reporte de Ventas</h5>
                    <div className="row">
                        <div className="col">
                            <h6>Filtros</h6>
                            <SalesFilter onSubmit={submitFilters}></SalesFilter>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="table-responsive">
                                <SalesReportTable
                                    sales={sales}
                                    onDelete={handleDelete}
                                    onView={handleView}>
                                </SalesReportTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {
                    sale ?
                        (
                            <Modal show={openModal} onHide={() => {
                                setOpenModal(false);
                                setSale(null);
                            }}>
                                <Modal.Body>
                                    <div className="row row-sm">
                                        <div className="col-md-12 col-xl-12">
                                            <div className=" main-content-body-invoice">
                                                <div className="card card-invoice">
                                                    <div className="card-body">
                                                        <div className="invoice-header">
                                                            <h1 className="invoice-title">Nota</h1>
                                                            <div className="billed-from">
                                                                <h6 id="ventaDireccion">{sale.direccion}</h6>
                                                                <p><br />
                                                                    <br />
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="row mg-t-20">
                                                            <div className="col-md">
                                                                <label className="tx-gray-600">Cliente:</label>
                                                                <div className="billed-to">
                                                                    <h6 id="clienteDetalle">{sale.cliente}</h6>
                                                                </div>
                                                            </div>
                                                            <div className="col-md">
                                                                <label className="tx-gray-600">Infomacion de la nota:</label>
                                                                <p className="invoice-info-row"><span><small>Nota No.</small></span> <span><small id="idDetalle">{sale.idVenta.padStart(3, "0")}</small></span></p>
                                                                <p className="invoice-info-row"><span><small>Vendedor:</small></span> <span><small id="vendedorDetalle">{sale.vendedor}</small></span></p>
                                                                <p className="invoice-info-row"><span><small>Fecha y Hora:</small></span> <span><small id="fechaDetalle">{sale.fecha}</small></span></p>
                                                            </div>
                                                        </div>
                                                        <div className="table-responsive mg-t-40">
                                                            <table id="tablaProductosDetalle" className="table table-invoice border text-md-nowrap mb-0">
                                                                <thead>
                                                                    <tr>
                                                                        <th><small>Producto</small></th>
                                                                        <th><small>Precio</small></th>
                                                                        <th><small>Cantidad</small></th>
                                                                        <th><small>Total</small></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        sale.products.map((product, id) => (
                                                                            <tr key={id}>
                                                                                <td>{product.nombre}</td>
                                                                                <td>{product.precio}</td>
                                                                                <td>{product.cantidad}</td>
                                                                                <td>{totalCurrency(new Number(product.total))}</td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </tbody>

                                                            </table>
                                                            <h3 className="mt-4">Total:<span id="totalDetalle">{totalCurrency(new Number(sale.monto))}</span></h3>
                                                        </div>

                                                        <a href="#" className="btn btn-info float-end mt-3 ms-2">
                                                            <i className="mdi mdi-printer me-1"></i>Imprimir
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        ) : null
                }

            </div>
        </div>
    );
};

const Module = () => (
    <SessionProvider>
        <SalesReport />
    </SessionProvider>
);

root.render(<Module />);