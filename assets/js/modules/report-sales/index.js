import {
  Modal_default,
  totalCurrency
} from "../chunk-OZF5TH3S.js";
import {
  SessionContext,
  SessionProvider,
  require_index_cjs
} from "../chunk-77KSCIPS.js";
import {
  __toESM,
  get,
  post,
  require_client,
  require_react,
  useFormik
} from "../chunk-7AN26WI7.js";

// web/js/modules/report-sales/index.js
var React3 = __toESM(require_react());
var import_client = __toESM(require_client());

// web/js/modules/report-sales/filtros.js
var React = __toESM(require_react());

// web/js/modules/report-sales/request.js
var getSales = async ({ vendor, customer, branch, initDate, endDate }) => {
  vendor = vendor == 0 ? "" : vendor;
  customer = customer == 0 ? "" : customer;
  branch = branch == 0 ? "" : branch;
  const { data } = await get(`/controller/ventas/listar.php?idSucursal=${branch}&idVendedor=${vendor}&idCliente=${customer}&fechaInicio=${initDate}&fechaFin=${endDate}`);
  return data;
};
var getProductsSale = async (idSale) => {
  const { data } = await get("/controller/ventas/listar_productos?idVenta=" + idSale);
  return data;
};
var removeSales = async (idSale, idSucursal) => {
  const { data } = await post("/controller/ventas/eliminar.php", { venta: idSale, sucursal: idSucursal });
  return data;
};
var getBranches = async () => {
  const { data } = await get("/controller/sucursales/listar.php");
  return data;
};
var getSalesMen = async (idBranch) => {
  const { data } = await get("/controller/usuarios/listar.php?idSucursal=" + idBranch);
  return data;
};
var getCustomers = async () => {
  const { data } = await get("/controller/clientes/filtro.php?filter=");
  return data.data;
};

