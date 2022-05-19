import * as React from "react";
import { PRODUCTOS_VENTA_KEY } from "../utils/constants";
import {
    getCusotmerPrice,
    getItemLocalStorage,
    hasItemLocalStorage,
    setItemLocalStorage
} from "../utils/functions";
import { CustomerContext } from "./useCustomerProvider";

const SalesContext = React.createContext();

const SalesProvider = ({ children }) => {
    const { customer } = React.useContext(CustomerContext);
    const [products, setProducts] = React.useState(() => {
        if (hasItemLocalStorage(PRODUCTOS_VENTA_KEY)) {
            const loadProducts = JSON.parse(getItemLocalStorage(PRODUCTOS_VENTA_KEY));
            return loadProducts;
        } else {
            return [];
        }
    });

    const addProduct = (product) => {
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

        setProducts([...products, product]);
    }

    const checkProductIntoSale = (product) => {
        return products.findIndex((productInSale) => productInSale.idProducto === product.idProducto) > -1;
    };

    const getProductIntoSale = (product) => {
        const index = products.findIndex((producInSale) => producInSale.idProducto === product.idProducto);
        const producInSale = products[index];
        return producInSale;
    }

    const addProductToSale = (product) => {
        if (checkProductIntoSale(product)) {
            const producInSale = getProductIntoSale(product);
            const newCantidad = producInSale.cantidad + 1;
            updateQuantityProduct(producInSale, newCantidad);
        } else {
            addProduct(product);
        }
    }

    const updateQuantityProduct = (product, quantity) => {
        const newCantidad = quantity;
        const updatedProducts = products.map(
            (productInSale) =>
            (productInSale.idProducto === product.idProducto
                ? { ...productInSale, cantidad: newCantidad } : productInSale)
        );
        setProducts(updatedProducts);
    }

    const removeProductToSale = (product) => {
        setProducts(products.filter((p) => p.idProducto !== product.idProducto));
    }

    const emptyProducsToSale = () => {
        setProducts([]);
    }

    React.useEffect(() => {
        (() => {
            setItemLocalStorage(PRODUCTOS_VENTA_KEY, JSON.stringify(products));
        })();
    }, [products, customer]);

    return (
        <SalesContext.Provider value={
            {
                products,
                addProductToSale,
                updateQuantityProduct,
                removeProductToSale,
                emptyProducsToSale
            }
        }>
            {children}
        </SalesContext.Provider>
    );
};

export { SalesContext, SalesProvider };
