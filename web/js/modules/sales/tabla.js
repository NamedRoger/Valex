import * as React from "react";
import { getCusotmerPrice, totalCurrency } from "../../utils/functions";

const ProductsSalesTable = ({ products, total, onUpdateQuantity, onDeleteProduct }) => {
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
                <tbody >
                    {
                        products.map((product, id) => (
                            <tr key={id}>
                                <td>{product.nombre}</td>
                                <td>{totalCurrency(product.precio)}</td>
                                <td>
                                    <input type={"number"} min={1} value={product.cantidad} onChange={(e) => onUpdateQuantity(product, e.target.value)}/>
                                </td>
                                <td>{totalCurrency(product.cantidad * product.precio)}</td>
                                <td>
                                    <button className="btn btn-sm btn-danger" onClick={() => onDeleteProduct(product)}>
                                        Borrar
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
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