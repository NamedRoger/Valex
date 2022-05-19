import * as React from "react";
import { CLIENTE_VENTA_KEY } from "../utils/constants";
import { getItemLocalStorage, hasItemLocalStorage, removeItemLocalStorage, setItemLocalStorage } from "../utils/functions";

const CustomerContext = React.createContext();

const CustomerProvider = ({children}) => {
    const [customer, setCustomer] = React.useState(() => {
        if (hasItemLocalStorage(CLIENTE_VENTA_KEY)) {
            const laodClient = JSON.parse(getItemLocalStorage(CLIENTE_VENTA_KEY));
            return laodClient;
        } else {
            return null
        }
    });

    const addCustomerToSale = (customer) => {
        customer = {
            ...customer,
            idCliente: new Number(customer.idCliente),
        }
        setItemLocalStorage(CLIENTE_VENTA_KEY, JSON.stringify(customer));
        setCustomer(customer);
    };

    const removeCustomerToSale = () => {
        removeItemLocalStorage(CLIENTE_VENTA_KEY);
        setCustomer(null);
    };
    
    return (
        <CustomerContext.Provider value={{ addCustomerToSale, customer, removeCustomerToSale}}>
            {children}
        </CustomerContext.Provider>
    );
};

export { CustomerContext, CustomerProvider };
