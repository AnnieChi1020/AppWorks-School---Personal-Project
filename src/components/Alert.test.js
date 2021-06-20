import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { successAlertText } from "./Alert.js";

afterEach(cleanup);

describe("Should render the alert message", () => {
  test("render the signup succeed message", () => {
    render(<div>{successAlertText("註冊成功")}</div>);
    expect(screen.getByTestId("alertText").innerHTML).toBe("註冊成功");
  });

  test("render the empty message", () => {
    render(<div>{successAlertText()}</div>);
    expect(screen.getByTestId("alertText").innerHTML).toBe("");
  });
});
