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