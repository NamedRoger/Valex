import * as React from "react";
import { createRoot } from "react-dom/client";
import { CLIENTE_VENTA_KEY, FONDO_KEY, PRODUCTOS_VENTA_KEY } from "../../utils/constants";
import { getCusotmerPrice, getItemLocalStorage, hasItemLocalStorage, removeItemLocalStorage, setItemLocalStorage } from "../../utils/functions";
import SaleBreadcrum from "./breadcrum";
import { modals } from "./constants";
import CloseCashRegister from "./modals/closeCashRegister";
import FindCustomerModal from "./modals/findCustomer";
import FindProductModal from "./modals/findProduct";
import OpenCashRegister from "./modals/openCashRegister";
import PaidSale from "./modals/paidSale";
import { anyProductInStock, closeCashRegiser, closeSale,  } from "./request";
import SaleDetail from "./sale-detail";
import ProductsSalesTable from "./tabla";

const container = document.getElementById("divContainer");
const root = createRoot(container);

const initModals = {
    findProduct: false,
    findCustomer: false,
    closeCash: false,
    openCash: false,
    paidSale: false,
};

const reducer = (state, action) => {
    switch (action.modal) {
        case modals.findProduct:
            return { ...state, [action.modal]: action.value };
        case modals.findCustomer:
            return { ...state, [action.modal]: action.value };
        case modals.paidSale:
            return { ...state, [action.modal]: action.value };
        case modals.openCash:
            return { ...state, [action.modal]: action.value };
        case modals.closeCash:
            return { ...state, [action.modal]: action.value };
    }
}


