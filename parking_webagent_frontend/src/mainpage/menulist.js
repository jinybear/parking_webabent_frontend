
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
import { ExpandLess, ExpandMore, HeadsetMicSharp, SystemSecurityUpdate } from '@mui/icons-material';
import { useHistory } from 'react-router';
import { axiosApiInstance } from '../routes';

export default function MainListItems(props) {
  const [liveOpen, setLiveOpen] = React.useState(false);
  const [areaList, setAreaList] = React.useState({});

  const history = useHistory();

  const liveClick = () => {
    setLiveOpen(!liveOpen);
  }

  const setTitle = (title) => {
    props.setTitle(title);
  }

  const handleMenuClick = (title) => {
    setTitle(title);

    if (title === "라이브") {
      setLiveOpen(!liveOpen);
      //history.push("/settingpage");
      try {
        axiosApiInstance.post(
          'http://localhost:8080/live'
        ).then((response) => {
          if (response.data === "") {
            return;
          }

          const res = [...response.data];
          console.log(res);

          const liveMenu = () => {
            let obj = {};

            for (let i = 0; i < res.length; i++) {
              let _areaId = res[i].areaId;
              if (_areaId in obj) {
                obj[_areaId] = [...obj[_areaId], res[i].source_desc];
              } else {
                obj[_areaId] = [res[i].source_desc];
              }
            }
            setAreaList({ ...areaList, ...obj });
            // let aaa = [];
            // for(const key in obj){
            //   aaa.push({"areaId":key, "source_desc":obj[key]})
            // }
          }
          liveMenu();

        })
      } catch (e) {
        console.log(e);
      }
      //React.fetchData();
    } else if (title == "대쉬보드") {
      history.push("/dashboardpage");
    }
  }

  /*const [areaList, setAreaList] = React.useState([
    {
      area_id: areaList.area_id,
      source_id: areaList.source_id,
      source_desc: areaList.source_desc
    }
  ])*/

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
      <ListItem button onClick={() => { handleMenuClick("대쉬보드"); }} >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="대쉬보드" />
      </ListItem>
      <ListItem button onClick={() => { handleMenuClick("라이브"); }}>
        <ListItemIcon >
          <VideocamIcon />
        </ListItemIcon>
        <ListItemText primary="라이브" />
        {liveOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={liveOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            Object.keys(areaList).map((key) => (
              <>
                <ListItemButton sx={{ pl: 10 }} onClick={() => {history.push({
                  pathname:"/parkingLotPage", 
                  state:key
                })
                  }}>
                  <ListItemText primaryTypographyProps={{ fontSize: '0.9rem' }} primary={key} ></ListItemText>
                </ListItemButton>
                <Collapse in={true} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {areaList[key].map((source) => (
                      <ListItemButton sx={{ pl: 12 }} onClick={() => {history.push({
                        pathname:"/dashboardpage",
                        state:source
                      })
                    }}>
                        <ListItemText primaryTypographyProps={{ fontSize: '0.8rem' }} primary={source} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ))
          }
        </List>
      </Collapse>


      <ListItem button onClick={() => { handleMenuClick("통계"); }}>
        <ListItemIcon >
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="통계" />
      </ListItem>

      <ListItem button onClick={() => { handleMenuClick("공지사항"); }}>
        <ListItemIcon >
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
