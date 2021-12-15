import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DashboardPage from "./views/DashboardPage";
import LogPage from "./views/LogPage";
import SettingPage from "./views/SettingPage";


export default function MainRoutes() {
    return (
        <div>
            <Switch>
                <Route path="/dashboardpage" component={DashboardPage} />
                <Route path="/settingpage" component={SettingPage} />
                <Route path="/logpage" component={LogPage} />
            </Switch>
        </div>
      );
}