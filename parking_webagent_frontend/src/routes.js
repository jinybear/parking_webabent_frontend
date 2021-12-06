import { Switch, Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Login from "./login/Login"
import Main from "./mainpage/Main"
import axios from 'axios';

export default function Routes() {
  // let isAuthorized = sessionStorage.getItem("isAuthorized");

  const history = useHistory();
  history.push("/login");

  const implementaionCustomAxios = () => {    
    axiosApiInstance.interceptors.request.use(
      async config => {      
        const accessToken = localStorage.getItem('access_token');
        if (accessToken){
          console.log('access-token : ' + accessToken);

          config.headers = { 
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
          }          
        }
        
        // if ('Authorization' in axios.defaults.headers.common) {
        //   let token = axios.defaults.headers.common['Authorization'].substring(7)
        //   let now = new Date();
        //   let expired = Number(now.getTime().toString().substr(0, 10));
        //   if ((jwtDecode(token).exp - expired) < 30 ) {
        //      // 만료 예정 시간까지 남은 시간이 30초 미만이면 token refresh 요청
        //   }
        // }
        
        return config;
      }
    );
  
    axiosApiInstance.interceptors.response.use((response) => response,
      async (error) => {        
        const { response, config } = error;        
        
        if(response.status == 401) {
          let token = localStorage.getItem('refresh_token');
          if (token){
            console.log('refresh token : ' + token);

            axiosApiInstance.post(      
              'http://localhost:8080/user/refresh',
              {
                refreshToken: token
              },
            ).then((res) => {              
              localStorage.setItem('parking_webagent', res.data);
              config.headers = { 
                'Authorization': `Bearer ${res.data['access-token']}`,
                'Accept': 'application/json',
              }
              return axiosApiInstance(config);
            }, (error) => {
              console.log("fail to refresh");
              history.push("/login");
            })
          }
        }         
      }
    );
  }
  
  implementaionCustomAxios();  

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

export const axiosApiInstance = axios.create()

