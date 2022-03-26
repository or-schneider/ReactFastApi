from fastapi import WebSocket

from websocket.message.ws_server_message import WsServerMessage


class WsMessenger():
    def __init__(self) -> None:
        self.sockets: set[WebSocket] = set()

    def add(self, socket):
        self.sockets.add(socket)

    def remove(self, socket):
        self.sockets.remove(socket)

    async def send(self, ws_message: WsServerMessage, websocket: WebSocket):
        try:
            await websocket.send_json(ws_message.dict())
        except BaseException as error:
            print(error)
            self.remove(websocket)

    async def broadcast(self, ws_message: WsServerMessage):
        dead_sockets = []
        for socket in self.sockets:
            try:
                # TODO asyncio.gather would probably make more sense here
                await socket.send_json(ws_message.dict())
            except BaseException as error:
                print(error)
                dead_sockets.append(socket)
        for dead_socket in dead_sockets:
            self.remove(dead_socket)


ws_messenger = WsMessenger()
