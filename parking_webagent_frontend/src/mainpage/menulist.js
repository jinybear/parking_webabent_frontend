
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

export default function MainListItems() {  
  const [liveOpen, setLiveOpen] = React.useState(true);

  const liveClick = () => {
    setLiveOpen(!liveOpen);
  }

  
  // const renderParking = () => {
  //   const arr = [{ name: "A주차장", child: ["1번camera", "2번camera", "3번camera"]},
  //             { name: "B주차장", child: ["4번camera", "5번camera", "3번camera"]}
  //           ];

  //   const result = [];
  //   result.push(<Collapse in={liveOpen} timeout="auto" unmountOnExit>);
  //   result.push(<List component="div" disablePadding>);
  
  //   {arr.map((data, index) => (
  //     <List component="div" disablePadding>
  //       <ListItemButton sx={{ pl: 4}}>
  //         <ListItemText primary={data["name"]} />
  //       </ListItemButton >
  //     </List>
  //   ))}
    
  //   result.push(</List></Collapse>);
    
  //   result.push(<Collapse in={true} timeout="auto" unmountOnExit>);
  //   result.push(<List component="div" disablePadding>);

  //   {arr.map((data, index) => (
  //     <List component="div" disablePadding>
  //       <ListItemButton sx={{ pl: 8}}>
  //         <ListItemText primary={data["name"]} />
  //       </ListItemButton >
  //     </List>
  //   ))}

  //   result.push(</List></Collapse>);

  //   return result;
  // };

  
  return (
    <List>
      <ListItem button >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="대쉬보드" />
      </ListItem>
      <ListItem button >
        <ListItemIcon>
          <VideocamIcon />
        </ListItemIcon>
        <ListItemText primary="라이브" onClick={liveClick} />
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
      

      <ListItem button >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="통계" />
      </ListItem>
      

      <ListItem button>
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary="공지사항" />
      </ListItem>
    </List>
  );
}

  
export const secondaryListItems = (
<div>
    <ListSubheader inset>관리자 메뉴</ListSubheader>
    <ListItem button >
        <ListItemIcon>          
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="설정" />
      </ListItem>
</div>
);