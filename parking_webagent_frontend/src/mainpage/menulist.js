
import * as React from 'react';
import { Typography } from '@material-ui/core';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import CommentIcon from '@mui/icons-material/Comment';
import SettingsIcon from '@mui/icons-material/Settings';
import AssignmentIcon from '@mui/icons-material/Assignment';
import VideocamIcon from '@mui/icons-material/Videocam';
import { ExpandLess, ExpandMore, HeadsetMicSharp } from '@mui/icons-material';
import { useHistory } from 'react-router';

export default function MainListItems(props) {  
  const [liveOpen, setLiveOpen] = React.useState(true);
  const [settingOpen, setSettingOpen] = React.useState(true);

  const superadminChk = () => {
    if (props.userinfo.roleContext === "ROLE_SUPERADMIN") {
      return true;
    } else {
      return false;
    }
  };
  
  const history = useHistory();

  const liveClick = () => {
    setLiveOpen(!liveOpen);
  }

  const setTitle = (title) => {
    props.setTitle(title);
  }

  const handleMenuClick = (title) => {
    setTitle(title);

    if (title === "라이브"){
      setLiveOpen(!liveOpen);
      history.push("/settingpage");
    } else if(title == "대쉬보드") {
      history.push("/dashboardpage");  
    } else if(title == "설정") {
      setSettingOpen(!settingOpen);
    } 

  }
  
  return (
    <List>
      <ListItem button onClick={() => {handleMenuClick("대쉬보드");}} >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="대쉬보드" />
      </ListItem>
      <ListItem button onClick={() => {handleMenuClick("라이브");}}>
        <ListItemIcon >
          <VideocamIcon />
        </ListItemIcon>
        <ListItemText primary="라이브" />
        {liveOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={liveOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4}}>
            <ListItemText primaryTypographyProps={{fontSize: '0.9rem'}} primary="A주차장" />            
          </ListItemButton>
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 8}}>
                <ListItemText primaryTypographyProps={{fontSize: '0.8rem'}} primary="A주차장-1번 camera" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 8}}>
                <ListItemText primaryTypographyProps={{fontSize: '0.8rem'}} primary="A주차장-2번 camera" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton sx={{ pl: 4}}>
            <ListItemText primaryTypographyProps={{fontSize: '0.9rem'}} primary="B주차장" />            
          </ListItemButton>
          <Collapse in={true} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 8}}>
                <ListItemText primaryTypographyProps={{fontSize: '0.8rem'}} primary="B주차장-1번 camera" />
              </ListItemButton>
              <ListItemButton sx={{ pl: 8}}>
                <ListItemText primaryTypographyProps={{fontSize: '0.8rem'}} primary="B주차장-2번 camera" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Collapse>
      

      <ListItem button onClick={() => {handleMenuClick("통계");}}>
        <ListItemIcon >
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="통계" />
      </ListItem>
      
      <ListItem button onClick={() => {handleMenuClick("공지사항");}}>
        <ListItemIcon >
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary="공지사항" />
      </ListItem>

      <ListSubheader inset>관리자 메뉴</ListSubheader>
      <ListItem
        button
        onClick={() => {
          handleMenuClick("설정");
        }}
      >
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='설정' />
        {settingOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={settingOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primaryTypographyProps={{ fontSize: "0.9rem" }} primary='일반설정' />
          </ListItemButton>
          <Collapse in={true} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 8 }}>
                {superadminChk() && <ListItemText primaryTypographyProps={{ fontSize: "0.8rem" }} primary='로그' onClick={() => history.push("/logpage")} />}
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Collapse>
    </List>
  );
}
  
