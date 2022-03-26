from uuid import uuid4
from fastapi import APIRouter, WebSocket
from websocket.message.ws_client_message import WsClientMessage

from websocket.message.ws_server_message import WsServerMessage, WsServerMessageType
from .ws_messenger import ws_messenger


# APIRouter prefix arg doesn't work for websocket routes
# See https://github.com/tiangolo/fastapi/pull/2640
ws_router = APIRouter()


@ws_router.websocket("/api/v1/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    ws_messenger.add(websocket)
    id = uuid4()
    connect_message = WsServerMessage(
        type=WsServerMessageType.CONNECT, data={'id': str(id)})
    await ws_messenger.send(connect_message, websocket)

    while True:
        try:
            request = await websocket.receive_json()
            client_message = WsClientMessage(**request)
            print(client_message)
        except BaseException as error:
            print(error)
            ws_messenger.remove(websocket)
            break
    print("Disconnected")
