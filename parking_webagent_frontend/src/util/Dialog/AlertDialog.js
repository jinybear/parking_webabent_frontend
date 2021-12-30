import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

export default function AlertDialog(props) {  
  const handleClose = (isYes) => {
    // 알람 닫기 통보
    props.open(false);

    if(isYes){
      props.doYes();
    }  
  };  

  return (
    <div>
      <Dialog
        open="true"
        onClose={() => handleClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert onClose={() => handleClose(false)} severity={props.level}>{props.title}</Alert>
        {/* <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle> */}
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          <Button onClick={() => handleClose(true)} autoFocus>
            Yes
          </Button>
          <Button onClick={() => handleClose(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


/*
사용법 example

1. 부모 component 에서 state 와 함수 정의
const [open, setOpen] = React.useState(false);
const doYes = () => {
  // Yes 버튼 클릭시 실행할 코드
}

2. AlertDialog component 호출 방법
{ open ? <AlertDialog level="error" title="hey" message="Login 실패 - 입력정보를 확인하세요." open={setOpen} doYes={doYes}/>: null }
*/