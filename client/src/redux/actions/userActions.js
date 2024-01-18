import axios from "axios";
import { message } from "antd";

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get("/api/users/getalluser");
    dispatch({ type: "GET_ALL_USERS", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userLogin = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login success");
    dispatch({ type: "LOADING", payload: false });
    setTimeout(() => {
      window.location.href = "/Rent";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Wrong Username or Password");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const userRegister = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/register", reqObj);
    message.success("Registration successfull");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);

    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    message.error("Already has an account");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const editUser = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.post("/api/users/edituser", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));

    dispatch({ type: "LOADING", payload: false });
    message.success("User details updated successfull");
    setTimeout(() => {
      window.location.href = "/edituser";
    }, 500);
  } catch (error) {
    console.log(error);
    message.error("Give all valid inputs");
    dispatch({ type: "LOADING", payload: false });
  }
};

export const deleteUser = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/users/deleteuser", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("User deleted successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
