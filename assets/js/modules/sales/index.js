import {
  totalCurrency
} from "../chunk-QTENANOH.js";
import {
  __toESM,
  require_client,
  require_react
} from "../chunk-D5PH6NAL.js";

// web/js/modules/sales/index.js
var React4 = __toESM(require_react());
var import_client = __toESM(require_client());

// web/js/modules/sales/breadcrum.js
var React = __toESM(require_react());
var SaleBreadcrum = () => {
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
    className: "btn btn-success me-2"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "bi bi-person-circle"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "pe-1 mb-xl-0"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "btn btn-info me-2 btn-b"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "bi bi-person-plus"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "pe-1 mb-xl-0"
  }, /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "btn btn-primary me-2"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "bi bi-search"
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "mb-xl-0"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "btn-group dropdown"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "btn btn-warning",
    "data-bs-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false"
  }, "Caja"), /* @__PURE__ */ React.createElement("button", {
    type: "button",
    className: "btn btn-warning dropdown-toggle dropdown-toggle-split",
    id: "dropdownMenuDate",
    "data-bs-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "sr-only"
  }, "Toggle Dropdown")), /* @__PURE__ */ React.createElement("div", {
    className: "dropdown-menu dropdown-menu-right",
    "aria-labelledby": "dropdownMenuDate",
    "x-placement": "bottom-end"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "dropdown-item"
  }, "Abrir"), /* @__PURE__ */ React.createElement("button", {
    className: "dropdown-item"
  }, "Cerrar")))))));
};
var breadcrum_default = SaleBreadcrum;

// web/js/modules/sales/sale-detail.js
var React2 = __toESM(require_react());
var SaleDetail = ({ customer, total }) => {
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("div", {
    className: "col-4"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "card"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "card-body"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("dl", null, /* @__PURE__ */ React2.createElement("dt", null, "Cliente"), /* @__PURE__ */ React2.createElement("dd", {
    id: "infoCliente"
  }, customer), /* @__PURE__ */ React2.createElement("dt", null, "Total"), /* @__PURE__ */ React2.createElement("dd", {
    id: "totalVentaDetalle"
  }, totalCurrency(total))))), /* @__PURE__ */ React2.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React2.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React2.createElement("button", {
    id: "cancelarVenta",
    className: "btn btn-danger"
  }, "Cancelar"), /* @__PURE__ */ React2.createElement("button", {
    className: "btn btn-success"
  }, "Finalizar")))))));
};
var sale_detail_default = SaleDetail;

// web/js/modules/sales/tabla.js
var React3 = __toESM(require_react());
var ProductsSalesTable = ({ products, total }) => {
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("table", {
    className: "table table-bordered"
  }, /* @__PURE__ */ React3.createElement("thead", null, /* @__PURE__ */ React3.createElement("tr", null, /* @__PURE__ */ React3.createElement("td", null, "Producto"), /* @__PURE__ */ React3.createElement("td", null, "Precio"), /* @__PURE__ */ React3.createElement("td", null, "Cantidad"), /* @__PURE__ */ React3.createElement("td", null, "Total"), /* @__PURE__ */ React3.createElement("td", null))), /* @__PURE__ */ React3.createElement("tbody", {
    id: "tablaProductosVenta"
  }), /* @__PURE__ */ React3.createElement("tfoot", null, /* @__PURE__ */ React3.createElement("tr", {
    className: "tx-blod"
  }, /* @__PURE__ */ React3.createElement("td", {
    colSpan: "2"
  }), /* @__PURE__ */ React3.createElement("td", null, "TOTAL"), /* @__PURE__ */ React3.createElement("td", {
    id: "totalVentaTabla"
  }, totalCurrency(total))))));
};
var tabla_default = ProductsSalesTable;

// web/js/modules/sales/index.js
var container = document.getElementById("divContainer");
var root = (0, import_client.createRoot)(container);
var Sales = () => {
  const [products, setProducts] = React4.useState([]);
  const [customer, setCustomer] = React4.useState(null);
  const [totalSale, setTotalSale] = React4.useState(0);
  return /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement(breadcrum_default, null), /* @__PURE__ */ React4.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "col-8"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "card"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "card-body"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React4.createElement("div", {
    className: "col table-responsive"
  }, /* @__PURE__ */ React4.createElement(tabla_default, {
    products,
    total: totalSale
  })))))), /* @__PURE__ */ React4.createElement(sale_detail_default, {
    customer: (customer == null ? void 0 : customer.nombre) || "---",
    total: totalSale
  })));
};
root.render(/* @__PURE__ */ React4.createElement(Sales, null));
//# sourceMappingURL=index.js.map
