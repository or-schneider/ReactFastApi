from fastapi import APIRouter


api_router = APIRouter(prefix="/api/v1")


@api_router.get("/")
async def root():
    return{"api": "v2"}
