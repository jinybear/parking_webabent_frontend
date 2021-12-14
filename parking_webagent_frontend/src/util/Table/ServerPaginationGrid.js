import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { axiosApiInstance } from '../../routes';
import Box from '@mui/material/Box';
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

export default function ServerPaginationGrid({ apiUrl }) {  
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

      if(res.content) {
        let columns = [];
        for(let key in res.content[0]) {          
          let flex = 0.15;
          if (key == 'description') {
            flex = 0.6;
          } else if (key in ["id", "level"]) {
            flex = 0.05;
          }

          columns.push({
            field: key,
            flex: flex,
            headerClassName:'super-app', 
            headerName: key.toUpperCase(), 
            headerAlign: 'center', 
            editable: true, 
            });
        }

        setData({...data, 'columns': columns, 'rows':res.content, 'totalCount': res.totalElements})
        
        console.log(res.content);
        setLoading(false);
      }
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
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off">       
          <TextField select label='select' value={currency} onChange={handleChange}>
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
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid 
            //checkboxSelection
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
            loading={loading}
          />
        </div>
      </Box>
    </>
  );
}


/**
 * 해당 component 사용시 column 과 각 column 별 너비 비율을 넣어줘야 하며 아래 예제 참조
 * [{
            field: key,
            flex: flex,
            headerClassName:'super-app', 
            headerName: key.toUpperCase(), 
            headerAlign: 'center', 
            editable: true, 
            }] 
 */