import * as React from "react";
import { axiosApiInstance } from "../routes";
import mqtt from "mqtt";

export default function CameraLivePage(props) {
  const ws = React.useRef(null);
  const sourceId = props.location.state;
  console.log("카메라 아이디 누구세용 ? " + sourceId);
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const connectOption = {
      clean: true,
      connectTimeOut: 4000,
      reconnectPeriod: 4000,
      clientId: "",
      username: "",
      password: "",
    };

    ws.current = mqtt.connect("ws://223.171.87.12:11991", connectOption);

    ws.current.subscribe("/decision/#");
    ws.current.on("connect", () => {
      console.log("mqtt 연결됐당");
    });
    ws.current.on("message", (topic, msg) => {
      console.log(msg.toString("utf8"));

      var _payloadSplit = msg.toString().split(",");
      var _payload = _payloadSplit.slice(0, _payloadSplit.length - 1);
      console.log(_payload);

      for (let i = 0; i < _payload.length; i++) {
        const _payloadArray = _payload[i].split("/");
        console.log(_payloadArray);

        if (sourceId == _payloadArray[0]) {
          var _id = _payloadArray[1];
          console.log(_id + " 구역");
          var _val = _payloadArray[2].split(":")[1];
          console.log(_val + " 칸 생략 만공차");
        }
      }
    });

    return () => {
      if (ws.current.connected) {
        ws.current.unsubscribe("/decision/#");
        ws.current.end();
      }
    };
  }, [sourceId]);

  return <></>;
}
