import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NotFoundPage from "./index.js";

afterEach(cleanup);

const startingState = { showNav: true };
function reducer(state = startingState, action) {
  switch (action.type) {
    case "SHOW_NAV":
      return { ...state, showNav: false };
    default:
      return state;
  }
}

function renderWithRedux(
  component,
  { initialState, store = createStore(reducer, initialState) } = {}
) {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
  };
}

test("renders with redux", () => {
  // const { getByTestId } = renderWithRedux(<NotFoundPage />);
  // expect(getByTestId("notFoundImage")).toBeInTheDocument();
});
