import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { axiosApiInstance } from "../routes";
import { Watch } from "@mui/icons-material";

export default function BasicTable(props) {
  const areaId = props.location.state;
  const [data, setData] = React.useState([]);
  const [allPkFull, setAllPkFull] = React.useState();
  const [allPkEmpty, setAllPkEmpty] = React.useState();
  const [allPkTotal, setAllPkTotal] = React.useState();
  const [allFullPercent, setFullPercent] = React.useState([]);
  const [outData, setOutData] = React.useState({});

  React.useEffect(() => {
    axiosApiInstance
      .post("http://localhost:8080/parkingLot", null, {
        params: { areaId },
      })
      .then((parkingLive) => {
        if (parkingLive.data === null) {
          return;
        }
        const parkingLiveLog = [...parkingLive.data];
        console.log(parkingLiveLog);
        setData(parkingLive.data);

        const _allPkFull = parkingLive.data
          .map((t) => t.parkingFull)
          .reduce((prev, cur) => {
            return prev + cur;
          }, 0);
        const _allPkEmpty = parkingLive.data
          .map((t) => t.parkingEmpty)
          .reduce((prev, cur) => {
            return prev + cur;
          }, 0);
        const _allPkTotal = parkingLive.data
          .map((t) => t.parkingTotal)
          .reduce((prev, cur) => {
            return prev + cur;
          }, 0);
        const _allFullPercent = (
          (_allPkFull / (_allPkTotal * 1.0)) *
          100
        ).toFixed(2);

        console.log(_allPkFull);
        console.log(_allPkEmpty);
        console.log(_allPkTotal);
        console.log(_allPkFull);

        setAllPkFull(_allPkFull);
        setAllPkEmpty(_allPkEmpty);
        setAllPkTotal(_allPkTotal);
        setFullPercent(_allFullPercent);
      });

    axiosApiInstance
      .post("http://localhost:8080/OutParking", null, {
        params: { areaId },
      })
      .then((outParkingLive) => {
        if (outParkingLive.data === null) {
          return;
        }
        const outParkingLiveLog = [...outParkingLive.data];
        console.log(outParkingLiveLog);
        setOutData(outParkingLive.data);
      });
  }, [areaId]);

  React.useEffect(() => {}, [areaId]);

  return (
    <>
      <h1>{areaId} 주차장 전체 주차/공차</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">주차</TableCell>
              <TableCell align="center">공차</TableCell>
              <TableCell align="center">전체주차면</TableCell>
              <TableCell align="center">점유율</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{allPkFull}</TableCell>
              <TableCell align="center">{allPkEmpty}</TableCell>
              <TableCell align="center">{allPkTotal}</TableCell>
              <TableCell align="center">{allFullPercent}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h1>{areaId} 주차장 구열별 주차/공차</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">구역</TableCell>
              <TableCell align="center">주차</TableCell>
              <TableCell align="center">공차</TableCell>
              <TableCell align="center">전체주차면</TableCell>
              <TableCell align="center">점유율</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.parkingFull}</TableCell>
                <TableCell align="center">{row.parkingEmpty}</TableCell>
                <TableCell align="center">{row.parkingTotal}</TableCell>
                <TableCell align="center">{row.fullPercent}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h1>{areaId} 감시 대상 불법 주차</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">
                감시 대상 불법 주차 구역 개수
              </TableCell>
              <TableCell align="center">불법 주차 차량 대수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{outData[0]}</TableCell>
              <TableCell align="center">{outData[1]}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