const Sales = () => {
    const [products, setProducts] = React.useState(() => {
        if (hasItemLocalStorage(PRODUCTOS_VENTA_KEY)) {
            const loadProducts = JSON.parse(getItemLocalStorage(PRODUCTOS_VENTA_KEY));
            return loadProducts;
        } else {
            return [];
        }
    });
    const [customer, setCustomer] = React.useState(() => {
        if (hasItemLocalStorage(CLIENTE_VENTA_KEY)) {
            const laodClient = JSON.parse(getItemLocalStorage(CLIENTE_VENTA_KEY));
            return laodClient;
        } else {
            return null
        }
    });
    const [fondoCaja, setFondoCaja] = React.useState(() => {
        if(hasItemLocalStorage(FONDO_KEY)){
            const fondo = JSON.parse(getItemLocalStorage(FONDO_KEY));
            return fondo;
        } else {
            return null;
        }
    });
    const [totalSale, setTotalSale] = React.useState(0);

    const [modalsState, dispatchModals] = React.useReducer(reducer, initModals);

    const handleCloseModal = (modal) => dispatchModals({ modal, value: false });

    const addCustomerToSale = (customer) => {
        customer = {
            ...customer,
            idCliente: new Number(customer.idCliente),
        }
        setItemLocalStorage(CLIENTE_VENTA_KEY, JSON.stringify(customer));
        setCustomer(customer);
    }

    const cancelSale = () => {
        setProducts([]);
        setCustomer(null);
    }

    const closeSaleModal = () => {
        dispatchModals({ modal: modals.paidSale, value: true })
    }

    const addProduct = (product) => {
        console.log(product);
        const precio = getCusotmerPrice(customer, product);
        product = {
            ...product,
            mayoreo: new Number(product.mayoreo),
            medida: new Number(product.medida),
            medio: new Number(product.medio),
            venta: new Number(product.venta),
            precio,
            cantidad: 1
        };
        console.log(product);

        setProducts([...products, product]);
    }

    const increaseAmountProduct = (product, quantity) => {
        const newCantidad = product.cantidad + quantity;
        const updatedProducts = products.map((productInSale) => (productInSale.idProducto === product.idProducto ? { ...productInSale, cantidad: newCantidad } : productInSale))
        setProducts(updatedProducts);
    }

    const updateQuantityProduct = (product, quantity) => {
        const newCantidad = quantity;
        const updatedProducts = products.map((productInSale) => (productInSale.idProducto === product.idProducto ? { ...productInSale, cantidad: newCantidad } : productInSale))
        setProducts(updatedProducts);
    }

    const checkProductIntoSale = (product) => {
        return products.findIndex((productInSale) => productInSale.idProducto === product.idProducto) > -1;
    };

    const getProductIntoSale = (product) => {
        const index = products.findIndex((producInSale) => producInSale.idProducto === product.idProducto);
        const producInSale = products[index];
        return producInSale;
    }

    const handleAddProduct = (product) => {
        (async () => {
            const anyProduct = await anyProductInStock(product);

            if (anyProduct) {
                if (checkProductIntoSale(product)) {
                    const productInSale = getProductIntoSale(product);
                    increaseAmountProduct(productInSale, 1);
                } else {
                    addProduct(product);
                }
                dispatchModals({ modal: modals.findProduct, value: false });
            } else {

            }
        })();
    }

    React.useEffect(() => {
        (() => {
            setItemLocalStorage(PRODUCTOS_VENTA_KEY, JSON.stringify(products));
            const total = products.reduce((sum, product) => sum += (product.cantidad * getCusotmerPrice(customer, product)), 0);
            setTotalSale(total);
        })();
    }, [products, customer]);

    React.useEffect(() => {
        (() => {
            setItemLocalStorage(CLIENTE_VENTA_KEY, JSON.stringify(customer));
        })();
    }, [customer]);

    React.useEffect(() => {
        if(!fondoCaja){
            dispatchModals({modal: modals.openCash, value: true});
        }
    }, []);

    React.useEffect(() => {
        setItemLocalStorage(FONDO_KEY, JSON.stringify(fondoCaja));
    },[fondoCaja]);


    return (
        <>
            <SaleBreadcrum openModal={({ modal, value }) => {
                dispatchModals({ modal, value });
            }}
                customer={customer}></SaleBreadcrum>
            <div className="row">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col table-responsive"> 
                                    <ProductsSalesTable
                                        products={products}
                                        total={totalSale}
                                        onDeleteProduct={(product) => { setProducts(products.filter((p) => p.idProducto !== product.idProducto)) }}
                                        onUpdateQuantity={(product, cantidad) => { updateQuantityProduct(product, cantidad) }}></ProductsSalesTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SaleDetail customer={customer} total={totalSale} onCloseSale={closeSaleModal} onCancelSale={cancelSale}></SaleDetail>
            </div>
            <FindProductModal
                show={modalsState.findProduct}
                onClose={handleCloseModal}
                selectedProduct={handleAddProduct}></FindProductModal>
            <FindCustomerModal
                show={modalsState.findCustomer}
                onClose={handleCloseModal}
                selectedCustomer={addCustomerToSale}></FindCustomerModal>
            <PaidSale
                show={modalsState.paidSale}
                onClose={handleCloseModal}
                total={totalSale}
                onPaid={async ({total, cambio, paid}) => {
                    const {data, success} = await closeSale({total, cambio, paid, customer, products});
                    if(success){
                        cancelSale();
                    }
                 }}></PaidSale>
            <OpenCashRegister
                show={modalsState.openCash}
                onClose={handleCloseModal}
                onPaid={({id, monto}) => {
                    setFondoCaja({id, monto});
                 }}></OpenCashRegister>
            <CloseCashRegister 
                show={modalsState.closeCash}
                onClose={handleCloseModal}
                montoInicial={fondoCaja?.monto || 0}
                onPaid={async (total) => {
                    const {data, success} = await closeCashRegiser(fondoCaja.id, total);
                    if(success){
                        removeItemLocalStorage(FONDO_KEY);
                    }
                 }}></CloseCashRegister>
        </>
    );
};

root.render(<Sales></Sales>);