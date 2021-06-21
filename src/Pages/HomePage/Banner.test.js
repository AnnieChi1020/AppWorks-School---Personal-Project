import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { Router, Route, Switch } from "react-router-dom";
import Banner from "./Banner.js";

afterEach(cleanup);

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Router history={history}>
        {component}
        <Switch>
          <Route exact path="/events">
            <p>活動時間</p>
          </Route>
        </Switch>
      </Router>
    ),
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
    const { container, getByTestId } = renderWithRouter(<Banner />);
    expect(container.innerHTML).toMatch("加入志工的行列");
    fireEvent.click(getByTestId("signUpButton"));
    jest.useFakeTimers();
    setTimeout(() => {
      expect(container.innerHTML).toMatch("活動時間");
    });
  }, 1500);
});
