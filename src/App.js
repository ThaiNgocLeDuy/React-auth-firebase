import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./components/Account/SignUp";
import AuthProvider from "./components/Context/AuthProvider";
import UserPage from "./components/UserPage/UserPage";
import Login from "./components/Account/Login";
import PrivateRoute from "./PrivateRoute";
import ResetPassword from "./components/Account/ResetPassword";
import UpdatePassword from "./components/Account/UpdatePassword";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={UserPage} />
            <Route path="/login" exact>
              <Login />
            </Route>
            <Route path="/signup" exact>
              <SignUp />
            </Route>
            <Route path="/reset-password" exact>
              <ResetPassword />
            </Route>
            <PrivateRoute
              path="/update-password"
              exact
              component={UpdatePassword}
            />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
