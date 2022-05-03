import {
  Dropdown_default,
  Modal_default,
  getCusotmerPrice,
  getItemLocalStorage,
  hasItemLocalStorage,
  removeItemLocalStorage as removeItemLocalStorage2,
  setItemLocalStorage,
  totalCurrency
} from "../chunk-JOUDELDQ.js";
import {
  CLIENTE_VENTA_KEY,
  FONDO_KEY,
  PRODUCTOS_VENTA_KEY,
  __spreadProps,
  __spreadValues,
  __toESM,
  get,
  post,
  require_client,
  require_react,
  useFormik
} from "../chunk-D4D5XAUL.js";

// web/js/modules/sales/index.js
var React9 = __toESM(require_react());
var import_client = __toESM(require_client());

// web/js/modules/sales/breadcrum.js
var React = __toESM(require_react());

// web/js/modules/sales/constants.js
var modals = {
  findProduct: "findProduct",
  findCustomer: "findCustomer",
  closeCash: "closeCash",
  openCash: "openCash",
  paidSale: "paidSale"
};

// web/js/modules/sales/breadcrum.js
var SaleBreadcrum = ({ openModal, customer }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "breadcrumb-header justify-content-between"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "my-auto"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "d-flex"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "content-title mb-0 my-auto"
  }, "Venta"))), /* @__PURE__ */ React.createElement("div", {
    className: "d-flex my-xl-auto right-content"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pe-1 mb-xl-0"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "btn btn-success me-2",
    onClick: () => openModal({ modal: modals.findCustomer, value: true })
  }, /* @__PURE__ */ React.createElement("i", {
    className: "bi bi-person-circle"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "pe-1 mb-xl-0"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "btn btn-info me-2 btn-b",
    "data-bs-toggle": "modal",
    "data-bs-target": "#nuevoCliente"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "bi bi-person-plus"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "pe-1 mb-xl-0"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "btn btn-primary me-2",
    disabled: customer === null,
    onClick: () => openModal({ modal: modals.findProduct, value: true })
  }, /* @__PURE__ */ React.createElement("i", {
    className: "bi bi-search"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "mb-xl-0"
  }, /* @__PURE__ */ React.createElement(Dropdown_default, {
    className: "btn-group dropdown"
  }, /* @__PURE__ */ React.createElement(Dropdown_default.Toggle, {
    variant: "warning",
    id: "dropdownMenuDate"
  }, "Caja"), /* @__PURE__ */ React.createElement(Dropdown_default.Menu, null, /* @__PURE__ */ React.createElement(Dropdown_default.Item, {
    onClick: () => openModal({ modal: modals.openCash, value: true })
  }, "Abrir"), /* @__PURE__ */ React.createElement(Dropdown_default.Item, {
    onClick: () => openModal({ modal: modals.closeCash, value: true })
  }, "Cerrar")))))));
};
var breadcrum_default = SaleBreadcrum;

// web/js/modules/sales/modals/closeCashRegister.js
var React2 = __toESM(require_react());

