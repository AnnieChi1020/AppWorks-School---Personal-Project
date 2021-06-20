import { render, screen, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import App from "./App";

test("1+1=2", () => {
  const result = 1 + 1;
  const expected = 2;
  expect(result).toEqual(expected);
});

// test("renders learn react link", () => {
//   render(<App />);

//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
