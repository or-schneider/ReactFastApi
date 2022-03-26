import useWebSocket from "./useWebSocket.js";
import WebSocketContext from "./WebSocketContext.js";
function WebSocketContextProvider({ children }) {
  const webSocket = useWebSocket();
  return (
    <WebSocketContext.Provider value={webSocket}>
      {children}
    </WebSocketContext.Provider>
  );
}

export default WebSocketContextProvider;