// web/js/modules/sales/request.js
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
var React3 = __toESM(require_react());
var FindCustomerModal = ({ selectedCustomer, show, onClose }) => {
  const [customers, setCustomers] = React3.useState([]);
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
  return /* @__PURE__ */ React3.createElement(Modal_default, {
    show,
    onHide: handleClose
  }, /* @__PURE__ */ React3.createElement(Modal_default.Header, null, /* @__PURE__ */ React3.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "Agregar Cliente a Venta"), /* @__PURE__ */ React3.createElement("button", {
    type: "button",
    className: "btn-close",
    onClick: handleClose
  })), /* @__PURE__ */ React3.createElement(Modal_default.Body, null, /* @__PURE__ */ React3.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "form-group row"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "col-9"
  }, /* @__PURE__ */ React3.createElement("input", {
    className: "form-control",
    placeholder: "Buscar...",
    name: "name",
    value: formik.values.name,
    onChange: formik.handleChange
  })), /* @__PURE__ */ React3.createElement("div", {
    className: "col-3"
  }, /* @__PURE__ */ React3.createElement("button", {
    className: "btn btn-primary",
    type: "submit"
  }, "Buscar")))), /* @__PURE__ */ React3.createElement("div", null, /* @__PURE__ */ React3.createElement("table", {
    style: { width: "100%" }
  }, /* @__PURE__ */ React3.createElement("thead", null, /* @__PURE__ */ React3.createElement("tr", null, /* @__PURE__ */ React3.createElement("th", null, "Cliente"), /* @__PURE__ */ React3.createElement("th", null, "Acci\xF3n"))), /* @__PURE__ */ React3.createElement("tbody", null, customers.map((customer, id) => /* @__PURE__ */ React3.createElement("tr", {
    key: id
  }, /* @__PURE__ */ React3.createElement("td", null, customer.nombre), /* @__PURE__ */ React3.createElement("td", null, /* @__PURE__ */ React3.createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: () => {
      selectedCustomer(customer);
      handleClose();
    }
  }, "Agregar")))))))));
};
var findCustomer_default = FindCustomerModal;

// web/js/modules/sales/modals/findProduct.js
var React4 = __toESM(require_react());
var FindProductModal = ({ selectedProduct, show, onClose }) => {
  const [products, setProducts] = React4.useState([]);
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
  return /* @__PURE__ */ React4.createElement(Modal_default, {
    show,
    onHide: handleClose
  }, /* @__PURE__ */ React4.createElement(Modal_default.Header, null, /* @__PURE__ */ React4.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "Agregar Producto a Venta"), /* @__PURE__ */ React4.createElement("button", {
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
  }, /* @__PURE__ */ React4.createElement("thead", null, /* @__PURE__ */ React4.createElement("tr", null, /* @__PURE__ */ React4.createElement("th", null, "Producto"), /* @__PURE__ */ React4.createElement("th", null, "Acci\xF3n"))), /* @__PURE__ */ React4.createElement("tbody", null, products.map((product, id) => /* @__PURE__ */ React4.createElement("tr", {
    key: id
  }, /* @__PURE__ */ React4.createElement("td", null, product.nombre), /* @__PURE__ */ React4.createElement("td", null, /* @__PURE__ */ React4.createElement("button", {
    className: "btn btn-sm btn-success",
    onClick: () => selectedProduct(product)
  }, "Agregar")))))))));
};
var findProduct_default = FindProductModal;

// web/js/modules/sales/modals/openCashRegister.js
var React5 = __toESM(require_react());
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
  return /* @__PURE__ */ React5.createElement(Modal_default, {
    show,
    onHide: handleClose
  }, /* @__PURE__ */ React5.createElement(Modal_default.Header, null, /* @__PURE__ */ React5.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "Abrir Caja"), /* @__PURE__ */ React5.createElement("button", {
    type: "button",
    className: "btn-close",
    onClick: handleClose
  })), /* @__PURE__ */ React5.createElement(Modal_default.Body, null, /* @__PURE__ */ React5.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /* @__PURE__ */ React5.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React5.createElement("h4", null, "Recibe:"), /* @__PURE__ */ React5.createElement("input", {
    className: "form-control",
    name: "paid",
    type: "number",
    required: true,
    value: formik.values.paid,
    onChange: (e) => {
      formik.handleChange(e);
    }
  })), /* @__PURE__ */ React5.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React5.createElement("button", {
    className: "btn btn-primary",
    disabled: formik.values.paid == 0,
    type: "submit"
  }, "Abrir")))));
};
var openCashRegister_default = OpenCashRegister;

