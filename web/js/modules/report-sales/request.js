import { post, get } from "../../utils/http";

const getSales = async ({ vendor, customer, branch, initDate, endDate }) => {
    vendor = vendor == 0 ? "": vendor;
    customer = customer == 0? "": customer;
    branch = branch == 0? "": branch;
    const {data} = await get(
        `/controller/ventas/listar.php?idSucursal=${branch}&idVendedor=${vendor}&idCliente=${customer}&fechaInicio=${initDate}&fechaFin=${endDate}`
        );
    return data;
};

const getProductsSale = async (idSale) => {
    const {data} = await get("/controller/ventas/listar_productos?idVenta="+ idSale);
    return data;
}

const removeSales = async (idSale) => {

};

const getBranches = async () => {
    const { data } = await get("/controller/sucursales/listar.php");
    return data;
};

const getSalesMen = async (idBranch) => {
    const { data } = await get("/controller/usuarios/listar.php?idSucursal=" + idBranch);
    return data;
}

const getCustomers = async () => {
    const { data } = await get("/controller/clientes/filtro.php?filter=");
    return data.data;
}

export {
    getBranches,
    getCustomers,
    getSales,
    getSalesMen,
    removeSales,
    getProductsSale
}