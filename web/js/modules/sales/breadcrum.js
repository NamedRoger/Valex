import * as React from "react";

const SaleBreadcrum = () => {
    return (
        <>
            <div className="breadcrumb-header justify-content-between">
                <div className="my-auto">
                    <div className="d-flex">
                        <h3 className="content-title mb-0 my-auto">Venta</h3>
                    </div>
                </div>
                <div className="d-flex my-xl-auto right-content">
                    <div className="pe-1 mb-xl-0">
                        <button type="button" className="btn btn-success me-2">
                            <i className="bi bi-person-circle"></i>
                        </button>
                    </div>
                    <div className="pe-1 mb-xl-0">
                        <button type="button" className="btn btn-info me-2 btn-b" >
                            <i className="bi bi-person-plus"></i>
                        </button>
                    </div>
                    <div className="pe-1 mb-xl-0">
                        <button type="button" className="btn btn-primary me-2" >
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <div className="mb-xl-0">
                        <div className="btn-group dropdown">
                            <span className="btn btn-warning" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Caja</span>
                            <button type="button" className="btn btn-warning dropdown-toggle dropdown-toggle-split" id="dropdownMenuDate" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span className="sr-only">Toggle Dropdown</span>
                            </button>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate" x-placement="bottom-end">
                                <button className="dropdown-item" >Abrir</button>
                                <button className="dropdown-item">Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SaleBreadcrum;