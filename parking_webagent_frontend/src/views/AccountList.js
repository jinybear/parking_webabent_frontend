import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, Button, Container, Paper, Snackbar, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PasswordIcon from "@mui/icons-material/Password";
import { useHistory } from "react-router";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { axiosApiInstance } from "../routes";

const columns = [
  //{ field: "id", headerName: "No.", width: 70 },
  { field: "role", headerName: "계정유형", width: 170 },
  { field: "userid", headerName: "아이디", width: 130 },
  { field: "locked", headerName: "계정상태", width: 130 },
];

export default function DataTable(props) {
  const history = useHistory();

  let [data, setData] = React.useState([]); //table data
  const [realdata, setRealdata] = React.useState([]);
  const [selectionModel, setSelectionModel] = React.useState([]); //table selection
  const [failVO, setFailVO] = React.useState({ fail: false, message: "" });

  const handleClose = () => {
    setFailVO({ ...failVO, fail: false, status: "error" });
  };

  React.useEffect(() => {
    handleData();
  }, []);

  //backend에 리스트 가져오기 요청
  const handleData = () => {
    axiosApiInstance.post("/api/user/getAccountList").then(
      (res) => {
        // 이거 좀 문제========
        if (res.data === null) {
          return;
        }
        //=============

        setRealdata(res.data);

        //console.log(res);
        res.data.forEach((d) => {
          if (d.locked === false) {
            d.locked = "-";
          } else {
            d.locked = "잠금";
          }
        });

        const result = res.data.filter((user) => user.userid !== props.userinfo.useridContext);
        setData(result);
      },
      (error) => {
        console.log("got: " + error.response);
      }
    );
  };

  //화면에서 선택된 계정 지우기(화면에서만 삭제)
  const handlePurge = () => {
    const res = data.filter((x) => !selectionModel.includes(x.id));
    //console.log("필터된거" + res);
    setData(res);
  };

  //backend에 계정삭제 요청
  const deleteHandle = () => {
    if (selectionModel.length === 0) {
      setFailVO({ ...failVO, fail: true, status: "error", message: "삭제할 계정을 선택하세요" });
    } else {
      axiosApiInstance.post("/api/user/deleteAccount", { ids: selectionModel }).then(
        (res) => {
          //console.log(res);
          setFailVO({ ...failVO, fail: true, status: "success", message: "계정삭제 성공" });
          handlePurge();
        },
        (error) => {
          //console.log("got: " + error.response);
          setFailVO({ ...failVO, fail: true, status: "error", message: "계정삭제 실패" });
        }
      );
    }
  };

  const handleChangePW = () => {
    if (selectionModel.length === 0) {
      setFailVO({ ...failVO, fail: true, status: "error", message: "비밀번호를 변경할 계정을 선택하세요" });
    } else if (selectionModel.length > 1) {
      setFailVO({ ...failVO, fail: true, status: "error", message: "비밀번호를 변경할 계정을 한개만 선택하세요" });
    } else {
      history.push({
        pathname: "/mainpage/changepassword",
        state: selectionModel,
      });
    }
  };

  //체크한 계정의 잠금상태확인(잠겨있지않은 계정 선택되었을시 true 반환)
  const lockCheck = () => {
    return data
      .filter((x) => selectionModel.includes(x.id))
      .map((v) => v.locked)
      .includes("-");
  };

  //backend에 잠금해제 요청
  const unlockHandle = () => {
    //console.log(lockCheck());
    if (selectionModel.length === 0) {
      setFailVO({ ...failVO, fail: true, status: "error", message: "잠금해제할 계정을 선택하세요" });
    } else if (lockCheck()) {
      setFailVO({ ...failVO, fail: true, status: "error", message: "잠겨있는 계정을 선택하세요" });
    } else {
      axiosApiInstance.post("/api/user/unlockAccount", { ids: selectionModel }).then(
        (res) => {
          setFailVO({ ...failVO, fail: true, status: "success", message: "잠금해제 성공" });
          //backend에 다시 리스트 요청
          handleData();
          //history.push("/accountlist");
        },
        (error) => {
          console.log("got: " + error.response);
          setFailVO({ ...failVO, fail: true, status: "error", message: "잠금해제 실패" });
        }
      );
    }
  };

  return (
    <Paper
      sx={{
        p: 2,
        verticalAlign: "center",
        display: "flex",
        flexDirection: "column",
        height: 700,
      }}
    >
      <Snackbar autoHideDuration={3000} anchorOrigin={{ vertical: "top", horizontal: "right" }} open={failVO["fail"]} onClose={handleClose}>
        <Alert onClose={handleClose} severity={failVO["status"]}>
          {failVO["message"]}
        </Alert>
      </Snackbar>
      <Container maxWidth='sm'>
        <h3>관리자 계정 리스트</h3>
        <Stack direction='row' spacing={2} padding='20px'>
          <Button
            variant='contained'
            startIcon={<AddIcon />}
            onClick={() =>
              history.push({
                pathname: "/mainpage/createaccount",
                state: realdata,
              })
            }
          >
            계정추가
          </Button>
          <Button variant='outlined' startIcon={<DeleteIcon />} onClick={deleteHandle}>
            삭제
          </Button>
          <Button variant='outlined' color='error' startIcon={<LockOpenIcon />} onClick={unlockHandle}>
            잠금해제
          </Button>
          <Button variant='outlined' startIcon={<PasswordIcon />} onClick={handleChangePW}>
            비밀변호 변경
          </Button>
        </Stack>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            rows={data}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            {...data}
          />
        </div>
      </Container>
    </Paper>
  );
}
