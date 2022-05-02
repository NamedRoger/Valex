import { API_URL,HTTP_HEADERS_BASE } from "./constants";
import axios from "axios";

const instance = axios.create({
    baseURL: API_URL, 
    headers: HTTP_HEADERS_BASE,
})


export const get = async (url) => {
    const response = await instance.get(url);
    return response;
}

export const post = async (url, data) => {
    const response = await instance.post(url, data);
    return response;
}