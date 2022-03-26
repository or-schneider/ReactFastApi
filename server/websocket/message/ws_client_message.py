from enum import Enum
from pydantic import BaseModel
from typing import Any


class WsClientMessageType(str, Enum):
    TEST = "test"


class WsClientMessage(BaseModel):
    type: WsClientMessageType
    data: Any
