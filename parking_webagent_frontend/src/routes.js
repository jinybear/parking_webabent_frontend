import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Login from "./login/Login"
import Main from "./mainpage/Main"

export default function Routes() {
  // let isAuthorized = sessionStorage.getItem("isAuthorized");

  const history = useHistory();
  history.push("/login");

  return (
    <div>
      {/* {true ? <Redirect to="/login" /> : <Redirect to="/" />} */}
      
      <Router>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
}