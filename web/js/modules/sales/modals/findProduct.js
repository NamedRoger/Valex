import * as React from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { modals } from "../constants";
import { findProduct } from "../request";

const FindProductModal = ({ selectedProduct, show, onClose }) => {
    const [products, setProducts] = React.useState([]);

    const formik = useFormik({
        initialValues: {
            name: "",
        },
        onSubmit: async ({ name }) => {
            const { data } = await findProduct(name);
            setProducts(data);
        }
    });

    const handleClose = () => {
        setProducts([]);
        onClose(modals.findProduct);
        formik.resetForm();
    }
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <h5 className="modal-title" id="exampleModalLabel">Agregar Producto a Venta</h5>
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
                                <th>Producto</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((product, id) => (
                                    <tr key={id}>
                                        <td>{product.nombre}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => selectedProduct(product)}>
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

export default FindProductModal;