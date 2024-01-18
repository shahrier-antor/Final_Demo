import { message } from "antd";
import axios from "axios";

// getting all services from backend
export const getAllServices= () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/services/getallservices");
    dispatch({ type: "GET_ALL_SERVICES", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const addService = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/services/addservice", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("New service added successfully");
    setTimeout(() => {
      window.location.href = "/adminService";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editService = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/services/editservice", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Service details updated successfully");
    setTimeout(() => {
      window.location.href = "/adminService";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteService = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/services/deleteservice", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Service deleted successfully");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
