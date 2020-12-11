import React, { lazy, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { stringify } from "querystring";

import { useAuth } from "./hooks/useAuth";
import Deposit from "./pages/Deposit/Deposit";
import Withdrawal from "./pages/Withdrawal/Withdrawal";
import { CustomSpin } from "./components";
const AuthorisedLayout = lazy(
  () => import("./containers/layouts/AuthorisedLayout/AuthorisedLayout")
);
const UnauthorisedLayout = lazy(
  () => import("./containers/layouts/UnauthorisedLayout/UnauthorisedLayout")
);
const Login = lazy(() => import("./pages/Login/Login"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const Settings = lazy(() => import("./pages/Settings/Settings"));
/**
 *
 *  A wrapper for <Route> that redirects to the login
 * screen if not authenticated.
 *
 */

function PrivateRoute({ children, ...rest }: any) {
  // Get auth state and re-render anytime it changes
  const auth = useAuth();
  const queryString = stringify({
    redirect: window.location.pathname.split("/")[1],
  });

  return (
    <Route
      {...rest}
      render={({ location }: any) =>
        auth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: `/login`,
              state: { from: location },
              search: `?${queryString}`,
            }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  return (
    <Suspense fallback={<CustomSpin />}>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <PrivateRoute exact={true} path={"/dashboard"}>
          <AuthorisedLayout>
            <Suspense fallback={<CustomSpin />}>
              <Dashboard />
            </Suspense>
          </AuthorisedLayout>
        </PrivateRoute>
        <PrivateRoute exact={true} path={"/deposit"}>
          <AuthorisedLayout>
            <Suspense fallback={<CustomSpin />}>
              <Deposit />
            </Suspense>
          </AuthorisedLayout>
        </PrivateRoute>
        <PrivateRoute exact={true} path={"/withdrawal"}>
          <AuthorisedLayout>
            <Suspense fallback={<CustomSpin />}>
              <Withdrawal />
            </Suspense>
          </AuthorisedLayout>
        </PrivateRoute>
        <PrivateRoute exact={true} path={"/settings"}>
          <AuthorisedLayout>
            <Suspense fallback={<CustomSpin />}>
              <Settings />
            </Suspense>
          </AuthorisedLayout>
        </PrivateRoute>
        <Route path={"/login"}>
          <UnauthorisedLayout>
            <Login />
          </UnauthorisedLayout>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
