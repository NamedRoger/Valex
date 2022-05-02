import * as React from "react";
import { totalCurrency } from "../../utils/functions";

const ProductsSalesTable = ({products, total}) => {
    return (
        <>
            <table className="table table-bordered" >
                <thead>
                    <tr>
                        <td>Producto</td>
                        <td>Precio</td>
                        <td>Cantidad</td>
                        <td>Total</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody id="tablaProductosVenta">
                </tbody>
                <tfoot>
                    <tr className="tx-blod">
                        <td colSpan="2"></td>
                        <td>TOTAL</td>
                        <td id="totalVentaTabla">{totalCurrency(total)}</td>
                    </tr>
                </tfoot>
            </table>
        </>
    );
}

export default ProductsSalesTable;