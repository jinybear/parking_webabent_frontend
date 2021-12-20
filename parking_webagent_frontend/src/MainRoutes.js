import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DashboardPage from "./views/DashboardPage";
import CreateAccount from "./views/CreateAccount";
import AccountList from "./views/AccountList";
import ChangePassword from "./views/ChangePassword";
import ChangeMyPassword from "./views/ChangeMyPassword";

export default function MainRoutes(props) {
  return (
    <div>
      <Switch>
        <Route path='/dashboardpage' component={DashboardPage} />

        <Route path='/createaccount' component={CreateAccount} />
        <Route path='/changepassword' component={ChangePassword} />
        <Route path='/accountlist' render={() => <AccountList userinfo={props.userinfo} />} />
        <Route path='/changemypassword' render={() => <ChangeMyPassword userinfo={props.userinfo} />} />
      </Switch>
    </div>
  );
}
