import * as React from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © Nuricon'}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [fail, setFail] = React.useState(false);
  const history = useHistory();

  const handleClose = () => {
    setFail(false);
  }  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line no-console
    console.log({
      id: data.get('ID'),
      password: data.get('password'),
    });    
    
    axios.post(      
      'http://localhost:8080/login',
      {
        name: data.get('ID'),
        password: data.get('password')
      },
      //{ withCredentials: true}
    ).then((res) => {
      console.log(res.status);        
      console.log("token : " + res.data);              
      setFail(false);
      history.push("/");
    }, (error) => {
      console.log("got you");
      setFail(true);
    })    
  };

  return (           
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />            
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Snackbar 
              autoHideDuration={3000}
              anchorOrigin={{ vertical:'top', horizontal:'right' }}
              open={fail}
              onClose={handleClose}              
            >
              <Alert onClose={handleClose} severity="error">Login 실패 - 입력정보를 확인하세요.</Alert>
            </Snackbar>
            <TextField
              margin="normal"
              required
              fullWidth
              id="ID"
              label="ID"
              name="ID"
              autoComplete="ID"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );  
}

//export default withRouter(Login);