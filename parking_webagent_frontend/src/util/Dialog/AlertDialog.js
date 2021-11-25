import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';

export default function AlertDialog(props) {  
  const handleClose = () => {
    props.getOpened(false);
  };  

  return (
    <div>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert onClose={handleClose} severity="error">Error</Alert>
        <DialogTitle id="alert-dialog-title">
          {props.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>          
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


/*
사용법 example

1. state 와 함수 정의
const [fail, setFail] = React.useState(false);
const getOpened = (e) => {
    setFail(e);
}

2. render 과정에서 본 component 호출시 fail state를 조건으로 부여
{ fail ? <AlertDialog level="error" title="hey" message="Login 실패 - 입력정보를 확인하세요." getOpened={getOpened} />: null }

*/