import * as React from "react";
import { useFormik } from "formik";
import { SessionContext } from "../../providers/useSession";
import { getBranches, getCustomers, getSalesMen } from "./request";

const SalesFilter = ({ onSubmit }) => {
    const [session] = React.useContext(SessionContext);
    const [branchId, setBranchId] = React.useState(() => {
        if(session.rol === "2"){
            return session.idSucursal;
        }
        return 0;
    });
    const [branches, setBranches] = React.useState([]);
    const [customers, setCustomers] = React.useState([]);
    const [salesMen, setSalesMen] = React.useState([]);

    const loadBranches = React.useCallback(async () => {
        const branches = await getBranches();
        setBranches(branches);
    }, []);

    const loadSalesMens = React.useCallback(async () => {
        if(branchId){
            const salesMens = await getSalesMen(branchId);
            setSalesMen(salesMens);    
        }
    }, [branchId]);

    const loadCustomers = React.useCallback(async () => {
        const customers = await getCustomers();
        setCustomers(customers);
    }, []);
    
    React.useEffect(() => {
        (async () => {
            loadBranches();
            loadCustomers();
        })();
    }, []);

    React.useEffect(() => {
       loadSalesMens();
    },[loadSalesMens]);

    const formik = useFormik({
        initialValues:{
            branch:0,
            vendor: 0,
            customer: 0,
            initDate:"",
            endDate:""
        },
        onSubmit
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                    {
                        session.rol === "1" ?
                            (
                                <select name="branch" 
                                    id="idSucursal" 
                                    value={formik.values.branch}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setBranchId(e.target.value);
                                    }}>
                                    <option value={0}> --- Sucursal ---</option>
                                    {
                                        branches.map((branch, id) => (
                                            <option key={id} value={branch.idSucursal}>{branch.sucursal}</option>
                                        ))
                                    }
                                </select>
                            ) : null
                    }

                    <select name="vendor" id="idVendedor" value={formik.values.salesMan} onChange={formik.handleChange}>
                        <option value={0}> --- Vendedor ---</option>
                        {
                            salesMen.map((salesMan, id) => (
                                <option key={id} value={salesMan.idUsuario}>{salesMan.nombre}</option>
                            ))
                        }
                    </select>
                    <select name="customer" id="idCliente" value={formik.values.customer} onChange={formik.handleChange}>
                        <option value="">
                            --- Cliente ---
                        </option>
                        {
                            customers.map((customer, id) => (
                                <option key={id} value={customer.idCliente}>{customer.nombre}</option>
                            ))
                        }
                    </select>
                    Fecha Inicio:
                    <input type="date" name="initDate" id="" value={formik.values.initDate} onChange={formik.handleChange}/>
                    Fecha Fin:
                    <input type="date" name="endDate" id="" value={formik.values.endDate} onChange={formik.handleChange}/>
                </div>

                <div>
                    <button type="submit" className="btn btn-primary">
                        Buscar
                    </button>
                </div>
            </form>
        </>
    );

};

export default SalesFilter;