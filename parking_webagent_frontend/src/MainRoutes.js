import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DashboardPage from "./views/DashboardPage";
import EdgeStatusPage from "./views/EdgeStatusPage";
import LogPage from "./views/LogPage";
import SettingPage from "./views/SettingPage";


export default function MainRoutes() {
    return (
        <div>
            <Switch>
                <Route path="/mainpage/dashboardpage" component={DashboardPage} />
                <Route path="/mainpage/settingpage" component={SettingPage} />
                <Route path="/mainpage/logpage" component={LogPage} />
                <Route path="/mainpage/edgestatus" component={EdgeStatusPage} />
            </Switch>
        </div>
      );
}