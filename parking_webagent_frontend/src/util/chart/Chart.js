import * as React from 'react';
import { useTheme } from '@mui/material/styles';
//import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Title from '../../mainpage/Title';
import { Button } from '@mui/material';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

const data = [
    {
      name: 'A주차장',
      주차율: 75.5,
      공차율: 24.5     
    },
    {
        name: 'B주차장',
        주차율: 44.8,
        공차율: 55.2
    },
    {
        name: 'C주차장',
        주차율: 62.0,
        공차율: 38.0,
    },
    {
        name: 'D주차장',
        주차율: 93.8,
        공차율: 6.2,
    },
  ];

export default function Chart() {
  const [datas, setDatas] = React.useState(data);

  const theme = useTheme();

  const handleEnque = () => {
    let copied = data.filter(x => x);
    for(let i=0; i<copied.length; i++){
        copied[i].주차율 = Math.floor(Math.random() * 100);
        copied[i].공차율 = 100 - data[i].주차율;
    }
    
    setDatas([
        ...copied
    ]);    
  }


  return (
    <React.Fragment>
        <Button variant="contained" onClick={handleEnque}>inc</Button>        

      <Title>Today</Title>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
            width={500}
            height={300}
            data={datas}
            margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="주차율" fill="#8884d8" />
          <Bar dataKey="공차율" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}