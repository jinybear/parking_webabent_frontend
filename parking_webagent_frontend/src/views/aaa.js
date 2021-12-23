import * as React from 'react';
import { axiosApiInstance } from "../routes";
import { Key } from '@mui/icons-material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: '구역', width: 70 },
  { field: 'parkingFull', headerName: '주차', width: 130 },
  { field: 'parkingEmpty', headerName: '공차', width: 130 },
  { field: 'parkingTotal', headerName: '전체주차면', width: 130 },
  { field: 'fullPercent', headerName: '점유율', width: 130 }
];


export default function CustomizedTables(props) {


  const areaId = props.location.state;
  const [data, setData] = React.useState([]);

  axiosApiInstance
    .post("/api/parkingLot", null,{ 
    params: {areaId}
  }).then((res)=>{
    if(res.data === null){
      return;
    }
    setData(res.data);
    const parkingLiveVO = [...res.data];
    console.log(parkingLiveVO);

  })

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={data.length}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}
