import * as React from "react";
import { createRoot } from "react-dom/client";
import { SessionContext, SessionProvider } from "../../providers/useSession";
import FiltersCash from "./filters";
import { getRegisters } from "./request";
import CashReportTable from "./table";


const container = document.getElementById("divContainer");
const root = createRoot(container);

const CashReport = () => {
    const [session] = React.useContext(SessionContext);
    const [cashRegister, setCashRegister] = React.useState([]);

    const submitFilters = async (filters) => {
        const { branch } = filters;
        const registers = await getRegisters(branch);
        setCashRegister(registers);
    }

    return (
        <div className="row">
            <div className="card">
                <div className="card-body">
                    <h5>Arqueo de Cajas</h5>
                    <div className="row">
                        <div className="col">
                            <h6>Filtros</h6>
                            <FiltersCash onSubmit={submitFilters}></FiltersCash>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="table-responsive">
                                <CashReportTable data={cashRegister}></CashReportTable>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Module = () => (
    <SessionProvider>
        <CashReport></CashReport>
    </SessionProvider>
);

root.render(<Module />);