// web/js/modules/report-sales/filtros.js
var SalesFilter = ({ onSubmit }) => {
  const [session] = React.useContext(SessionContext);
  const [branchId, setBranchId] = React.useState(() => {
    if (session.rol === "2") {
      return session.idSucursal;
    }
    return 0;
  });
  const [branches, setBranches] = React.useState([]);
  const [customers, setCustomers] = React.useState([]);
  const [salesMen, setSalesMen] = React.useState([]);
  const loadBranches = React.useCallback(async () => {
    const branches2 = await getBranches();
    setBranches(branches2);
  }, []);
  const loadSalesMens = React.useCallback(async () => {
    if (branchId) {
      const salesMens = await getSalesMen(branchId);
      setSalesMen(salesMens);
    }
  }, [branchId]);
  const loadCustomers = React.useCallback(async () => {
    const customers2 = await getCustomers();
    setCustomers(customers2);
  }, []);
  React.useEffect(() => {
    (async () => {
      loadBranches();
      loadCustomers();
    })();
  }, []);
  React.useEffect(() => {
    loadSalesMens();
  }, [loadSalesMens]);
  const formik = useFormik({
    initialValues: {
      branch: 0,
      vendor: 0,
      customer: 0,
      initDate: "",
      endDate: ""
    },
    onSubmit
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-3"
  }, session.rol === "1" ? /* @__PURE__ */ React.createElement("select", {
    name: "branch",
    id: "idSucursal",
    value: formik.values.branch,
    onChange: (e) => {
      formik.handleChange(e);
      setBranchId(e.target.value);
    }
  }, /* @__PURE__ */ React.createElement("option", {
    value: 0
  }, " --- Sucursal ---"), branches.map((branch, id) => /* @__PURE__ */ React.createElement("option", {
    key: id,
    value: branch.idSucursal
  }, branch.sucursal))) : null, /* @__PURE__ */ React.createElement("select", {
    name: "vendor",
    id: "idVendedor",
    value: formik.values.salesMan,
    onChange: formik.handleChange
  }, /* @__PURE__ */ React.createElement("option", {
    value: 0
  }, " --- Vendedor ---"), salesMen.map((salesMan, id) => /* @__PURE__ */ React.createElement("option", {
    key: id,
    value: salesMan.idUsuario
  }, salesMan.nombre))), /* @__PURE__ */ React.createElement("select", {
    name: "customer",
    id: "idCliente",
    value: formik.values.customer,
    onChange: formik.handleChange
  }, /* @__PURE__ */ React.createElement("option", {
    value: ""
  }, "--- Cliente ---"), customers.map((customer, id) => /* @__PURE__ */ React.createElement("option", {
    key: id,
    value: customer.idCliente
  }, customer.nombre))), "Fecha Inicio:", /* @__PURE__ */ React.createElement("input", {
    type: "date",
    name: "initDate",
    id: "",
    value: formik.values.initDate,
    onChange: formik.handleChange
  }), "Fecha Fin:", /* @__PURE__ */ React.createElement("input", {
    type: "date",
    name: "endDate",
    id: "",
    value: formik.values.endDate,
    onChange: formik.handleChange
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Buscar"))));
};
var filtros_default = SalesFilter;

// web/js/modules/report-sales/table.js
var React2 = __toESM(require_react());
var import_react_data_table_component = __toESM(require_index_cjs());
var SalesReportTable = ({ sales, onDelete, onView }) => {
  const columns = [
    {
      name: "Vendedor",
      selector: (row) => row.vendedor
    },
    {
      name: "Fecha/Hora",
      selector: (row) => row.fecha
    },
    {
      name: "Monto",
      selector: (row) => row.monto
    },
    {
      name: "Acciones",
      cell: (row) => {
        return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("button", {
          className: "btn btn-iconbtn btn-sm",
          onClick: () => handleView(row)
        }, /* @__PURE__ */ React2.createElement("i", {
          className: "fas fa-edit",
          style: { color: "#278CCD" }
        })), /* @__PURE__ */ React2.createElement("button", {
          className: "btn btn-iconbtn btn-sm",
          onClick: () => handleDelete(row)
        }, /* @__PURE__ */ React2.createElement("i", {
          className: "fas fa-trash-alt",
          style: { color: "red" }
        })));
      }
    }
  ];
  const handleView = (sale) => {
    onView(sale);
  };
  const handleDelete = (sale) => {
    onDelete(sale);
  };
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(import_react_data_table_component.default, {
    columns,
    data: sales,
    pagination: true
  }));
};
var table_default = SalesReportTable;

// web/js/modules/report-sales/index.js
var container = document.getElementById("divContainer");
var root = (0, import_client.createRoot)(container);
var SalesReport = () => {
  const [session] = React3.useContext(SessionContext);
  const [sales, setSales] = React3.useState([]);
  const [sale, setSale] = React3.useState(null);
  const [sucursal, setSucursal] = React3.useState(0);
  const [openModal, setOpenModal] = React3.useState(false);
  const handleView = (sale2) => {
    getProductsSale(sale2.idVenta).then((res) => {
      sale2.products = res;
      setSale(sale2);
      setOpenModal(true);
    });
  };
  const handleDelete = (sale2) => {
    (async () => {
      const idSucursal = session.rol == 1 ? sucursal : session.idSucursal;
      const res = await removeSales(sale2.idVenta, idSucursal);
      setSales([]);
    })();
  };
  const submitFilters = async (filters) => {
    const sales2 = await getSales(filters);
    setSucursal(filters.branch);
    setSales(sales2);
  };
  return /* @__PURE__ */ React3.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "card"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "card-body"
  }, /* @__PURE__ */ React3.createElement("h5", null, "Reporte de Ventas"), /* @__PURE__ */ React3.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React3.createElement("h6", null, "Filtros"), /* @__PURE__ */ React3.createElement(filtros_default, {
    onSubmit: submitFilters
  }))), /* @__PURE__ */ React3.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "table-responsive"
  }, /* @__PURE__ */ React3.createElement(table_default, {
    sales,
    onDelete: handleDelete,
    onView: handleView
  })))))), /* @__PURE__ */ React3.createElement("div", null, sale ? /* @__PURE__ */ React3.createElement(Modal_default, {
    show: openModal,
    onHide: () => {
      setOpenModal(false);
      setSale(null);
    }
  }, /* @__PURE__ */ React3.createElement(Modal_default.Body, null, /* @__PURE__ */ React3.createElement("div", {
    className: "row row-sm"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "col-md-12 col-xl-12"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: " main-content-body-invoice"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "card card-invoice"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "card-body"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "invoice-header"
  }, /* @__PURE__ */ React3.createElement("h1", {
    className: "invoice-title"
  }, "Nota"), /* @__PURE__ */ React3.createElement("div", {
    className: "billed-from"
  }, /* @__PURE__ */ React3.createElement("h6", {
    id: "ventaDireccion"
  }, sale.direccion), /* @__PURE__ */ React3.createElement("p", null, /* @__PURE__ */ React3.createElement("br", null), /* @__PURE__ */ React3.createElement("br", null)))), /* @__PURE__ */ React3.createElement("div", {
    className: "row mg-t-20"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "col-md"
  }, /* @__PURE__ */ React3.createElement("label", {
    className: "tx-gray-600"
  }, "Cliente:"), /* @__PURE__ */ React3.createElement("div", {
    className: "billed-to"
  }, /* @__PURE__ */ React3.createElement("h6", {
    id: "clienteDetalle"
  }, sale.cliente))), /* @__PURE__ */ React3.createElement("div", {
    className: "col-md"
  }, /* @__PURE__ */ React3.createElement("label", {
    className: "tx-gray-600"
  }, "Infomacion de la nota:"), /* @__PURE__ */ React3.createElement("p", {
    className: "invoice-info-row"
  }, /* @__PURE__ */ React3.createElement("span", null, /* @__PURE__ */ React3.createElement("small", null, "Nota No.")), " ", /* @__PURE__ */ React3.createElement("span", null, /* @__PURE__ */ React3.createElement("small", {
    id: "idDetalle"
  }, sale.idVenta.padStart(3, "0")))), /* @__PURE__ */ React3.createElement("p", {
    className: "invoice-info-row"
  }, /* @__PURE__ */ React3.createElement("span", null, /* @__PURE__ */ React3.createElement("small", null, "Vendedor:")), " ", /* @__PURE__ */ React3.createElement("span", null, /* @__PURE__ */ React3.createElement("small", {
    id: "vendedorDetalle"
  }, sale.vendedor))), /* @__PURE__ */ React3.createElement("p", {
    className: "invoice-info-row"
  }, /* @__PURE__ */ React3.createElement("span", null, /* @__PURE__ */ React3.createElement("small", null, "Fecha y Hora:")), " ", /* @__PURE__ */ React3.createElement("span", null, /* @__PURE__ */ React3.createElement("small", {
    id: "fechaDetalle"
  }, sale.fecha))))), /* @__PURE__ */ React3.createElement("div", {
    className: "table-responsive mg-t-40"
  }, /* @__PURE__ */ React3.createElement("table", {
    id: "tablaProductosDetalle",
    className: "table table-invoice border text-md-nowrap mb-0"
  }, /* @__PURE__ */ React3.createElement("thead", null, /* @__PURE__ */ React3.createElement("tr", null, /* @__PURE__ */ React3.createElement("th", null, /* @__PURE__ */ React3.createElement("small", null, "Producto")), /* @__PURE__ */ React3.createElement("th", null, /* @__PURE__ */ React3.createElement("small", null, "Precio")), /* @__PURE__ */ React3.createElement("th", null, /* @__PURE__ */ React3.createElement("small", null, "Cantidad")), /* @__PURE__ */ React3.createElement("th", null, /* @__PURE__ */ React3.createElement("small", null, "Total")))), /* @__PURE__ */ React3.createElement("tbody", null, sale.products.map((product, id) => /* @__PURE__ */ React3.createElement("tr", {
    key: id
  }, /* @__PURE__ */ React3.createElement("td", null, product.nombre), /* @__PURE__ */ React3.createElement("td", null, product.precio), /* @__PURE__ */ React3.createElement("td", null, product.cantidad), /* @__PURE__ */ React3.createElement("td", null, totalCurrency(new Number(product.total))))))), /* @__PURE__ */ React3.createElement("h3", {
    className: "mt-4"
  }, "Total:", /* @__PURE__ */ React3.createElement("span", {
    id: "totalDetalle"
  }, totalCurrency(new Number(sale.monto))))), /* @__PURE__ */ React3.createElement("a", {
    href: "#",
    className: "btn btn-info float-end mt-3 ms-2"
  }, /* @__PURE__ */ React3.createElement("i", {
    className: "mdi mdi-printer me-1"
  }), "Imprimir")))))))) : null));
};
var Module = () => /* @__PURE__ */ React3.createElement(SessionProvider, null, /* @__PURE__ */ React3.createElement(SalesReport, null));
root.render(/* @__PURE__ */ React3.createElement(Module, null));
//# sourceMappingURL=index.js.map
