from fastapi import APIRouter, HTTPException
from app.services.playlist_generator import generate_playlist
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

