import {
  CustomerContext,
  CustomerProvider,
  anyProductInStock,
  closeCashRegiser,
  closeCashRegister_default,
  closeSale,
  findCustomer_default,
  findProduct_default,
  modals,
  openCashRegister_default,
  paidSale_default
} from "../chunk-QU2G6765.js";
import {
  Dropdown_default,
  getCusotmerPrice,
  getItemLocalStorage,
  hasItemLocalStorage,
  removeItemLocalStorage,
  setItemLocalStorage,
  totalCurrency
} from "../chunk-FNXDCNBW.js";
import {
  require_client
} from "../chunk-HOMDFH47.js";
import {
  FONDO_KEY,
  PRODUCTOS_VENTA_KEY,
  __spreadProps,
  __spreadValues,
  __toESM,
  require_react
} from "../chunk-SRWE7FCD.js";

// web/js/modules/sales/index.js
var React5 = __toESM(require_react());
var import_client = __toESM(require_client());

// web/js/providers/useSale.js
var React = __toESM(require_react());
var SalesContext = React.createContext();
var SalesProvider = ({ children }) => {
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
    product = __spreadProps(__spreadValues({}, product), {
      mayoreo: new Number(product.mayoreo),
      medida: new Number(product.medida),
      medio: new Number(product.medio),
      venta: new Number(product.venta),
      precio,
      cantidad: 1
    });
    setProducts([...products, product]);
  };
  const checkProductIntoSale = (product) => {
    return products.findIndex((productInSale) => productInSale.idProducto === product.idProducto) > -1;
  };
  const getProductIntoSale = (product) => {
    const index = products.findIndex((producInSale2) => producInSale2.idProducto === product.idProducto);
    const producInSale = products[index];
    return producInSale;
  };
  const addProductToSale = (product) => {
    if (checkProductIntoSale(product)) {
      const producInSale = getProductIntoSale(product);
      const newCantidad = producInSale.cantidad + 1;
      updateQuantityProduct(producInSale, newCantidad);
    } else {
      addProduct(product);
    }
  };
  const updateQuantityProduct = (product, quantity) => {
    const newCantidad = quantity;
    const updatedProducts = products.map((productInSale) => productInSale.idProducto === product.idProducto ? __spreadProps(__spreadValues({}, productInSale), { cantidad: newCantidad }) : productInSale);
    setProducts(updatedProducts);
  };
  const removeProductToSale = (product) => {
    setProducts(products.filter((p) => p.idProducto !== product.idProducto));
  };
  const emptyProducsToSale = () => {
    setProducts([]);
  };
  React.useEffect(() => {
    (() => {
      setItemLocalStorage(PRODUCTOS_VENTA_KEY, JSON.stringify(products));
    })();
  }, [products, customer]);
  return /* @__PURE__ */ React.createElement(SalesContext.Provider, {
    value: {
      products,
      addProductToSale,
      updateQuantityProduct,
      removeProductToSale,
      emptyProducsToSale
    }
  }, children);
};

// web/js/modules/sales/breadcrum.js
var React2 = __toESM(require_react());
var SaleBreadcrum = ({ openModal }) => {
  const { customer } = React2.useContext(CustomerContext);
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("div", {
    className: "breadcrumb-header justify-content-between"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "my-auto"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "d-flex"
  }, /* @__PURE__ */ React2.createElement("h3", {
    className: "content-title mb-0 my-auto"
  }, "Venta"))), /* @__PURE__ */ React2.createElement("div", {
    className: "d-flex my-xl-auto right-content"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "pe-1 mb-xl-0"
  }, /* @__PURE__ */ React2.createElement("button", {
    type: "button",
    className: "btn btn-success me-2",
    onClick: () => openModal({ modal: modals.findCustomer, value: true })
  }, /* @__PURE__ */ React2.createElement("i", {
    className: "bi bi-person-circle"
  }))), /* @__PURE__ */ React2.createElement("div", {
    className: "pe-1 mb-xl-0"
  }, /* @__PURE__ */ React2.createElement("button", {
    type: "button",
    className: "btn btn-primary me-2",
    disabled: customer === null,
    onClick: () => openModal({ modal: modals.findProduct, value: true })
  }, /* @__PURE__ */ React2.createElement("i", {
    className: "bi bi-search"
  }))), /* @__PURE__ */ React2.createElement("div", {
    className: "mb-xl-0"
  }, /* @__PURE__ */ React2.createElement(Dropdown_default, {
    className: "btn-group dropdown"
  }, /* @__PURE__ */ React2.createElement(Dropdown_default.Toggle, {
    variant: "warning",
    id: "dropdownMenuDate"
  }, "Caja"), /* @__PURE__ */ React2.createElement(Dropdown_default.Menu, null, /* @__PURE__ */ React2.createElement(Dropdown_default.Item, {
    onClick: () => openModal({ modal: modals.openCash, value: true })
  }, "Abrir"), /* @__PURE__ */ React2.createElement(Dropdown_default.Item, {
    onClick: () => openModal({ modal: modals.closeCash, value: true })
  }, "Cerrar")))))));
};
var breadcrum_default = SaleBreadcrum;

