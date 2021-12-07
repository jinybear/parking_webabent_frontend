import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Paper, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useHistory } from "react-router";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 130,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.getValue(params.id, "firstName") || ""} ${params.getValue(params.id, "lastName") || ""}`,
  },
];

export default function DataTable() {
  const history = useHistory();

  const rows = [
    {
      id: 1,
      lastName: "Snow",
      firstName: "Jon",
      age: 35,
    },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
    { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
    { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
    { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
    { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
    { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
    { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
  ];

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        height: 800,
      }}
    >
      <Stack direction='row' spacing={2}>
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
      <div style={{ height: 600, width: "100%", padding: "20px" }}>
        <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection />
      </div>
    </Paper>
  );
}
