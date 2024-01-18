const initialData = {
  services: [],
};

export const servicesReducer = (state = initialData, action) => {
  switch (action.type) {
    case "GET_ALL_SERVICES": {
      return {
        ...state,
        services: action.payload,
      };
    }

    default:
      return state;
  }
};
