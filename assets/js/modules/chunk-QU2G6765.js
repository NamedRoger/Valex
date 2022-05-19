import {
  Modal_default,
  getItemLocalStorage,
  hasItemLocalStorage,
  removeItemLocalStorage as removeItemLocalStorage2,
  setItemLocalStorage,
  totalCurrency
} from "./chunk-FNXDCNBW.js";
import {
  CLIENTE_VENTA_KEY,
  __spreadProps,
  __spreadValues,
  __toESM,
  get,
  post,
  require_react,
  useFormik
} from "./chunk-SRWE7FCD.js";

// web/js/modules/sales/modals/addCustomer.js
var React = __toESM(require_react());
var AddCustomerModal = () => {
};
var addCustomer_default = AddCustomerModal;

// web/js/modules/sales/modals/closeCashRegister.js
var React2 = __toESM(require_react());

// web/js/modules/sales/constants.js
var modals = {
  findProduct: "findProduct",
  findCustomer: "findCustomer",
  closeCash: "closeCash",
  openCash: "openCash",
  paidSale: "paidSale"
};

// web/js/modules/sales/request.js
var closeSale = async ({ total, cambio, paid, customer, products }) => {
  const { data } = await post("/controller/ventas/crear.php", { total, cambio, paid, customer, products });
  return data;
};
var findCustomer = async (name) => {
  const { data } = await get("/controller/clientes/filtro.php?filter=" + name);
  return data;
};
var findProduct = async (name) => {
  const { data } = await get("/controller/productos/filtro.php?filter=" + name);
  return data;
};
var openCashRegisert = async (monto) => {
  const { data } = await post("/controller/caja/abrir.php", { monto });
  return data;
};
var closeCashRegiser = async (id, monto) => {
  const { data } = await post("/controller/caja/cerrar.php", { id, monto });
  return data;
};
var anyProductInStock = async (product) => {
  let { data } = await get("/controller/stock/validar?idProducto=" + product.idProducto);
  return data.data;
};

// web/js/modules/sales/modals/closeCashRegister.js
var CloseCashRegister = ({ onPaid, show, onClose, montoInicial }) => {
  const [total, setTotal] = React2.useState(0);
  const formik = useFormik({
    initialValues: {
      "1000": 0,
      "500": 0,
      "200": 0,
      "100": 0,
      "50": 0,
      "20": 0,
      "monedas": 0
    },
    onSubmit: async () => {
      await onPaid(total);
      handleClose();
    }
  });
  React2.useEffect(() => {
    const moneyKeys = Object.keys(formik.values);
    const values = moneyKeys.map((key) => key === "monedas" ? new Number(formik.values[key]) : new Number(key) * new Number(formik.values[key]));
    const total2 = values.reduce((sum, money) => sum += money, 0);
    setTotal(total2);
  }, [formik.values]);
  const handleClose = () => {
    onClose(modals.closeCash);
    formik.resetForm();
  };
  return /* @__PURE__ */ React2.createElement(Modal_default, {
    show,
    onHide: handleClose
  }, /* @__PURE__ */ React2.createElement(Modal_default.Header, null, /* @__PURE__ */ React2.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "Cerrar Caja"), /* @__PURE__ */ React2.createElement("button", {
    type: "button",
    className: "btn-close",
    onClick: handleClose
  })), /* @__PURE__ */ React2.createElement(Modal_default.Body, null, /* @__PURE__ */ React2.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("h4", null, "Fondo:")), /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("h5", {
    id: "fondoCaja"
  }, totalCurrency(montoInicial)))), /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("label", {
    htmlFor: "",
    className: "col"
  }, "$1000"), /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("input", {
    type: "number",
    onChange: formik.handleChange,
    value: formik.values["1000"],
    min: "0",
    className: "form-control input-cierre",
    name: "1000"
  }))), /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("label", {
    htmlFor: "",
    className: "col"
  }, "$500"), /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("input", {
    type: "number",
    onChange: formik.handleChange,
    value: formik.values["500"],
    min: "0",
    className: "form-control input-cierre",
    name: "500"
  }))), /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("label", {
    htmlFor: "",
    className: "col"
  }, "$200"), /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("input", {
    type: "number",
    onChange: formik.handleChange,
    value: formik.values["200"],
    min: "0",
    className: "form-control input-cierre",
    name: "200"
  }))), /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("label", {
    htmlFor: "",
    className: "col"
  }, "$100"), /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("input", {
    type: "number",
    onChange: formik.handleChange,
    value: formik.values["100"],
    min: "0",
    className: "form-control input-cierre",
    name: "100"
  }))), /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("label", {
    htmlFor: "",
    className: "col"
  }, "$50"), /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("input", {
    type: "number",
    onChange: formik.handleChange,
    value: formik.values["50"],
    min: "0",
    className: "form-control input-cierre",
    name: "50"
  }))), /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("label", {
    htmlFor: "",
    className: "col"
  }, "$20"), /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("input", {
    type: "number",
    onChange: formik.handleChange,
    value: formik.values["20"],
    min: "0",
    className: "form-control input-cierre",
    name: "20"
  }))), /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("label", {
    htmlFor: "",
    className: "col"
  }, "Monedas"), /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("input", {
    type: "number",
    onChange: formik.handleChange,
    value: formik.values["monedas"],
    min: "0",
    className: "form-control input-cierre",
    name: "monedas"
  }))), /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("h4", null, "Total:")), /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("h5", {
    id: "totalCierre"
  }, totalCurrency(total)))), /* @__PURE__ */ React2.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React2.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Pagar")))));
};
var closeCashRegister_default = CloseCashRegister;

