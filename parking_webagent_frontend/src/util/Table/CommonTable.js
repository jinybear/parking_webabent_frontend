import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export default function CommonTable(props) {
    const [columns, setColumns] = React.useState(props.columns);
    const [rows, setRows] = React.useState(props.rows);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: '#4b89dc',
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
      // hide last border
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }));
    
    React.useEffect(() => {
      setRows(props.rows);

    }, [props.rows])

    return (
      <TableContainer component={Paper} >
          <Table sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead >
            <TableRow>
              {columns.map((column) => (
                  <StyledTableCell key={column.name} align="right">{column.name}</StyledTableCell>    
              ))}                
            </TableRow>
          </TableHead>
          <TableBody>
          {rows.map((row) => (
            <StyledTableRow 
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >       
              {Object.keys(row).map((key) => (
                <StyledTableCell key={row[key]} align="right">{row[key]}</StyledTableCell>  
              ))}                
            </StyledTableRow>
          ))}
          </TableBody>
          </Table>
      </TableContainer>
  )
}