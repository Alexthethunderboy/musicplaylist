from fastapi import APIRouter
from fastapi.responses import JSONResponse
from ..core.config import get_allowed_image_domains
from ..services.playlist_generator import generate_playlist, recommend_playlists

router = APIRouter()

@router.get("/status", response_model=dict)
async def status():
    """
    Returns the status of the service
    """
    return {"status": "running"}

@router.get("/allowed-image-domains", response_model=dict)
async def allowed_image_domains():
    """
    Returns the list of allowed image domains
    """
    allowed_domains = get_allowed_image_domains()
    return JSONResponse(content={"allowed_domains": allowed_domains})

@router.get("/generate-playlist")
async def get_playlist(genre: str):
    try:
        playlist = generate_playlist(genre)
        return {"playlist": playlist}
    except ValueError as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

@router.get("/recommend-playlists")
async def get_recommended_playlists(genre: str):
    try:
        recommended_playlists = recommend_playlists(genre)
        return {"recommended_playlists": recommended_playlists}
    except ValueError as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)

