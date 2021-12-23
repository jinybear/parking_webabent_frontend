import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { axiosApiInstance } from '../../routes';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateRangePicker from '@mui/lab/DateRangePicker';

function loadServerRows(apiUrl, page, size, isDesc, startDate, endDate) {  
  return new Promise((resolve) => {   
    axiosApiInstance.get(
      apiUrl + '?page=' + page + '&size=' + size + '&asc=' + (isDesc == "ASC")
    ).then((res) => {
      resolve(res.data);      
    }, (error) => {
      console.log("failed to get logs");
    })
  })
}

export default function ServerPaginationGrid({ apiUrl, columns }) {  
  const sizes = [10, 20, 50, 80];  
  const sortType = ['DESC', 'ASC'];

  // 요청 대상 REST API url 및 UI 상에 표시할 page, size, 정렬 옵션 데이터 관리
  const [pageData, setPageData] = React.useState({
    url: apiUrl,
    page: 0,
    size: 20,
    isDesc: 'DESC',      
  });

  const [filteringDate, setFilteringDate] = React.useState([null, null]);

  // 탐색 대상 시간 데이터(start, end) 관리  
  const [disableTimeFilter, setDisableTimeFilter] = React.useState(false);

  // table 의 columns, rows, totalcount 데이터 관리
  const [data, setData] = React.useState({
    columns: [],
    rows: [],    
    totalCount: 0,    
  });

  const [loading, setLoading] = React.useState(false);
  
  React.useEffect(() => {
    let active = true;

    (async () => {
      console.log(pageData);
      setLoading(true);
      const res = await loadServerRows(pageData.url, pageData.page, pageData.size, pageData.isDesc, filteringDate[0], filteringDate[1]);
      
      if (!active) {
        return;
      }      
      
      const inputed_columns = columns.map((column) => {
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
      setData({...data, 'columns': inputed_columns, 'rows': res.content, 'totalCount': res.totalElements});      
    })();

    return () => {
      active = false;
    };
  }, [pageData]);

  const handleChange = (event) => {
    console.log(event.target.name + ":" + event.target.value);
    setPageData({...pageData, 'page':0, [event.target.name]: event.target.value});    
    
  }

  return (
    <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >    
      <Grid container spacing = {1}>
        <Grid item >
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '15ch' },
            }}
            noValidate
            autoComplete="off">       
              <TextField             
                select 
                name="size"
                label='한번에 표시할 수량' 
                value={pageData.size} onChange={handleChange}
                // variant="filled"
                size='small'
              >
              {sizes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
          </Box>    
        </Grid>
        <Grid item >
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '15ch' },
            }}
            noValidate
            autoComplete="off">       
              <TextField             
                select 
                name="isDesc"
                label='정렬' 
                value={pageData.isDesc} onChange={handleChange}
                // variant="filled"
                size='small'
              >
              {sortType.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
              </TextField>
          </Box>    
        </Grid>
        {disableTimeFilter && <DatetimePicker filteringDate={setFilteringDate}/> }
        
      </Grid>     
      <Box sx={{
            '& .super-app': {
              backgroundColor: '#4b89dc',
              color: 'white',
            },
          }}>
        <div style={{ width: '100%', minHeight:350 }}>
          <DataGrid 
            //checkboxSelection
            autoHeight
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
            loading={loading}
          />
        </div>
      </Box>
    </Paper>
  );
}


/**
 * 시간 필터링 할수 있도록 입력 UI 제공하는 component
 * @param {*} props 
 * @returns 
 */
const DatetimePicker = (props) => {
  const [filteringDate, setFilteringDate] = React.useState([null, null]);
  const callbackFunc = props.filteringDate;

  return (
    <>
      <Grid
        sx={{ ml: 12, mt: 3, width: 'auto', }}>
        <Box>
          탐색 대상 시간:
        </Box>
      </Grid>
      <Grid 
        sx={{ ml: 2, mt: 2, width: '35ch', }}>          
        <Box
            component="form"
            sx={{
              // '& .MuiTextField-root': { ml: 1, mt : 2, width: '12ch' },
            }}
            noValidate
            autoComplete="off">  
        <LocalizationProvider dateAdapter={AdapterDateFns}>                      
          <DateRangePicker
          startText="Start"
          endText="End"            
          value={filteringDate}
          onChange={(newValue) => {
            setFilteringDate(newValue);
            callbackFunc(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>                
              <TextField size='small' ref={startProps} {...startProps} />
              <Box sx={{ mx: 1 }}> to </Box>
              <TextField size='small' ref={endProps} {...endProps} />
            </React.Fragment>
          )}
        />
        </LocalizationProvider>
        </Box>
      </Grid>
    </>
  )
}