import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Paper, Stack } from "@mui/material";
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

  React.useEffect(() => {
    axiosApiInstance.post("http://localhost:8080/user/getAccountList").then(
      (res) => {
        // console.log(res);
        // console.log(res.data);
        //console.log(data[0]);
        res.data.forEach((d) => {
          if (d.locked === false) {
            d.locked = "-";
          } else {
            d.locked = "잠금";
          }
        });
        console.log(res.data);
        setData(res.data);
      },
      (error) => {
        console.log("got: " + error.response);
      }
    );
  }, []);

  console.log(selectionModel);

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
      <Container maxWidth='sm'>
        <h3>관리자 계정 리스트</h3>
        <Stack direction='row' spacing={2} padding='20px'>
          <Button variant='contained' startIcon={<AddIcon />} onClick={() => history.push("/createaccount")}>
            계정추가
          </Button>
          <Button variant='outlined' startIcon={<DeleteIcon />}>
            삭제
          </Button>
          <Button variant='outlined' color='error' startIcon={<LockOpenIcon />}>
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
            }}
            selectionModel={selectionModel}
            {...data}
          />
        </div>
      </Container>
    </Paper>
  );
}
