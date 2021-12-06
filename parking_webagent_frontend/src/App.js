import './App.css';
import Routes from './routes';
import axios from 'axios';
import jwtDecode from 'jwt-decode';


function App() { 
  return (
    <div>    
      <Routes/>
    </div>
  );
}

export default App;



// 만료기간 체크
const checkExpired = () => {    
  if ('Authorization' in axios.defaults.headers.common) {
    let token = axios.defaults.headers.common['Authorization'].substring(7)
    let now = new Date();
    let expired = Number(now.getTime().toString().substr(0, 10));
    if ((jwtDecode(token).exp - expired) < 30 ) {
       // 만료 예정 시간까지 남은 시간이 30초 미만이면 token refresh 요청
       //        
    }
  } else {
    console.log("Authorization header 없음");
  }
}