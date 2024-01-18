const initialData = {
  servicesbookings: [],
};

export const bookingsServiceReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_BOOKINGS_SERVICE": {
      return {
        ...state,
        servicesbookings: action.payload,
      };
    }

    default:
      return state;
  }
};
