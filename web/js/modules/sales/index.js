import * as React from "react";
import { createRoot } from "react-dom/client";
import SaleBreadcrum from "./breadcrum";
import SaleDetail from "./sale-detail";
import ProductsSalesTable from "./tabla";

const container = document.getElementById("divContainer");
const root = createRoot(container);

const Sales = () => {
    const [products, setProducts] = React.useState([]);
    const [customer, setCustomer] = React.useState(null);
    const [totalSale, setTotalSale] = React.useState(0);

    const addCustomerToSale = () => {

    }

    const cancelSale = () => {

    }

    const closeSale = () => {

    }

    const addProduct = () => {
        
    }


    return (
        <>
            <SaleBreadcrum></SaleBreadcrum>
            <div className="row">
                <div className="col-8">
                    <div className="card">
                        <div className="card-body">
                            <div className="row">
                                <div className="col table-responsive">
                                    <ProductsSalesTable products={products} total={totalSale}></ProductsSalesTable>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SaleDetail customer={customer?.nombre || "---"} total={totalSale}></SaleDetail>
            </div>
        </>
    );
};

root.render(<Sales></Sales>);