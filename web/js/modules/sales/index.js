import * as React from "react";
import { createRoot } from "react-dom/client";
import { CustomerProvider, CustomerContext } from "../../providers/useCustomerProvider";
import { SalesContext, SalesProvider } from "../../providers/useSale";
import { FONDO_KEY } from "../../utils/constants";
import { 
    getCusotmerPrice, 
    getItemLocalStorage, 
    hasItemLocalStorage, 
    removeItemLocalStorage, 
    setItemLocalStorage 
} from "../../utils/functions";
import SaleBreadcrum from "./breadcrum";
import { modals } from "./constants";
import { 
    CloseCashRegister,
    FindCustomerModal,
    FindProductModal,
    OpenCashRegister,
    PaidSale 
} from "./modals";
import { anyProductInStock, closeCashRegiser, closeSale, } from "./request";
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
    const { removeCustomerToSale, customer } = React.useContext(CustomerContext);
    const {
        products,
        addProductToSale,
        removeProductToSale,
        emptyProducsToSale,
        updateQuantityProduct
    } = React.useContext(SalesContext);

    const [fondoCaja, setFondoCaja] = React.useState(() => {
        if (hasItemLocalStorage(FONDO_KEY)) {
            const fondo = JSON.parse(getItemLocalStorage(FONDO_KEY));
            return fondo;
        } else {
            return null;
        }
    });
    const [totalSale, setTotalSale] = React.useState(0);

    const [modalsState, dispatchModals] = React.useReducer(reducer, initModals);

    const handleCloseModal = (modal) => dispatchModals({ modal, value: false });

    const cancelSale = () => {
        emptyProducsToSale();
        removeCustomerToSale();
    }

    const closeSaleModal = () => {
        dispatchModals({ modal: modals.paidSale, value: true })
    }

    const handleAddProduct = (product) => {
        (async () => {
            const anyProduct = await anyProductInStock(product);

            if (anyProduct) {
                addProductToSale(product);
                dispatchModals({ modal: modals.findProduct, value: false });
            } else {

            }
        })();
    }

    React.useEffect(() => {
        (() => {
            const total = products.reduce((sum, product) => sum += (product.cantidad * getCusotmerPrice(customer, product)), 0);
            setTotalSale(total);
        })();
    }, [products, customer]);

    React.useEffect(() => {
        if (!fondoCaja) {
            dispatchModals({ modal: modals.openCash, value: true });
        }
    }, []);

    React.useEffect(() => {
        setItemLocalStorage(FONDO_KEY, JSON.stringify(fondoCaja));
    }, [fondoCaja]);


    return (
        <>
            <SaleBreadcrum openModal={({ modal, value }) => {
                dispatchModals({ modal, value });
            }} />
            <div className="row">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col table-responsive">
                                    <ProductsSalesTable
                                        total={totalSale}
                                        onDeleteProduct={(product) => { removeProductToSale(product) }}
                                        onUpdateQuantity={(product, cantidad) => { updateQuantityProduct(product, cantidad) }}></ProductsSalesTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SaleDetail
                    total={totalSale}
                    onCloseSale={closeSaleModal}
                    onCancelSale={cancelSale} />
            </div>
            <FindProductModal
                show={modalsState.findProduct}
                onClose={handleCloseModal}
                selectedProduct={handleAddProduct} />
            <FindCustomerModal
                show={modalsState.findCustomer}
                onClose={handleCloseModal} />
            <PaidSale
                show={modalsState.paidSale}
                onClose={handleCloseModal}
                total={totalSale}
                onPaid={async ({ total, cambio, paid }) => {
                    const { data, success } = await closeSale({ total, cambio, paid, customer, products });
                    if (success) {
                        cancelSale();
                    }
                }} />
            <OpenCashRegister
                show={modalsState.openCash}
                onClose={handleCloseModal}
                onPaid={({ id, monto }) => {
                    setFondoCaja({ id, monto });
                }} />
            <CloseCashRegister
                show={modalsState.closeCash}
                onClose={handleCloseModal}
                montoInicial={fondoCaja?.monto || 0}
                onPaid={async (total) => {
                    const { data, success } = await closeCashRegiser(fondoCaja.id, total);
                    if (success) {
                        removeItemLocalStorage(FONDO_KEY);
                    }
                }} />
        </>
    );
};

const Module = () => {
    return (
        <CustomerProvider>
            <SalesProvider>
                <Sales />
            </SalesProvider>
        </CustomerProvider>
    );
};

root.render(<Module></Module>);