// web/js/modules/sales/modals/findCustomer.js
var React4 = __toESM(require_react());

// web/js/providers/useCustomerProvider.js
var React3 = __toESM(require_react());
var CustomerContext = React3.createContext();
var CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = React3.useState(() => {
    if (hasItemLocalStorage(CLIENTE_VENTA_KEY)) {
      const laodClient = JSON.parse(getItemLocalStorage(CLIENTE_VENTA_KEY));
      return laodClient;
    } else {
      return null;
    }
  });
  const addCustomerToSale = (customer2) => {
    customer2 = __spreadProps(__spreadValues({}, customer2), {
      idCliente: new Number(customer2.idCliente)
    });
    setItemLocalStorage(CLIENTE_VENTA_KEY, JSON.stringify(customer2));
    setCustomer(customer2);
  };
  const removeCustomerToSale = () => {
    removeItemLocalStorage2(CLIENTE_VENTA_KEY);
    setCustomer(null);
  };
  return /* @__PURE__ */ React3.createElement(CustomerContext.Provider, {
    value: { addCustomerToSale, customer, removeCustomerToSale }
  }, children);
};

// web/js/modules/sales/modals/findCustomer.js
var FindCustomerModal = ({ show, onClose }) => {
  const { addCustomerToSale } = React4.useContext(CustomerContext);
  const [customers, setCustomers] = React4.useState([]);
  const formik = useFormik({
    initialValues: {
      name: ""
    },
    onSubmit: async ({ name }) => {
      const { data } = await findCustomer(name);
      setCustomers(data);
    }
  });
  const handleClose = () => {
    setCustomers([]);
    onClose(modals.findCustomer);
    formik.resetForm();
  };
  return /* @__PURE__ */ React4.createElement(Modal_default, {
    show,
    onHide: handleClose
  }, /* @__PURE__ */ React4.createElement(Modal_default.Header, null, /* @__PURE__ */ React4.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "Agregar Cliente a Venta"), /* @__PURE__ */ React4.createElement("button", {
    type: "button",
    className: "btn-close",
    onClick: handleClose
  })), /* @__PURE__ */ React4.createElement(Modal_default.Body, null, /* @__PURE__ */ React4.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "form-group row"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "col-9"
  }, /* @__PURE__ */ React4.createElement("input", {
    className: "form-control",
    placeholder: "Buscar...",
    name: "name",
    value: formik.values.name,
    onChange: formik.handleChange
  })), /* @__PURE__ */ React4.createElement("div", {
    className: "col-3"
  }, /* @__PURE__ */ React4.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Buscar")))), /* @__PURE__ */ React4.createElement("div", null, /* @__PURE__ */ React4.createElement("table", {
    style: { width: "100%" }
  }, /* @__PURE__ */ React4.createElement("thead", null, /* @__PURE__ */ React4.createElement("tr", null, /* @__PURE__ */ React4.createElement("th", null, "Cliente"), /* @__PURE__ */ React4.createElement("th", null, "Acci\xF3n"))), /* @__PURE__ */ React4.createElement("tbody", null, customers.map((customer, id) => /* @__PURE__ */ React4.createElement("tr", {
    key: id
  }, /* @__PURE__ */ React4.createElement("td", null, customer.nombre), /* @__PURE__ */ React4.createElement("td", null, /* @__PURE__ */ React4.createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: () => {
      addCustomerToSale(customer);
      handleClose();
    }
  }, "Agregar")))))))));
};
var findCustomer_default = FindCustomerModal;

