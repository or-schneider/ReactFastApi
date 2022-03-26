from enum import Enum
from pydantic import BaseModel

from typing import Any


class WsServerMessageType(str, Enum):
    TEST = "test"
    CONNECT = "connect"


class WsServerMessage(BaseModel):
    type: WsServerMessageType
    data: Any
