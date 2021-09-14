// auth
export const SET_AUTH = "SET_AUTH";

// url
export const API_URL =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:5000/api"
    : "https://whispering-headland-64389.herokuapp.com/api";
//
// token
export const LOCAL_STORAGE_TOKEN = "MERN";

// post
export const ADD_POST = "ADD_POST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAIL = "GET_POST_FAIL";
export const UPDATE_POST = "UPDATE_POST";
export const ASSIGN_POST_UPDATE = "ASSIGN_POST_UPDATE";
export const DELETE_POST = "DELETE_POST";
