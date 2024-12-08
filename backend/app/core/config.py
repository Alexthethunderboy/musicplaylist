import os
from dotenv import load_dotenv
import logging

# Load .env file explicitly
dotenv_path = os.path.join(os.path.dirname(__file__), "../../.env")
load_dotenv(dotenv_path=dotenv_path)

logger = logging.getLogger(__name__)

class Settings:
    PROJECT_NAME: str = "Music Playlist Generator"
    PROJECT_VERSION: str = "1.0.0"
    RAPIDAPI_KEY: str = os.getenv("RAPIDAPI_KEY", "")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

settings = Settings()

def get_allowed_image_domains():
    allowed_domains = os.getenv('ALLOWED_IMAGE_DOMAINS', '').split(',')
    allowed_domains = [domain.strip() for domain in allowed_domains if domain.strip()]
    if not allowed_domains:
        allowed_domains = [
            'i.scdn.co',
            'seed-mix-image.spotifycdn.com',
            'mosaic.scdn.co',
            'image-cdn-ak.spotifycdn.com',
            'wrapped-images.spotifycdn.com'
        ]
    return allowed_domains

