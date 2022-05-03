import * as React from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { modals } from "../constants";
import { closeCashRegiser, findProduct } from "../request";
import { totalCurrency } from "../../../utils/functions";

const CloseCashRegister = ({ onPaid, show, onClose, montoInicial }) => {
    const [total, setTotal] = React.useState(0);

    const formik = useFormik({
        initialValues: {
            "1000": 0,
            "500": 0,
            "200": 0,
            "100": 0,
            "50": 0,
            "20": 0,
            "monedas": 0,
        },
        onSubmit: async () => {
            await onPaid(total);
            handleClose();
        },
    });

    React.useEffect(() => {
        const moneyKeys = Object.keys(formik.values);
        const values = moneyKeys.map((key) => ( key === "monedas" ? new Number(formik.values[key]): new Number(key) * new Number(formik.values[key])));
        const total = values.reduce((sum, money) => sum += money ,0);
        setTotal(total);
    }, [formik.values]);

    const handleClose = () => {
        onClose(modals.closeCash);
        formik.resetForm();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <h5 className="modal-title" id="exampleModalLabel">Cerrar Caja</h5>
                <button type="button" className="btn-close" onClick={handleClose}></button>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <h4>Fondo:</h4>
                        </div>
                        <div className="col">
                            <h5 id="fondoCaja">{totalCurrency(montoInicial)}</h5>
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="" className="col">$1000</label>
                        <div className="col">
                            <input type="number" onChange={formik.handleChange} value={formik.values["1000"]} min="0" className="form-control input-cierre" name="1000" />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="" className="col">$500</label>
                        <div className="col">
                            <input type="number" onChange={formik.handleChange} value={formik.values["500"]} min="0" className="form-control input-cierre" name="500" />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="" className="col">$200</label>
                        <div className="col">
                            <input type="number" onChange={formik.handleChange} value={formik.values["200"]} min="0" className="form-control input-cierre" name="200" />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="" className="col">$100</label>
                        <div className="col">
                            <input type="number" onChange={formik.handleChange} value={formik.values["100"]} min="0" className="form-control input-cierre" name="100" />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="" className="col">$50</label>
                        <div className="col">
                            <input type="number" onChange={formik.handleChange} value={formik.values["50"]} min="0" className="form-control input-cierre" name="50" />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="" className="col">$20</label>
                        <div className="col">
                            <input type="number" onChange={formik.handleChange} value={formik.values["20"]} min="0" className="form-control input-cierre" name="20" />
                        </div>
                    </div>
                    <div className="row">
                        <label htmlFor="" className="col">Monedas</label>
                        <div className="col">
                            <input type="number" onChange={formik.handleChange} value={formik.values["monedas"]} min="0" className="form-control input-cierre" name="monedas" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <h4>Total:</h4>
                        </div>
                        <div className="col">
                            <h5 id="totalCierre">{totalCurrency(total)}</h5>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Pagar</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
};

export default CloseCashRegister;