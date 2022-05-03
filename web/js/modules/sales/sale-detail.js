import * as React from "react";
import { totalCurrency } from "../../utils/functions";

const SaleDetail = ({ customer, total, onCancelSale, onCloseSale }) => {
    return (
        <>
            <div className="col-4">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col">
                                <dl>
                                    <dt>Cliente</dt>
                                    <dd id="infoCliente">{customer?.nombre || "---"}</dd>

                                    <dt>Total</dt>
                                    <dd id="totalVentaDetalle">{totalCurrency(total)}</dd>
                                </dl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button id="cancelarVenta" className="btn btn-danger mr-1" onClick={onCancelSale}>Cancelar</button>

                                <button className="btn btn-success" disabled={customer === null} onClick={onCloseSale}>Finalizar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SaleDetail;