from fastapi import APIRouter, HTTPException
from app.services.playlist_generator import generate_playlist, recommend_playlists
import logging

router = APIRouter()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@router.get("/generate-playlist")
async def get_playlist(genre: str):
    if not genre:
        raise HTTPException(status_code=400, detail="Genre is required")
    
    try:
        logger.info(f"Generating playlist for genre: {genre}")
        playlist = generate_playlist(genre)
        
        if not playlist:
            logger.error("Failed to generate playlist: empty result")
            raise HTTPException(status_code=500, detail="Failed to generate playlist: empty result")
        
        return {"playlist": playlist}
    except ValueError as e:
        logger.error(f"Error in playlist generation: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error in playlist generation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")

@router.get("/recommend-playlists")
async def get_recommended_playlists(genre: str):
    if not genre:
        raise HTTPException(status_code=400, detail="Genre is required")
    
    try:
        logger.info(f"Recommending playlists for genre: {genre}")
        recommended_playlists = recommend_playlists(genre)
        
        if not recommended_playlists:
            logger.error("Failed to recommend playlists: empty result")
            raise HTTPException(status_code=500, detail="Failed to recommend playlists: empty result")
        
        return {"recommended_playlists": recommended_playlists}
    except ValueError as e:
        logger.error(f"Error in playlist recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        logger.error(f"Unexpected error in playlist recommendations: {str(e)}")
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {str(e)}")


