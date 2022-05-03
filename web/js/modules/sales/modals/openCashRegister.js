import * as React from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { modals } from "../constants";
import { openCashRegisert } from "../request";

const OpenCashRegister = ({ onPaid, show, onClose }) => {
    const formik = useFormik({
        initialValues: {
            paid: "",
        },
        onSubmit: async ({ paid }) => {
            const { data } = await openCashRegisert(paid);
            onPaid(data);
            handleClose();
        },
    });

    const handleClose = () => {
        onClose(modals.openCash);
        formik.resetForm();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <h5 className="modal-title" id="exampleModalLabel">Abrir Caja</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>

                    <div className="form-group">
                        <h4>Recibe:</h4>

                        <input className="form-control"
                            name="paid"
                            type="number"
                            required
                            value={formik.values.paid}
                            onChange={(e) => {
                                formik.handleChange(e);
                            }} />


                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" disabled={formik.values.paid == 0} type="submit">Abrir</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
};

export default OpenCashRegister;