import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import ListIcon from "@mui/icons-material/List";
import { Alert, Button, Container, Grid, Paper, Snackbar } from "@mui/material";
import axios from "axios";
import { useHistory } from "react-router";
import { axiosApiInstance } from "../routes";

export default function ChangeMyPassword(props) {
  const [failVO, setFailVO] = React.useState({ fail: false, message: "" });
  const history = useHistory();
  const [nowPassword, setNowPassword] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPwd, setConfirmPwd] = React.useState("");
  const [pwAvail, setPwAvail] = React.useState(false);

  //문자,숫자,특수문자 포함 7자리수이상
  let regExpPw = /(?=.*\d{1,50})(?=.*[~`!@#$%^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{7,12}$/;

  const handleClose = () => {
    setFailVO({ ...failVO, fail: false, status: "error" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (password !== confirmPwd) {
      setFailVO({ ...failVO, fail: true, message: "비밀번호를 확인하세요" });
    } else if (data.get("password").length < 7) {
      setFailVO({ ...failVO, fail: true, status: "error", message: "7자리이상의 숫자,문자,특수문자를 입력해주세요" });
      setPwAvail(true);
    } else if (pwAvail) {
      setFailVO({ ...failVO, fail: true, status: "error", message: "알맞는 비밀번호를 입력해주세요" });
    } else {
      axiosApiInstance
        .post(
          "http://localhost:8080/user/changeMyPassword",
          {
            id: props.userinfo.uuidContext,
            nowpassword: nowPassword,
            password: password,
          }
          //{ withCredentials: true}
        )
        .then(
          (res) => {
            //console.log(res);
            setFailVO({ ...failVO, fail: true, status: "success", message: "비밀번호 변경 성공" });
            setTimeout(() => {
              history.push("/mainpage/dashboardpage");
            }, 1000);
          },
          (error) => {
            console.log("got: " + error.response.data);
            setFailVO({ ...failVO, fail: true, status: "error", message: error.response.data });
            //setFailVO({ ...failVO, fail: true, message: "비밀번호 변경에 실패하였습니다" });
          }
        );
    }
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
      <Grid container spacing={2} sx={{ mt: 5 }}>
        <Grid item xs={12}>
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Snackbar autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }} open={failVO["fail"]} onClose={handleClose}>
              <Alert onClose={handleClose} severity={failVO["status"]}>
                {failVO["message"]}
              </Alert>
            </Snackbar>
            <Container maxWidth='sm'>
              <Grid container>
                <Grid item xs={12}>
                  <h2>비밀번호 변경</h2>
                </Grid>
                <Grid item xs={4}>
                  <h4>현재 비밀번호</h4>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name='nowpassword'
                    label='비밀번호'
                    type='password'
                    onChange={(e) => {
                      setNowPassword(e.target.value);
                    }}
                    autoComplete='current-password'
                    variant='standard'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <h4>변경 비밀번호</h4>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    name='password'
                    label='비밀번호'
                    error={pwAvail}
                    helperText={pwAvail ? "특수문자,영문자,숫자 7자리이상 입력" : ""}
                    placeholder='7자리이상 입력하세요'
                    type='password'
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (e.target.value.length >= 7) {
                        setPwAvail(!regExpPw.test(e.target.value));
                      } else {
                        setPwAvail(false);
                      }
                    }}
                    autoComplete='current-password'
                    variant='standard'
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={4}>
                  <h4>변경 비밀번호 확인</h4>
                </Grid>
                <Grid item xs={8}>
                  <div>
                    <TextField
                      error={password !== confirmPwd}
                      helperText={password !== confirmPwd ? "비밀번호가 일치하지 않습니다" : " "}
                      name='passwordChk'
                      label='비밀번호 확인'
                      type='password'
                      autoComplete='current-password'
                      onChange={(e) => {
                        setConfirmPwd(e.target.value);
                      }}
                      variant='standard'
                      fullWidth
                      required
                    />
                  </div>
                </Grid>

                {/* <Grid item xs={12}>
              <h3>권한설정</h3>
            </Grid> */}
                <Grid item xs={12}></Grid>
              </Grid>
              <Button type='submit' variant='contained'>
                비밀번호 변경
              </Button>
            </Container>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
