import { createContext } from "react";

const WebSocketContext = createContext({
  isConnected: false,
  subscribe: (messageType = "", callback = (data) => {}) => {},
  send: (messageType, data) => {},
});
export default WebSocketContext;
