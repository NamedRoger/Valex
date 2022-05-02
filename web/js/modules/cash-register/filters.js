import * as React from "react";
import { useFormik } from "formik";
import { getBranches } from "./request";

const FiltersCash = ({ onSubmit }) => {
    const [branches, setBranches] = React.useState([]);

    const loadBranches = React.useCallback(async () => {
        const branches = await getBranches();
        setBranches(branches);
    }, []);

    React.useEffect(() => {
        (async () => {
            loadBranches();
        })();
    }, []);

    const formik = useFormik({
        initialValues: {
            branch: 0
        },
        onSubmit
    });
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <select name="branch"
                    id="idSucursal"
                    value={formik.values.branch}
                    onChange={(e) => {
                        formik.handleChange(e);
                    }}>
                    <option value={0}> --- Sucursal ---</option>
                    {
                        branches.map((branch, id) => (
                            <option key={id} value={branch.idSucursal}>{branch.sucursal}</option>
                        ))
                    }
                </select>

                <button type="submit" className="btn btn-primary">Buscar</button>
            </form>
        </>
    );
};

export default FiltersCash;