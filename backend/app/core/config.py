import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    PROJECT_NAME: str = "Music Playlist Generator"
    PROJECT_VERSION: str = "1.0.0"
    RAPIDAPI_KEY: str = os.getenv("RAPIDAPI_KEY")
    FRONTEND_URL: str = os.getenv("FRONTEND_URL", "http://localhost:3000")

settings = Settings()

