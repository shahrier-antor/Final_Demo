import axios from "axios";
import { message } from "antd";
export const bookService = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    await axios.post("/api/bookingsServices/bookservice", reqObj);

    dispatch({ type: "LOADING", payload: false });
    message.success("Your service booked successfully");
    setTimeout(() => {
      window.location.href = "/userServicebookings";
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong , please try later");
  }
};

export const getAllServiceBookings = () => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });

  try {
    const response = await axios.get(
      "/api/bookingsServices/getallbookingsservice"
    );
    dispatch({ type: "GET_ALL_BOOKINGS_SERVICE", payload: response.data });
    dispatch({ type: "LOADING", payload: false });
  } catch (error) {
    console.log(error);
    dispatch({ type: "LOADING", payload: false });
  }
};
