import * as React from "react";
import { Typography } from "@material-ui/core";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import CommentIcon from "@mui/icons-material/Comment";
import SettingsIcon from "@mui/icons-material/Settings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import VideocamIcon from "@mui/icons-material/Videocam";
import { ExpandLess, ExpandMore, HeadsetMicSharp } from "@mui/icons-material";
import { useHistory } from "react-router";

export default function MainListItems(props) {
  const [liveOpen, setLiveOpen] = React.useState(true);
  const [settingOpen, setSettingOpen] = React.useState(true);

  const history = useHistory();

  const liveClick = () => {
    setLiveOpen(!liveOpen);
  };

  const setTitle = (title) => {
    props.setTitle(title);
  };

  const handleMenuClick = (title) => {
    setTitle(title);

    if (title === "라이브") {
      setLiveOpen(!liveOpen);
    } else if (title === "대쉬보드") {
      history.push("/dashboardpage");
    } else if (title === "설정") {
      setSettingOpen(!settingOpen);
    }
  };

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
      <ListItem
        button
        onClick={() => {
          handleMenuClick("대쉬보드");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary='대쉬보드' />
      </ListItem>
      <ListItem
        button
        onClick={() => {
          handleMenuClick("라이브");
        }}
      >
        <ListItemIcon>
          <VideocamIcon />
        </ListItemIcon>
        <ListItemText primary='라이브' />
        {liveOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={liveOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primaryTypographyProps={{ fontSize: "0.9rem" }} primary='A주차장' />
          </ListItemButton>
          <Collapse in={true} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 8 }}>
                <ListItemText primaryTypographyProps={{ fontSize: "0.8rem" }} primary='A주차장-1번 camera' />
              </ListItemButton>
              <ListItemButton sx={{ pl: 8 }}>
                <ListItemText primaryTypographyProps={{ fontSize: "0.8rem" }} primary='A주차장-2번 camera' />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemText primaryTypographyProps={{ fontSize: "0.9rem" }} primary='B주차장' />
          </ListItemButton>
          <Collapse in={true} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 8 }}>
                <ListItemText primaryTypographyProps={{ fontSize: "0.8rem" }} primary='B주차장-1번 camera' />
              </ListItemButton>
              <ListItemButton sx={{ pl: 8 }}>
                <ListItemText primaryTypographyProps={{ fontSize: "0.8rem" }} primary='B주차장-2번 camera' />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Collapse>

      <ListItem
        button
        onClick={() => {
          handleMenuClick("통계");
        }}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary='통계' />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          handleMenuClick("공지사항");
        }}
      >
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary='공지사항' />
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
                <ListItemText primaryTypographyProps={{ fontSize: "0.8rem" }} primary='관리자 계정 관리' onClick={() => history.push("/accountlist")} />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
      </Collapse>
    </List>
  );
}
