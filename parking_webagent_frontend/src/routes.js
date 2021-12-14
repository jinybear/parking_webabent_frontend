import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Login from "./login/Login"
import Main from "./mainpage/Main"
import axios from 'axios';
import { LineAxisOutlined } from "@mui/icons-material";
import MainContent from "./mainpage/Main";

export default function Routes() {
  // let isAuthorized = sessionStorage.getItem("isAuthorized");

  const history = useHistory();
  history.push("/login");

  const implementaionCustomAxios = () => {    
    axiosApiInstance.interceptors.request.use(
      async config => {     
        const accessToken = sessionStorage.getItem('access-token');
        if (accessToken){
          console.log('access-token : ' + accessToken);

          config.headers = { 
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
          }          
        }

        console.log("pass preRequest");
        return config;
      }
    );
  
    axiosApiInstance.interceptors.response.use((response) => response,
    
      async (error) => {        
        const { response, config } = error;        
        
        if(response.status == 403) {
          let token = sessionStorage.getItem('refresh-token');
          if (token){
            console.log('refresh token : ' + token);
            
            axios.post(      
              'http://localhost:8080/user/refresh',
              {
                token: token
              },
            ).then((res) => {
              console.log("call refresh");

              if (res.status == 200) {                
                sessionStorage.setItem('access-token', res.data["access-token"]);
                sessionStorage.setItem('refresh-token', res.data["refresh-token"]);

                config.headers = { 
                  'Authorization': `Bearer ${res.data['access-token']}`,
                  'Accept': 'application/json',
                }                

                return axiosApiInstance(config);                  
              } else {                
                history.push("/login");
              }
            }, (error) => {
              history.push("/login");
              
            })
          } else {
            history.push("/login");            
          }
        }     
        Promise.reject(error);    
      }
    );
  }
  
  implementaionCustomAxios();  

  return (
    <div>
      <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={MainContent} />
      </Switch>
    </div>
  );
}

export const axiosApiInstance = axios.create()

