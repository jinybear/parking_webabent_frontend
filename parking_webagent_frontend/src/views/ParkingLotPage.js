import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { axiosApiInstance } from "../routes";

export default function BasicTable(props) {
  const areaId = props.location.state;
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axiosApiInstance
    .post("http://localhost:8080/parkingLot", null,{ 
    params: {areaId}
  }).then((res)=>{
    if(res.data === null){
      return;
    }
    const parkingLiveVO = [...res.data];
    console.log(parkingLiveVO);
    setData(res.data);
  })
  }, []);
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">구역</TableCell>
            <TableCell align="right">주차</TableCell>
            <TableCell align="right">공차</TableCell>
            <TableCell align="right">전체주차면</TableCell>
            <TableCell align="right">점유율</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.parkingFull}</TableCell>
              <TableCell align="right">{row.parkingEmpty}</TableCell>
              <TableCell align="right">{row.parkingTotal}</TableCell>
              <TableCell align="right">{row.fullPercent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
