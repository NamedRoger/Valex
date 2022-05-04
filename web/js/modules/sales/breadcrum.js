import * as React from "react";
import { modals } from "./constants";
import { Dropdown } from "react-bootstrap";
const SaleBreadcrum = ({openModal, customer}) => {
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
                        <button type="button" className="btn btn-success me-2" onClick={() => openModal({modal: modals.findCustomer, value: true})}>
                            <i className="bi bi-person-circle"></i>
                        </button>
                    </div>
                    <div className="pe-1 mb-xl-0">
                        <button type="button" className="btn btn-primary me-2" disabled={customer === null} onClick={() => openModal({modal: modals.findProduct, value: true})}>
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                    <div className="mb-xl-0">
                        <Dropdown className="btn-group dropdown">
                            <Dropdown.Toggle variant="warning" id="dropdownMenuDate">
                               Caja
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openModal({modal: modals.openCash, value: true})}>Abrir</Dropdown.Item>
                                <Dropdown.Item onClick={() => openModal({modal: modals.closeCash, value: true})}>Cerrar</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SaleBreadcrum;