// web/js/modules/sales/sale-detail.js
var React3 = __toESM(require_react());
var SaleDetail = ({ total, onCancelSale, onCloseSale }) => {
  const { customer } = React3.useContext(CustomerContext);
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("div", {
    className: "col-4"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "card"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "card-body"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React3.createElement("dl", null, /* @__PURE__ */ React3.createElement("dt", null, "Cliente"), /* @__PURE__ */ React3.createElement("dd", {
    id: "infoCliente"
  }, (customer == null ? void 0 : customer.nombre) || "---"), /* @__PURE__ */ React3.createElement("dt", null, "Total"), /* @__PURE__ */ React3.createElement("dd", {
    id: "totalVentaDetalle"
  }, totalCurrency(total))))), /* @__PURE__ */ React3.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React3.createElement("button", {
    id: "cancelarVenta",
    className: "btn btn-danger mr-1",
    onClick: onCancelSale
  }, "Cancelar"), /* @__PURE__ */ React3.createElement("button", {
    className: "btn btn-success",
    disabled: customer === null,
    onClick: onCloseSale
  }, "Finalizar")))))));
};
var sale_detail_default = SaleDetail;

// web/js/modules/sales/tabla.js
var React4 = __toESM(require_react());
var ProductsSalesTable = ({ total, onUpdateQuantity, onDeleteProduct }) => {
  const { products } = React4.useContext(SalesContext);
  return /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement("table", {
    className: "table table-bordered"
  }, /* @__PURE__ */ React4.createElement("thead", null, /* @__PURE__ */ React4.createElement("tr", null, /* @__PURE__ */ React4.createElement("td", null, "Producto"), /* @__PURE__ */ React4.createElement("td", null, "Precio"), /* @__PURE__ */ React4.createElement("td", null, "Cantidad"), /* @__PURE__ */ React4.createElement("td", null, "Total"), /* @__PURE__ */ React4.createElement("td", null))), /* @__PURE__ */ React4.createElement("tbody", null, products.map((product, id) => /* @__PURE__ */ React4.createElement("tr", {
    key: id
  }, /* @__PURE__ */ React4.createElement("td", null, product.nombre), /* @__PURE__ */ React4.createElement("td", null, totalCurrency(product.precio)), /* @__PURE__ */ React4.createElement("td", null, /* @__PURE__ */ React4.createElement("input", {
    type: "number",
    min: 1,
    value: product.cantidad,
    onChange: (e) => onUpdateQuantity(product, e.target.value)
  })), /* @__PURE__ */ React4.createElement("td", null, totalCurrency(product.cantidad * product.precio)), /* @__PURE__ */ React4.createElement("td", null, /* @__PURE__ */ React4.createElement("button", {
    className: "btn btn-sm btn-danger",
    onClick: () => onDeleteProduct(product)
  }, "Borrar"))))), /* @__PURE__ */ React4.createElement("tfoot", null, /* @__PURE__ */ React4.createElement("tr", {
    className: "tx-blod"
  }, /* @__PURE__ */ React4.createElement("td", {
    colSpan: "2"
  }), /* @__PURE__ */ React4.createElement("td", null, "TOTAL"), /* @__PURE__ */ React4.createElement("td", {
    id: "totalVentaTabla"
  }, totalCurrency(total))))));
};
var tabla_default = ProductsSalesTable;

