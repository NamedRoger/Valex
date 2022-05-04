export const API_URL = process.env.NODE_ENV === "production"? "http://donhuachinango.com" : "http://localhost";

export const HTTP_HEADERS_BASE = {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
};

export const CLIENTE_VENTA_KEY = "clienteVenta";
export const PRODUCTOS_VENTA_KEY = "productosVenta";
export const EVENTO_ALTER_PROD = "alter.prod";
export const INICIAR_VENTA_KEY = "ventaIniciada";
export const FONDO_KEY = "fondo";