import { CLIENTE_VENTA_KEY, PRODUCTOS_VENTA_KEY } from "../../utils/constants";
import { get, post} from "../../utils/http";

const closeSale = async () => {

}

const cancelSale = async () => {
    removeItemLocalStorage(CLIENTE_VENTA_KEY);
    removeItemLocalStorage(PRODUCTOS_VENTA_KEY);
}

const findCustomer = async (name) => {
    const {data} = await get("/controller/clientes/filtro.php?filter="+name);
    return data;
}

const findProduct = async (name) => {
    const { data } = await get("/controller/productos/filtro.php?filter="+name);
    return data;
}

const openCashRegisert = async (monto) => {
    const { data } = await post("/controller/caja/abrir.php", { monto});
    return data;
}

const closeCashRegiser = async (id, monto) => {
    const { data } = await post("/controller/caja/cerrar.php", {id, monto});
    return data;
}

const anyProductInStock = async (product) => {
    let { data } =  await get('/controller/stock/validar?idProducto=' + product.idProducto);
    return data.data;
}

export {
    findProduct, 
    findCustomer,
    anyProductInStock,
    openCashRegisert,
    closeCashRegiser
};
