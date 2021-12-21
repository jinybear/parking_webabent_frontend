import * as React from 'react';
import CommonTable from '../util/Table/CommonTable';
import { axiosApiInstance } from '../routes';

export default function EdgeStatusPage(props) {
    const columns = ['구역', 'AI Engine'];//, '만공차 카운터', '시스템 정보 서비스'];
    const [rows, setRows] = React.useState([]);    
    const interval = (props.location.interval) ? props.location.interval : 4000;

    const ws = React.useRef(null);
    const [isPause, setIsPause] = React.useState(false);

    function request() {
        axiosApiInstance.get(      
            'http://localhost:8080/systems/edgestatus'
          ).then((res) => {              
            setRows(res.data);
          }, (error) => {
            console.log("failed to edgestatus");
          })
    }

    // mount시 timer 실행(edge 상태 요청), didmount시 timer 해제
    React.useEffect(() => {
        request();
        const timerId = setInterval(request, interval);

        return () => {
            clearInterval(timerId);
        }
    }, [])

    return (
        <>
          <CommonTable columns={columns} rows={rows}/>
        </>
    )
}