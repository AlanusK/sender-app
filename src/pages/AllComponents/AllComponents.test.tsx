import { render } from "@testing-library/react";
import React from "react";
import AllComponents from "./AllComponents";

test("renders button text", () => {
  render(<AllComponents />);
});