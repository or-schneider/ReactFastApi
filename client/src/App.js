import initAxios from "./features/Axios/initAxios.js";
import WebSocketContextProvider from "./features/WebSocket/WebSocketContextProvider.jsx";
import PagesRouter from "./pages/PagesRouter.jsx";

function App() {
  function initApp() {
    initAxios();
  }
  initApp();
  return (
    <div>
      App
      <WebSocketContextProvider>
        <PagesRouter></PagesRouter>
      </WebSocketContextProvider>
    </div>
  );
}

export default App;
