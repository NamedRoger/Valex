import {
  SessionContext,
  SessionProvider,
  require_index_cjs
} from "../chunk-YSMHKX4W.js";
import {
  __toESM,
  get,
  require_client,
  require_react,
  useFormik
} from "../chunk-UTERFIYZ.js";

// web/js/modules/cash-register/index.js
var React3 = __toESM(require_react());
var import_client = __toESM(require_client());

// web/js/modules/cash-register/filters.js
var React = __toESM(require_react());

// web/js/modules/cash-register/request.js
var getRegisters = async (branch) => {
  const { data } = await get("/controller/arqueos/listar.php?idSucursal=" + branch);
  return data;
};
var getBranches = async () => {
  const { data } = await get("/controller/sucursales/listar.php");
  return data;
};

// web/js/modules/cash-register/filters.js
var FiltersCash = ({ onSubmit }) => {
  const [branches, setBranches] = React.useState([]);
  const loadBranches = React.useCallback(async () => {
    const branches2 = await getBranches();
    setBranches(branches2);
  }, []);
  React.useEffect(() => {
    (async () => {
      loadBranches();
    })();
  }, []);
  const formik = useFormik({
    initialValues: {
      branch: 0
    },
    onSubmit
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("form", {
    onSubmit: formik.handleSubmit
  }, /* @__PURE__ */ React.createElement("select", {
    name: "branch",
    id: "idSucursal",
    value: formik.values.branch,
    onChange: (e) => {
      formik.handleChange(e);
    }
  }, /* @__PURE__ */ React.createElement("option", {
    value: 0
  }, " --- Sucursal ---"), branches.map((branch, id) => /* @__PURE__ */ React.createElement("option", {
    key: id,
    value: branch.idSucursal
  }, branch.sucursal))), /* @__PURE__ */ React.createElement("button", {
    type: "submit",
    className: "btn btn-primary"
  }, "Buscar")));
};
var filters_default = FiltersCash;

// web/js/modules/cash-register/table.js
var React2 = __toESM(require_react());
var import_react_data_table_component = __toESM(require_index_cjs());
var CashReportTable = ({ data }) => {
  const columns = [
    {
      name: "Sucursal",
      selector: (row) => row.sucursal
    },
    {
      name: "Fecha Inicio",
      selector: (row) => row.fechaInicio
    },
    {
      name: "Fecha Fin",
      selector: (row) => row.fechaFin
    },
    {
      name: "Monto Inicio",
      selector: (row) => row.montoInicial
    },
    {
      name: "Monto Fin",
      selector: (row) => row.montoFinal
    }
  ];
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(import_react_data_table_component.default, {
    columns,
    data,
    pagination: true
  }));
};
var table_default = CashReportTable;

// web/js/modules/cash-register/index.js
var container = document.getElementById("divContainer");
var root = (0, import_client.createRoot)(container);
var CashReport = () => {
  const [session] = React3.useContext(SessionContext);
  const [cashRegister, setCashRegister] = React3.useState([]);
  const submitFilters = async (filters) => {
    const { branch } = filters;
    const registers = await getRegisters(branch);
    setCashRegister(registers);
  };
  return /* @__PURE__ */ React3.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "card"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "card-body"
  }, /* @__PURE__ */ React3.createElement("h5", null, "Arqueo de Cajas"), /* @__PURE__ */ React3.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React3.createElement("h6", null, "Filtros"), /* @__PURE__ */ React3.createElement(filters_default, {
    onSubmit: submitFilters
  }))), /* @__PURE__ */ React3.createElement("div", {
    className: "row"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "col"
  }, /* @__PURE__ */ React3.createElement("div", {
    className: "table-responsive"
  }, /* @__PURE__ */ React3.createElement(table_default, {
    data: cashRegister
  })))))));
};
var Module = () => /* @__PURE__ */ React3.createElement(SessionProvider, null, /* @__PURE__ */ React3.createElement(CashReport, null));
root.render(/* @__PURE__ */ React3.createElement(Module, null));
//# sourceMappingURL=index.js.map
