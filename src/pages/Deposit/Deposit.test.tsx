import { render, screen } from "@testing-library/react";
import React from "react";
import ReactDOM from "react-dom";
import Deposit from "./Deposit";

test("renders button text", () => {
  render(<Deposit />);
});
