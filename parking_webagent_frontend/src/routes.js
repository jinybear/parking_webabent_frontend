import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Login from "./login/Login";
import Main from "./mainpage/Main";
import axios from "axios";
import { LineAxisOutlined } from "@mui/icons-material";
import MainContent from "./mainpage/Main";

export default function Routes() {
  const history = useHistory();
  const token = sessionStorage.getItem("access_token");
  if (token == null){
    history.push("/login");
  }
    

  const implementaionCustomAxios = () => {    
    axiosApiInstance.interceptors.request.use(
      config => {     
        const accessToken = sessionStorage.getItem('access_token');
        
        if (accessToken){
          config.headers = { 
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          }          
        }

        return config;
      }
    );
  
    axiosApiInstance.interceptors.response.use((response) => {
      return response;
    },
      async (error) => {  
        const { response, config } = error;        
        
        if(response.status == 401) {     
          let token = sessionStorage.getItem('refresh_token');

          if (token){       
            console.log("try to refresh");
            const { data } = await axios.post(
              '/api/user/refresh',
              {
                token: token
              } 
            );

            const { access_token, refresh_token} = data;

            sessionStorage.setItem('access_token', access_token);
            sessionStorage.setItem('refresh_token', refresh_token); 
            config.headers = { 
              'Authorization': `Bearer ${access_token}`,
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            }       

            return axiosApiInstance(config);           
          } else {
            history.push("/login");
          }
        } else {          
          return Promise.reject(error);
          //throw error;
        }
      }
    );
  };

  implementaionCustomAxios();

  return (
    <div>
      <Switch>
          <Route path="/login" component={Login} />
          <Route path="/mainpage" component={MainContent} />
      </Switch>
    </div>
  );
}

export const axiosApiInstance = axios.create();
