import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Alert, Button, Container, Paper, Snackbar, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useHistory } from "react-router";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { axiosApiInstance } from "../routes";

const columns = [
  //{ field: "id", headerName: "No.", width: 70 },
  { field: "role", headerName: "계정유형", width: 170 },
  { field: "userid", headerName: "아이디", width: 130 },
  { field: "locked", headerName: "계정상태", width: 130 },
];

export default function DataTable() {
  const history = useHistory();

  let [data, setData] = React.useState([]); //table data
  const [selectionModel, setSelectionModel] = React.useState([]); //table selection
  const [failVO, setFailVO] = React.useState({ fail: false, message: "" });

  const handleClose = () => {
    setFailVO({ ...failVO, fail: false });
  };

  React.useEffect(() => {
    handleData();
  }, []);

  const handleData = () => {
    axiosApiInstance.post("http://localhost:8080/user/getAccountList").then(
      (res) => {
        // 이거 좀 문제========
        if (res.data === "") {
          return;
        }
        //=============
        res.data.forEach((d) => {
          if (d.locked === false) {
            d.locked = "-";
          } else {
            d.locked = "잠금";
          }
        });

        setData(res.data);
      },
      (error) => {
        console.log("got: " + error.response);
      }
    );
  };

  const handlePurge = (selectNum) => {
    const res = data.filter((x) => !selectNum.includes(x.id));
    //console.log("필터된거" + res);
    setData(res);
  };

  const deleteHandle = () => {
    if (selectionModel.length === 0) {
      setFailVO({ ...failVO, fail: true, message: "삭제할 계정을 선택하세요" });
    } else {
      axiosApiInstance.post("http://localhost:8080/user/deleteAccount", { ids: selectionModel }).then(
        (res) => {
          //console.log(res);
          alert("삭제성공");
          handlePurge(selectionModel);
        },
        (error) => {
          //console.log("got: " + error.response);
          setFailVO({ ...failVO, fail: true, message: "삭제실패" });
        }
      );
    }
  };

  const lockCheck = () => {
    return data
      .filter((x) => selectionModel.includes(x.id))
      .map((v) => v.locked)
      .includes("-");
  };

  const unlockHandle = () => {
    console.log(lockCheck());
    if (selectionModel.length === 0) {
      setFailVO({ ...failVO, fail: true, message: "잠금해제할 계정을 선택하세요" });
    } else if (lockCheck) {
      setFailVO({ ...failVO, fail: true, message: "잠겨있는 계정을 선택하세요" });
    } else {
      axiosApiInstance.post("http://localhost:8080/user/unlockAccount", { ids: selectionModel }).then(
        (res) => {
          //console.log(res);
          alert("잠금해제 성공");
          handleData();
          //history.push("/accountlist");
        },
        (error) => {
          console.log("got: " + error.response);
          setFailVO({ ...failVO, fail: true, message: "잠금해제 실패" });
        }
      );
    }
  };

  console.log();

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
        <Alert onClose={handleClose} severity='error'>
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
                pathname: "/createaccount",
                state: data,
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
              //handlePurge(newSelectionModel);
            }}
            selectionModel={selectionModel}
            {...data}
          />
        </div>
      </Container>
    </Paper>
  );
}
