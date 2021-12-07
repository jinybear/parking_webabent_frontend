import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Alert, Button, Container, Grid, Paper, Snackbar } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router";
import { axiosApiInstance } from "../routes";

export default function CreateAccount() {
  const [failVO, setFailVO] = React.useState({ fail: false, message: "" });
  const history = useHistory();

  const handleClose = () => {
    setFailVO({ ...failVO, fail: false });
  };

  const state = {
    password: "",
    passwordChk: "",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // eslint-disable-next-line no-console
    console.log({
      id: data.get("id"),
      password: data.get("password"),
    });

    axiosApiInstance
      .post(
        "http://localhost:8080/user/add",
        {
          id: data.get("id"),
          password: data.get("password"),
        }
        //{ withCredentials: true}
      )
      .then(
        (res) => {
          alert("계정 생성 성공");
        },
        (error) => {
          console.log("got: " + error.response.data);
          setFailVO({ ...failVO, fail: true, message: "계정생성에 실패하였습니다" });
        }
      );
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        verticalAlign: "center",
        flexDirection: "column",
        height: 600,
      }}
    >
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Snackbar autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }} open={failVO["fail"]} onClose={handleClose}>
          <Alert onClose={handleClose} severity='error'>
            {failVO["message"]}
          </Alert>
        </Snackbar>
        <Container maxWidth='sm'>
          <Grid container>
            <Grid item xs={12}>
              <h2>관리자 계정 생성</h2>
            </Grid>
            <Grid item xs={3}>
              <h4>ID</h4>
            </Grid>
            <Grid item xs={9}>
              <TextField name='id' label='아이디' variant='standard' fullWidth required />
            </Grid>
            <Grid item xs={3}>
              <h4>비밀번호</h4>
            </Grid>
            <Grid item xs={9}>
              <TextField name='password' label='비밀번호' placeholder='7자리이상 입력하세요' type='password' autoComplete='current-password' variant='standard' fullWidth required />
            </Grid>
            <Grid item xs={3}>
              <h4>비밀번호 확인</h4>
            </Grid>
            <Grid item xs={9}>
              <div>
                <TextField error name='passwordChk' label='비밀번호 확인' type='password' autoComplete='current-password' variant='standard' fullWidth required />
                <div>패스워드 일치 ㄴㄴ</div>
              </div>
            </Grid>

            <Grid item xs={12}>
              <h3>권한설정</h3>
            </Grid>
            <Grid item xs={12}></Grid>
          </Grid>
          <Button type='submit' variant='contained'>
            계정 만들기
          </Button>
        </Container>
      </Box>
    </Paper>
  );
}