// web/js/modules/sales/index.js
var container = document.getElementById("divContainer");
var root = (0, import_client.createRoot)(container);
var initModals = {
  findProduct: false,
  findCustomer: false,
  closeCash: false,
  openCash: false,
  paidSale: false
};
var reducer = (state, action) => {
  switch (action.modal) {
    case modals.findProduct:
      return __spreadProps(__spreadValues({}, state), { [action.modal]: action.value });
    case modals.findCustomer:
      return __spreadProps(__spreadValues({}, state), { [action.modal]: action.value });
    case modals.paidSale:
      return __spreadProps(__spreadValues({}, state), { [action.modal]: action.value });
    case modals.openCash:
      return __spreadProps(__spreadValues({}, state), { [action.modal]: action.value });
    case modals.closeCash:
      return __spreadProps(__spreadValues({}, state), { [action.modal]: action.value });
  }
};
var Sales = () => {
  const { removeCustomerToSale, customer } = React5.useContext(CustomerContext);
  const {
    products,
    addProductToSale,
    removeProductToSale,
    emptyProducsToSale,
    updateQuantityProduct
  } = React5.useContext(SalesContext);
  const [fondoCaja, setFondoCaja] = React5.useState(() => {
    if (hasItemLocalStorage(FONDO_KEY)) {
      const fondo = JSON.parse(getItemLocalStorage(FONDO_KEY));
      return fondo;
    } else {
      return null;
    }
  });
  const [totalSale, setTotalSale] = React5.useState(0);
  const [modalsState, dispatchModals] = React5.useReducer(reducer, initModals);
  const handleCloseModal = (modal) => dispatchModals({ modal, value: false });
  const cancelSale = () => {
    emptyProducsToSale();
    removeCustomerToSale();
  };
  const closeSaleModal = () => {
    dispatchModals({ modal: modals.paidSale, value: true });
  };
  const handleAddProduct = (product) => {
    (async () => {
      const anyProduct = await anyProductInStock(product);
      if (anyProduct) {
        addProductToSale(product);
        dispatchModals({ modal: modals.findProduct, value: false });
      } else {
      }
    })();
  };
  React5.useEffect(() => {
    (() => {
      const total = products.reduce((sum, product) => sum += product.cantidad * getCusotmerPrice(customer, product), 0);
      setTotalSale(total);
    })();
  }, [products, customer]);
  React5.useEffect(() => {
    if (!fondoCaja) {
      dispatchModals({ modal: modals.openCash, value: true });
    }
  }, []);
  React5.useEffect(() => {
    setItemLocalStorage(FONDO_KEY, JSON.stringify(fondoCaja));
  }, [fondoCaja]);
  return /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement(breadcrum_default, {
    openModal: ({ modal, value }) => {
      dispatchModals({ modal, value });
    }
  }), /* @__PURE__ */ React5.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "col-8"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "card"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "card-body"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "col table-responsive"
  }, /* @__PURE__ */ React5.createElement(tabla_default, {
    total: totalSale,
    onDeleteProduct: (product) => {
      removeProductToSale(product);
    },
    onUpdateQuantity: (product, cantidad) => {
      updateQuantityProduct(product, cantidad);
    }
  })))))), /* @__PURE__ */ React5.createElement(sale_detail_default, {
    total: totalSale,
    onCloseSale: closeSaleModal,
    onCancelSale: cancelSale
  })), /* @__PURE__ */ React5.createElement(findProduct_default, {
    show: modalsState.findProduct,
    onClose: handleCloseModal,
    selectedProduct: handleAddProduct
  }), /* @__PURE__ */ React5.createElement(findCustomer_default, {
    show: modalsState.findCustomer,
    onClose: handleCloseModal
  }), /* @__PURE__ */ React5.createElement(paidSale_default, {
    show: modalsState.paidSale,
    onClose: handleCloseModal,
    total: totalSale,
    onPaid: async ({ total, cambio, paid }) => {
      const { data, success } = await closeSale({ total, cambio, paid, customer, products });
      if (success) {
        cancelSale();
      }
    }
  }), /* @__PURE__ */ React5.createElement(openCashRegister_default, {
    show: modalsState.openCash,
    onClose: handleCloseModal,
    onPaid: ({ id, monto }) => {
      setFondoCaja({ id, monto });
    }
  }), /* @__PURE__ */ React5.createElement(closeCashRegister_default, {
    show: modalsState.closeCash,
    onClose: handleCloseModal,
    montoInicial: (fondoCaja == null ? void 0 : fondoCaja.monto) || 0,
    onPaid: async (total) => {
      const { data, success } = await closeCashRegiser(fondoCaja.id, total);
      if (success) {
        removeItemLocalStorage(FONDO_KEY);
      }
    }
  }));
};
var Module = () => {
  return /* @__PURE__ */ React5.createElement(CustomerProvider, null, /* @__PURE__ */ React5.createElement(SalesProvider, null, /* @__PURE__ */ React5.createElement(Sales, null)));
};
root.render(/* @__PURE__ */ React5.createElement(Module, null));
//# sourceMappingURL=index.js.map
