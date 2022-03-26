import { useCallback, useEffect, useRef, useState } from "react";
import { wsMessageClientType, wsMessageServerType } from "./wsMessageType.js";

function useWebSocket() {
  const [id, setId] = useState(null);
  const [isConnected, setConnected] = useState(null);

  const wsRef = useRef(null);
  const messageListenersRef = useRef({});

  const subscribe = useCallback(function subscribeCB(
    messageType = "",
    callback = (data) => {}
  ) {
    if (!messageListenersRef.current[messageType]) {
      messageListenersRef.current[messageType] = [];
    }
    messageListenersRef.current[messageType].push(callback);

    const unsubscribe = () => {
      const messageTypeListeners = messageListenersRef.current[messageType];
      const callbackIndex = messageTypeListeners.indexOf(callback);
      messageTypeListeners.splice(callbackIndex, 1);
    };
    return unsubscribe;
  },
  []);
  const send = useCallback(function sendCB(type = "", data = {}) {
    wsRef.current.send(JSON.stringify({ type, data }));
  }, []);

  useEffect(() => {
    subscribe(wsMessageServerType.test, (data) => {
      console.log("test data:", data);
    });
    const connectUnsubscribe = subscribe(
      wsMessageServerType.connect,
      (data) => {
        setId(data.id);
      }
    );

    const ws = new WebSocket(process.env.REACT_APP_WS_API_BASE_URL);
    wsRef.current = ws;
    ws.onclose = (event) => {
      setConnected(false);
    };
    ws.onerror = (event) => {
      setConnected(false);
    };

    ws.onopen = (event) => {
      setConnected(true);
      send(wsMessageClientType.test, "This is a test message");
    };
    ws.onmessage = onMessage;
    function onMessage(message) {
      const response = JSON.parse(message.data);

      const messageTypeListeners = messageListenersRef.current[response.type];
      if (messageTypeListeners)
        for (const listener of messageTypeListeners) {
          listener(response.data);
        }
    }
    return () => {
      connectUnsubscribe();
      ws.close();
    };
  }, [subscribe, send]);

  return { subscribe, send, isConnected };
}

export default useWebSocket;
