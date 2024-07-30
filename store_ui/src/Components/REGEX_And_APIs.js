// Create global regex to use it in defernt components
export const NAME_REGEX = /^[A-Za-z\u0600-\u06FF\s.'-]{4,}$/u;
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
// Auth api login and register
export const SERVER_PATH = "http://127.0.0.1:8000/";

export const LOGIN = `${SERVER_PATH}api/login`;

export const REGISTER = `${SERVER_PATH}api/register`;

export const LOGOUT = `${SERVER_PATH}api/logout`;

export const CATEGORIES = `${SERVER_PATH}api/categories`;

export const COMPANIES = `${SERVER_PATH}api/companies`;

export const CATEGORIES_PRODUCTS = `${SERVER_PATH}api/products`;

export const ADDPRODUCT = `${SERVER_PATH}api/products/add`;

export const GET_USERS = `${SERVER_PATH}api/users`;

export const CREATE_ORDER = `${SERVER_PATH}api/create-order`;

export const PRODUCT_DETAILES = `${SERVER_PATH}api/product-details/`;

export const SEARCH = `${SERVER_PATH}api/product-search/`;

export const USER_ORDERS = `${SERVER_PATH}api/user-orders`;

export const ORDER_FOR_EDIT = `${SERVER_PATH}api/get-order/`;

export const DELETE_PRODUCT_FROM_ORDER = `${SERVER_PATH}api/delete-order-details/`;

export const DELETE_ORDER = `${SERVER_PATH}api/delete-order/`;

export const EDITE_ORDER = `${SERVER_PATH}api/edit-order-detail`;

