import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DashboardPage from "./views/DashboardPage";
import CreateAccount from "./views/CreateAccount";
import AccountList from "./views/AccountList";

export default function MainRoutes() {
  return (
    <div>
      <Switch>
        <Route path='/dashboardpage' component={DashboardPage} />

        <Route path='/createaccount' component={CreateAccount} />
        <Route path='/accountlist' component={AccountList} />
      </Switch>
    </div>
  );
}
