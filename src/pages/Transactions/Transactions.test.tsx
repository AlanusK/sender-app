import { render } from "@testing-library/react";
import React from "react";
import Transactions from "./Transactions";

test("renders button text", () => {
  render(<Transactions />);
});