// web/js/modules/sales/modals/findProduct.js
var React5 = __toESM(require_react());
var FindProductModal = ({ selectedProduct, show, onClose }) => {
  const [products, setProducts] = React5.useState([]);
  const formik = useFormik({
    initialValues: {
      name: ""
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
  };
  return /* @__PURE__ */ React5.createElement(Modal_default, {
    show,
    onHide: handleClose
  }, /* @__PURE__ */ React5.createElement(Modal_default.Header, null, /* @__PURE__ */ React5.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "Agregar Producto a Venta"), /* @__PURE__ */ React5.createElement("button", {
    type: "button",
    className: "btn-close",
    onClick: handleClose
  })), /* @__PURE__ */ React5.createElement(Modal_default.Body, null, /* @__PURE__ */ React5.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "form-group row"
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "col-9"
  }, /* @__PURE__ */ React5.createElement("input", {
    className: "form-control",
    placeholder: "Buscar...",
    name: "name",
    value: formik.values.name,
    onChange: formik.handleChange
  })), /* @__PURE__ */ React5.createElement("div", {
    className: "col-3"
  }, /* @__PURE__ */ React5.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Buscar")))), /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement("table", {
    style: { width: "100%" }
  }, /* @__PURE__ */ React5.createElement("thead", null, /* @__PURE__ */ React5.createElement("tr", null, /* @__PURE__ */ React5.createElement("th", null, "Producto"), /* @__PURE__ */ React5.createElement("th", null, "Acci\xF3n"))), /* @__PURE__ */ React5.createElement("tbody", null, products.map((product, id) => /* @__PURE__ */ React5.createElement("tr", {
    key: id
  }, /* @__PURE__ */ React5.createElement("td", null, product.nombre), /* @__PURE__ */ React5.createElement("td", null, /* @__PURE__ */ React5.createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: () => selectedProduct(product)
  }, "Agregar")))))))));
};
var findProduct_default = FindProductModal;

// web/js/modules/sales/modals/openCashRegister.js
var React6 = __toESM(require_react());
var OpenCashRegister = ({ onPaid, show, onClose }) => {
  const formik = useFormik({
    initialValues: {
      paid: ""
    },
    onSubmit: async ({ paid }) => {
      const { data } = await openCashRegisert(paid);
      onPaid(data);
      handleClose();
    }
  });
  const handleClose = () => {
    onClose(modals.openCash);
    formik.resetForm();
  };
  return /* @__PURE__ */ React6.createElement(Modal_default, {
    show,
    onHide: handleClose
  }, /* @__PURE__ */ React6.createElement(Modal_default.Header, null, /* @__PURE__ */ React6.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "Abrir Caja"), /* @__PURE__ */ React6.createElement("button", {
    type: "button",
    className: "btn-close",
    onClick: handleClose
  })), /* @__PURE__ */ React6.createElement(Modal_default.Body, null, /* @__PURE__ */ React6.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /* @__PURE__ */ React6.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React6.createElement("h4", null, "Recibe:"), /* @__PURE__ */ React6.createElement("input", {
    className: "form-control",
    name: "paid",
    type: "number",
    required: true,
    value: formik.values.paid,
    onChange: (e) => {
      formik.handleChange(e);
    }
  })), /* @__PURE__ */ React6.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React6.createElement("button", {
    className: "btn btn-primary",
    disabled: formik.values.paid == 0,
    type: "submit"
  }, "Abrir")))));
};
var openCashRegister_default = OpenCashRegister;

// web/js/modules/sales/modals/paidSale.js
var React7 = __toESM(require_react());
var PaidSale = ({ onPaid, show, onClose, total }) => {
  const [cambio, setCambio] = React7.useState(0);
  const formik = useFormik({
    initialValues: {
      paid: ""
    },
    onSubmit: async ({ paid }) => {
      await onPaid({ total, cambio, paid });
      handleClose();
    }
  });
  const handleClose = () => {
    setCambio(0);
    onClose(modals.paidSale);
    formik.resetForm();
  };
  React7.useEffect(() => {
    setCambio(formik.values.paid - total);
  }, [formik.values.paid]);
  return /* @__PURE__ */ React7.createElement(Modal_default, {
    show,
    onHide: handleClose
  }, /* @__PURE__ */ React7.createElement(Modal_default.Header, null, /* @__PURE__ */ React7.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "Pagar Venta"), /* @__PURE__ */ React7.createElement("button", {
    type: "button",
    className: "btn-close",
    onClick: handleClose
  })), /* @__PURE__ */ React7.createElement(Modal_default.Body, null, /* @__PURE__ */ React7.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /* @__PURE__ */ React7.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React7.createElement("h4", null, "Total Venta:"), /* @__PURE__ */ React7.createElement("span", null, totalCurrency(total))), /* @__PURE__ */ React7.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React7.createElement("h4", null, "Recibe:"), /* @__PURE__ */ React7.createElement("input", {
    className: "form-control",
    name: "paid",
    type: "number",
    required: true,
    value: formik.values.paid,
    onChange: formik.handleChange
  }), /* @__PURE__ */ React7.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React7.createElement("h4", null, "Cambio Venta:"), /* @__PURE__ */ React7.createElement("span", null, totalCurrency(cambio))), /* @__PURE__ */ React7.createElement("div", {
    className: "col-3"
  }, /* @__PURE__ */ React7.createElement("button", {
    className: "btn btn-primary",
    disabled: cambio < 0 || formik.values.paid == 0,
    type: "submit"
  }, "Pagar"))))));
};
var paidSale_default = PaidSale;

export {
  CustomerContext,
  CustomerProvider,
  modals,
  addCustomer_default,
  closeSale,
  closeCashRegiser,
  anyProductInStock,
  closeCashRegister_default,
  findCustomer_default,
  findProduct_default,
  openCashRegister_default,
  paidSale_default
};
//# sourceMappingURL=chunk-QU2G6765.js.map
