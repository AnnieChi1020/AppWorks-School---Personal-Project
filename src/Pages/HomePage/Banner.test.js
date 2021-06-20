import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
  getByRole,
  getByTestId,
} from "@testing-library/react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import Banner from "./Banner.js";

afterEach(cleanup);

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
  };
};

describe("Should render the banner", () => {
  test("render the first line of the banner", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Banner />
      </Router>
    );
    expect(screen.getByText("加入志工的行列")).toBeInTheDocument();
  });

  test("render the second line of the banner", () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Banner />
      </Router>
    );
    expect(screen.getByText("一起改變世界")).toBeInTheDocument();
  });

  test("triggers path change", async () => {
    const history = createMemoryHistory();

    const { container, getByTestId } = renderWithRouter(<Banner />);

    expect(history.location.pathname).toBe("/");

    const signUpButton = getByTestId("signUpButton");
    await fireEvent.click(signUpButton);
    await waitFor(() => expect(history.location.pathname).toBe("/events"));


    // const button = getByTestId(container, "signUpButton");
    // fireEvent.click(button);
    // expect(await history.location.pathname).toBe("/events");
  });
});
