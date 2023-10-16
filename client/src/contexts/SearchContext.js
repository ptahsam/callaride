import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  city: JSON.parse(localStorage.getItem("search"))?.city || undefined,
  car_type: JSON.parse(localStorage.getItem('search'))?.car_type || undefined,
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
    localStorage.setItem("search", JSON.stringify({city: state.location, car_type: state.car_type, dates: state.dates}));
  }, [state]);

  return (
    <SearchContext.Provider
      value={{
        city: state.location,
        car_type: state.car_type,
        dates: state.dates,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

















