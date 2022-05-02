import { get } from "../../utils/http"

export const getRegisters = async (branch) => {
    const {data} = await get("/controller/arqueos/listar.php?idSucursal=" + branch);
    return data;
};

export const getBranches = async () => {
    const { data } = await get("/controller/sucursales/listar.php");
    return data;
};