// web/js/modules/sales/modals/paidSale.js
var React6 = __toESM(require_react());
var PaidSale = ({ onPaid, show, onClose, total }) => {
  const [cambio, setCambio] = React6.useState(0);
  const formik = useFormik({
    initialValues: {
      paid: ""
    },
    onSubmit: async ({ name }) => {
      const { data } = await findProduct(name);
    }
  });
  const handleClose = () => {
    setCambio(0);
    onClose(modals.paidSale);
    formik.resetForm();
  };
  return /* @__PURE__ */ React6.createElement(Modal_default, {
    show,
    onHide: handleClose
  }, /* @__PURE__ */ React6.createElement(Modal_default.Header, null, /* @__PURE__ */ React6.createElement("h5", {
    className: "modal-title",
    id: "exampleModalLabel"
  }, "Pagar Venta"), /* @__PURE__ */ React6.createElement("button", {
    type: "button",
    className: "btn-close",
    onClick: handleClose
  })), /* @__PURE__ */ React6.createElement(Modal_default.Body, null, /* @__PURE__ */ React6.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /* @__PURE__ */ React6.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React6.createElement("h4", null, "Total Venta:"), /* @__PURE__ */ React6.createElement("span", null, totalCurrency(total))), /* @__PURE__ */ React6.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React6.createElement("h4", null, "Recibe:"), /* @__PURE__ */ React6.createElement("input", {
    className: "form-control",
    name: "paid",
    type: "number",
    required: true,
    value: formik.values.paid,
    onChange: (e) => {
      setCambio(formik.values.paid - total);
      formik.handleChange(e);
    }
  }), /* @__PURE__ */ React6.createElement("div", {
    className: "form-group"
  }, /* @__PURE__ */ React6.createElement("h4", null, "Cambio Venta:"), /* @__PURE__ */ React6.createElement("span", null, totalCurrency(cambio))), /* @__PURE__ */ React6.createElement("div", {
    className: "col-3"
  }, /* @__PURE__ */ React6.createElement("button", {
    className: "btn btn-primary",
    disabled: cambio < 0 || formik.values.paid == 0,
    type: "submit"
  }, "Pagar"))))));
};
var paidSale_default = PaidSale;

// web/js/modules/sales/sale-detail.js
var React7 = __toESM(require_react());
var SaleDetail = ({ customer, total, onCancelSale, onCloseSale }) => {
  return /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement("div", {
    className: "col-4"
  }, /* @__PURE__ */ React7.createElement("div", {
    className: "card"
  }, /* @__PURE__ */ React7.createElement("div", {
    className: "card-body"
  }, /* @__PURE__ */ React7.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React7.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React7.createElement("dl", null, /* @__PURE__ */ React7.createElement("dt", null, "Cliente"), /* @__PURE__ */ React7.createElement("dd", {
    id: "infoCliente"
  }, (customer == null ? void 0 : customer.nombre) || "---"), /* @__PURE__ */ React7.createElement("dt", null, "Total"), /* @__PURE__ */ React7.createElement("dd", {
    id: "totalVentaDetalle"
  }, totalCurrency(total))))), /* @__PURE__ */ React7.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React7.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React7.createElement("button", {
    id: "cancelarVenta",
    className: "btn btn-danger mr-1",
    onClick: onCancelSale
  }, "Cancelar"), /* @__PURE__ */ React7.createElement("button", {
    className: "btn btn-success",
    disabled: customer === null,
    onClick: onCloseSale
  }, "Finalizar")))))));
};
var sale_detail_default = SaleDetail;

