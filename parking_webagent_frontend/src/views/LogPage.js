import * as React from 'react';
import ServerPaginationGrid from '../util/Table/ServerPaginationGrid';

export default function LogPage() {
    console.log("call logpage");
    const param = {
        "apiUrl": 'http://localhost:8080/systems/log', 
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
        <>
          <ServerPaginationGrid {...param} />
        </>
    );
}