import * as React from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { modals } from "../constants";
import { findCustomer } from "../request";
import { CustomerContext } from "../../../providers/useCustomerProvider";

const FindCustomerModal = ({ show, onClose }) => {
    const { addCustomerToSale } = React.useContext(CustomerContext);
    const [customers, setCustomers] = React.useState([]);

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: async ({ name }) => {
            const { data } = await findCustomer(name);
            setCustomers(data);
        }
    });

    const handleClose = () => {
        setCustomers([]);
        onClose(modals.findCustomer);
        formik.resetForm();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <h5 className="modal-title" id="exampleModalLabel">Agregar Cliente a Venta</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group row">
                        <div className="col-9">
                            <input className="form-control"
                                placeholder="Buscar..."
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange} />
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary" type="submit">Buscar</button>
                        </div>
                    </div>
                </form>

                <div>
                    <table style={{ width: "100%" }} >
                        <thead>
                            <tr>
                                <th>Cliente</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers.map((customer, id) => (
                                    <tr key={id}>
                                        <td>{customer.nombre}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => {
                                                    addCustomerToSale(customer);
                                                    handleClose();
                                                }}>
                                                Agregar
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default FindCustomerModal;