// web/js/modules/sales/tabla.js
var React8 = __toESM(require_react());
var ProductsSalesTable = ({ products, total, onUpdateQuantity, onDeleteProduct }) => {
  return /* @__PURE__ */ React8.createElement(React8.Fragment, null, /* @__PURE__ */ React8.createElement("table", {
    className: "table table-bordered"
  }, /* @__PURE__ */ React8.createElement("thead", null, /* @__PURE__ */ React8.createElement("tr", null, /* @__PURE__ */ React8.createElement("td", null, "Producto"), /* @__PURE__ */ React8.createElement("td", null, "Precio"), /* @__PURE__ */ React8.createElement("td", null, "Cantidad"), /* @__PURE__ */ React8.createElement("td", null, "Total"), /* @__PURE__ */ React8.createElement("td", null))), /* @__PURE__ */ React8.createElement("tbody", null, products.map((product, id) => /* @__PURE__ */ React8.createElement("tr", {
    key: id
  }, /* @__PURE__ */ React8.createElement("td", null, product.nombre), /* @__PURE__ */ React8.createElement("td", null, totalCurrency(product.precio)), /* @__PURE__ */ React8.createElement("td", null, /* @__PURE__ */ React8.createElement("input", {
    type: "number",
    min: 1,
    value: product.cantidad,
    onChange: (e) => onUpdateQuantity(product, e.target.value)
  })), /* @__PURE__ */ React8.createElement("td", null, totalCurrency(product.cantidad * product.precio)), /* @__PURE__ */ React8.createElement("td", null, /* @__PURE__ */ React8.createElement("button", {
    className: "btn btn-sm btn-danger",
    onClick: () => onDeleteProduct(product)
  }, "Borrar"))))), /* @__PURE__ */ React8.createElement("tfoot", null, /* @__PURE__ */ React8.createElement("tr", {
    className: "tx-blod"
  }, /* @__PURE__ */ React8.createElement("td", {
    colSpan: "2"
  }), /* @__PURE__ */ React8.createElement("td", null, "TOTAL"), /* @__PURE__ */ React8.createElement("td", {
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
  const [products, setProducts] = React9.useState(() => {
    if (hasItemLocalStorage(PRODUCTOS_VENTA_KEY)) {
      const loadProducts = JSON.parse(getItemLocalStorage(PRODUCTOS_VENTA_KEY));
      return loadProducts;
    } else {
      return [];
    }
  });
  const [customer, setCustomer] = React9.useState(() => {
    if (hasItemLocalStorage(CLIENTE_VENTA_KEY)) {
      const laodClient = JSON.parse(getItemLocalStorage(CLIENTE_VENTA_KEY));
      return laodClient;
    } else {
      return null;
    }
  });
  const [fondoCaja, setFondoCaja] = React9.useState(() => {
    if (hasItemLocalStorage(FONDO_KEY)) {
      const fondo = JSON.parse(getItemLocalStorage(FONDO_KEY));
      return fondo;
    } else {
      return null;
    }
  });
  const [totalSale, setTotalSale] = React9.useState(0);
  const [modalsState, dispatchModals] = React9.useReducer(reducer, initModals);
  const handleCloseModal = (modal) => dispatchModals({ modal, value: false });
  const addCustomerToSale = (customer2) => {
    customer2 = __spreadProps(__spreadValues({}, customer2), {
      idCliente: new Number(customer2.idCliente)
    });
    setItemLocalStorage(CLIENTE_VENTA_KEY, JSON.stringify(customer2));
    setCustomer(customer2);
  };
  const cancelSale = () => {
    setProducts([]);
    setCustomer(null);
  };
  const closeSale = () => {
    dispatchModals({ modal: modals.paidSale, value: true });
  };
  const addProduct = (product) => {
    console.log(product);
    const precio = getCusotmerPrice(customer, product);
    product = __spreadProps(__spreadValues({}, product), {
      mayoreo: new Number(product.mayoreo),
      medida: new Number(product.medida),
      medio: new Number(product.medio),
      venta: new Number(product.venta),
      precio,
      cantidad: 1
    });
    console.log(product);
    setProducts([...products, product]);
  };
  const increaseAmountProduct = (product, quantity) => {
    const newCantidad = product.cantidad + quantity;
    const updatedProducts = products.map((productInSale) => productInSale.idProducto === product.idProducto ? __spreadProps(__spreadValues({}, productInSale), { cantidad: newCantidad }) : productInSale);
    setProducts(updatedProducts);
  };
  const updateQuantityProduct = (product, quantity) => {
    const newCantidad = quantity;
    const updatedProducts = products.map((productInSale) => productInSale.idProducto === product.idProducto ? __spreadProps(__spreadValues({}, productInSale), { cantidad: newCantidad }) : productInSale);
    setProducts(updatedProducts);
  };
  const checkProductIntoSale = (product) => {
    return products.findIndex((productInSale) => productInSale.idProducto === product.idProducto) > -1;
  };
  const getProductIntoSale = (product) => {
    const index = products.findIndex((producInSale2) => producInSale2.idProducto === product.idProducto);
    const producInSale = products[index];
    return producInSale;
  };
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
  };
  React9.useEffect(() => {
    (() => {
      setItemLocalStorage(PRODUCTOS_VENTA_KEY, JSON.stringify(products));
      const total = products.reduce((sum, product) => sum += product.cantidad * getCusotmerPrice(customer, product), 0);
      setTotalSale(total);
    })();
  }, [products, customer]);
  React9.useEffect(() => {
    (() => {
      setItemLocalStorage(CLIENTE_VENTA_KEY, JSON.stringify(customer));
    })();
  }, [customer]);
  React9.useEffect(() => {
    if (!fondoCaja) {
      dispatchModals({ modal: modals.openCash, value: true });
    }
  }, []);
  React9.useEffect(() => {
    setItemLocalStorage(FONDO_KEY, JSON.stringify(fondoCaja));
  }, [fondoCaja]);
  return /* @__PURE__ */ React9.createElement(React9.Fragment, null, /* @__PURE__ */ React9.createElement(breadcrum_default, {
    openModal: ({ modal, value }) => {
      dispatchModals({ modal, value });
    },
    customer
  }), /* @__PURE__ */ React9.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React9.createElement("div", {
    className: "col-8"
  }, /* @__PURE__ */ React9.createElement("div", {
    className: "card"
  }, /* @__PURE__ */ React9.createElement("div", {
    className: "card-body"
  }, /* @__PURE__ */ React9.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React9.createElement("div", {
    className: "col table-responsive"
  }, /* @__PURE__ */ React9.createElement(tabla_default, {
    products,
    total: totalSale,
    onDeleteProduct: () => {
    },
    onUpdateQuantity: (product, cantidad) => {
      updateQuantityProduct(product, cantidad);
    }
  })))))), /* @__PURE__ */ React9.createElement(sale_detail_default, {
    customer,
    total: totalSale,
    onCloseSale: closeSale,
    onCancelSale: cancelSale
  })), /* @__PURE__ */ React9.createElement(findProduct_default, {
    show: modalsState.findProduct,
    onClose: handleCloseModal,
    selectedProduct: handleAddProduct
  }), /* @__PURE__ */ React9.createElement(findCustomer_default, {
    show: modalsState.findCustomer,
    onClose: handleCloseModal,
    selectedCustomer: addCustomerToSale
  }), /* @__PURE__ */ React9.createElement(paidSale_default, {
    show: modalsState.paidSale,
    onClose: handleCloseModal,
    total: totalSale,
    onPaid: () => {
    }
  }), /* @__PURE__ */ React9.createElement(openCashRegister_default, {
    show: modalsState.openCash,
    onClose: handleCloseModal,
    onPaid: ({ id, monto }) => {
      setFondoCaja({ id, monto });
    }
  }), /* @__PURE__ */ React9.createElement(closeCashRegister_default, {
    show: modalsState.closeCash,
    onClose: handleCloseModal,
    montoInicial: (fondoCaja == null ? void 0 : fondoCaja.monto) || 0,
    onPaid: async (total) => {
      const { data, success } = await closeCashRegiser(fondoCaja.id, total);
      if (success) {
        removeItemLocalStorage2(FONDO_KEY);
      }
    }
  }));
};
root.render(/* @__PURE__ */ React9.createElement(Sales, null));
//# sourceMappingURL=index.js.map
