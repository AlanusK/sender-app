import "../../../../jestGlobalmocks";
import { render } from "@testing-library/react";
import React from "react";
import AuthorisedLayout from "./AuthorisedLayout";
import { MemoryRouter, Route } from "react-router-dom";

test("renders without crashing", () => {

  render(
    <MemoryRouter initialEntries={["/register"]}>
      <Route path="/register">
        <AuthorisedLayout />
      </Route>
    </MemoryRouter>
  );

});
