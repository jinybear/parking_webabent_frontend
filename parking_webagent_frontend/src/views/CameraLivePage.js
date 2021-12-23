import * as React from "react";
import mqtt from "mqtt";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CloseOutlined } from "@mui/icons-material";

export default function CameraLivePage(props) {
  const ws = React.useRef(null);
  const sourceId = props.location.state;
  const [data, setData] = React.useState({});
  let sectorId = [];
  let pkFull = [];
  let fullPercent = [];
  let pkTotal = [];
  var allPkFull = 0;
  var allFullPercent = 0;
  var allPkTotal = 0;
  //let outsidePkCount = 0;
  const [outsidePkCount, setOutsidePkCount] = React.useState();

  React.useEffect(() => {
    const connectOption = {
      clean: true,
      connectTimeOut: 4000,
      reconnectPeriod: 4000,
      clientId: "",
      username: "",
      password: "",
    };

    ws.current = mqtt.connect("ws://223.171.87.12:11991", connectOption);

    ws.current.subscribe("/decision/#");
    ws.current.subscribe("/outsidesum/#");

    ws.current.on("connect", () => {
      console.log("mqtt 연결");
    });

    ws.current.on("message", (topic, msg) => {
      //console.log(msg.toString("utf8"));

      var _payloadSplit = msg.toString().split(",");
      var _payload = _payloadSplit.slice(0, _payloadSplit.length - 1);
      let obj = {};
      for (let i = 0; i < _payload.length; i++) {
        const _payloadArray = _payload[i].split("/");
        //console.log(_payloadArray);
        if (sourceId == _payloadArray[0]) {
          var _id = _payloadArray[1];

          if (_id in obj) {
            obj[_id] = [...obj[_id], _payloadArray[2].split(":")[1]];
          } else {
            obj[_id] = [_payloadArray[2].split(":")[1]];
          }
          setData({ ...obj });
        }

        const outsideSourceId = _payloadArray[1].split(":")[0];
        const outsideCount = null;

        if (sourceId == outsideSourceId) {
          const _outsidesum = _payloadArray[1].split(":")[1];
          const outsidePkCount = Math.round((_outsidesum * 10) / 10);
          setOutsidePkCount(outsidePkCount);
        }
      }
    });
    return () => {
      if (ws.current.connected) {
        ws.current.unsubscribe("/decision/#");
        ws.current.end();
      }
    };
  }, [sourceId]);

  //console.log(data);

  const doublearray = [];
  for (let key in data) {
    // key 구역 아이디
    // data[key] : 구역별 주공차 리스트
    // console.log("key : " + key); // 구역번호
    // console.log("value : " + data[key]);
    // console.log("size : " + data[key].length); // 구역별 총 주차 개수
    // console.log("filtering : " + data[key].filter((x) => x == 1).length); //구역별 만차인 개수

    const full = data[key].filter((x) => x == 1).length;
    const empty = data[key].filter((x) => x == 0).length;
    const total = data[key].length;
    const jumyou = ((full / total) * 1.0 * 100).toFixed(2);
    const array = [key, full, empty, total, jumyou];
    doublearray.push(array);

    pkFull.push(data[key].filter((x) => x == 1).length);
    pkTotal.push(data[key].length);
  }

  allPkFull = pkFull.reduce((prev, cur) => {
    return prev + cur;
  }, 0);
  allPkTotal = pkTotal.reduce((prev, cur) => {
    return prev + cur;
  }, 0);
  allFullPercent = ((allPkFull / allPkTotal) * 1.0 * 100).toFixed(2);

  return (
    <>
      <h2>{sourceId} 카메라 전체 주차/공차</h2>
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
              <TableCell align="center">{allPkTotal - allPkFull}</TableCell>
              <TableCell align="center">{allPkTotal}</TableCell>
              <TableCell align="center">{allFullPercent}%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <h2>{sourceId} 카메라 구열별 주차/공차</h2>
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
            {doublearray.map((row) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row[0]}</TableCell>
                <TableCell align="center">{row[1]}</TableCell>
                <TableCell align="center">{row[2]}</TableCell>
                <TableCell align="center">{row[3]}</TableCell>
                <TableCell align="center">{row[4]}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>{sourceId} 카메라 감시 대상 불법 주차</h2>
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
              <TableCell align="center"></TableCell>
              <TableCell align="center">{outsidePkCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
