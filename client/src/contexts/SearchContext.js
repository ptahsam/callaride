import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  place: JSON.parse(localStorage.getItem("search"))?.place || undefined,
  car_type: JSON.parse(localStorage.getItem('search'))?.car_type || undefined,
  car_brand: JSON.parse(localStorage.getItem('search'))?.car_brand || undefined,
  dates: JSON.parse(localStorage.getItem("search"))?.dates || {},
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify({place: state.location, car_type: state.car_type, car_brand: state.car_brand, dates: state.dates}));
  }, [state]);

  return (
    <SearchContext.Provider
      value={{
        place: state.location,
        car_type: state.car_type,
        car_brand: state.car_brand,
        dates: state.dates,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

















