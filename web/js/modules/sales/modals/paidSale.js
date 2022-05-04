import * as React from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { modals } from "../constants";
import { totalCurrency } from "../../../utils/functions";

const PaidSale = ({ onPaid, show, onClose, total }) => {
    const [cambio, setCambio] = React.useState(0);

    const formik = useFormik({
        initialValues: {
            paid: "",
        },
        onSubmit: async ({ paid }) => {
            await onPaid({total, cambio, paid});
            handleClose();
        },
    });

    const handleClose = () => {
        setCambio(0);
        onClose(modals.paidSale);
        formik.resetForm();
    }

    React.useEffect(() => {
        setCambio(formik.values.paid - total);
    }, [formik.values.paid]);
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <h5 className="modal-title" id="exampleModalLabel">Pagar Venta</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <h4>Total Venta:</h4>
                        <span >{totalCurrency(total)}</span>
                    </div>
                    <div className="form-group">
                        <h4>Recibe:</h4>

                        <input className="form-control"
                            name="paid"
                            type="number"
                            required
                            value={formik.values.paid}
                            onChange={formik.handleChange} />
                        <div className="form-group">
                            <h4>Cambio Venta:</h4>
                            <span >{totalCurrency(cambio)}</span>
                        </div>
                        <div className="col-3">
                            <button className="btn btn-primary" disabled={cambio < 0 || formik.values.paid == 0} type="submit">Pagar</button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
};

export default PaidSale;