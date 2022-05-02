import iziToast from 'izitoast';

export const createElement = (element) => document.createElement(element);
export const hasItemLocalStorage = (key) => localStorage.getItem(key) !== null;
export const getItemLocalStorage = (key) => localStorage.getItem(key);
export const setItemLocalStorage = (key, value) => localStorage.setItem(key, value);
export const removeItemLocalStorage = (key) => localStorage.removeItem(key);
export const totalCurrency = (total) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(total);
export const showAlert = (type, message = "") => {
    if(type === "success") iziToast.success({title: "Ok!", message});
    if(type === "error") iziToast.error({title: "Error!", message: message});
}
