import { render } from "@testing-library/react";
import React from "react";
import Withdrawal from "./Withdrawal";

test("renders button text", () => {
  render(<Withdrawal />);
});
