import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DashboardPage from "./views/DashboardPage";
import EdgeStatusPage from "./views/EdgeStatusPage";
import LogPage from "./views/LogPage";
import CreateAccount from "./views/CreateAccount";
import AccountList from "./views/AccountList";
import ChangePassword from "./views/ChangePassword";
import ChangeMyPassword from "./views/ChangeMyPassword";


export default function MainRoutes(props) {
    return (
        <div>
            <Switch>
                <Route path="/mainpage/dashboardpage" component={DashboardPage} />
                <Route path="/mainpage/logpage" component={LogPage} />
                <Route path="/mainpage/edgestatus" component={EdgeStatusPage} />
                <Route path='/createaccount' component={CreateAccount} />
                <Route path='/changepassword' component={ChangePassword} />
                <Route path='/accountlist' render={() => <AccountList userinfo={props.userinfo} />} />
                <Route path='/changemypassword' render={() => <ChangeMyPassword userinfo={props.userinfo} />} />
            </Switch>
        </div>
      );
}

