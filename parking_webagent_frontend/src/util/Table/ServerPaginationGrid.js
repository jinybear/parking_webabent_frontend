import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { axiosApiInstance } from '../../routes';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function loadServerRows(apiUrl, page, size) {  
  
  return new Promise((resolve) => {   
    axiosApiInstance.get(
      //'http://localhost:8080/systems/log'
      apiUrl + '?page=' + page + '&size=' + size
    ).then((res) => {
      console.log(res);
      resolve(res.data);      
    }, (error) => {
      console.log("failed to get logs");
    })
  })
}

export default function ServerPaginationGrid({ apiUrl, columns }) {  
  const sizes = [10, 20, 50, 80];  
  const [pageData, setPageData] = React.useState({
    'url': apiUrl,
    'page': 0,
    'size': 20   
  });
  
  const [data, setData] = React.useState({
    'columns': [],
    'rows': [],    
    'totalCount': 0
  });

  const [loading, setLoading] = React.useState(false);
  const [currency, setCurrency] = React.useState(20);  
  
  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      const res = await loadServerRows(pageData.url, pageData.page, pageData.size);
      
      if (!active) {
        return;
      }      
      
      const columns1 = columns.map((column) => {
        return {          
          field: column.field,
          flex: column.flex,
          headerName: column.headerName,
          headerClassName: 'super-app',
          headerAlign: 'center',
          editable: true          
        }
      });

      setLoading(false);
      setData({...data, 'columns': columns1, 'rows': res.content, 'totalCount': res.totalElements});      
    })();

    return () => {
      active = false;
    };
  }, [pageData]);

  const handleChange = (event) => {
    setCurrency(event.target.value);
    setPageData({...pageData, 'page':0, 'size': event.target.value})
  }

  return (
    
    <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
    
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">       
          <TextField             
            select 
            label='한번에 표시할 수량' 
            value={currency} onChange={handleChange}
            variant="filled"
          >
          {sizes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
          </TextField>
      </Box>
      <Box sx={{
            '& .super-app': {
              backgroundColor: '#4b89dc',
              color: 'white',
            },
          }}>
        <div style={{ height: 700, width: '100%' }}>
          <DataGrid 
            //checkboxSelection
            rowHeight={30}
            disableSelectionOnClick
            rowsPerPageOptions={[]}          
            rows={data.rows}
            columns={data.columns}          
            pagination
            page={pageData.page}
            pageSize={pageData.size}
            rowCount={data.totalCount}
            paginationMode="server"
            onPageChange={(newPage) =>  setPageData({...pageData, 'page':newPage})}
            // loading={loading}
          />
        </div>
      </Box>
    </Paper>
  );
}




/**
 * 해당 component 사용시 column 과 각 column 별 너비 비율을 넣어줘야 한다. 아래 예제('log' domain 기준) 참조
 * 
const params = {
   "apiUri": 'http://localhost:8080/systems/log', 
   "columns": [
    {
      field: "id",          // database table column과 매칭할 속성
      flex: 0.05,            // 너비 비율 (0.0~1.0) 
      headerName: "아이디"  // UI 상에 표출할 column 이름
   },
   {
      field: "level",
      flex: 0.05,
      headerName: "레벨"
   },
   {
      field: "description",
      flex: 0.6,
      headerName: "설명"
   },
   {
      field: "srcIpaddress",
      flex: 0.15,
      headerName: "출처"
   },
   {
      field: "createdAt",
      flex: 0.15,
      headerName: "생성시간"
   }  
  ]
}

return (
  <div>
    <ServerPaginationGrid {...params} />
  </div>
)
*/