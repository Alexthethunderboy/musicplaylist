import requests
import os
from dotenv import load_dotenv
import logging

load_dotenv()

logger = logging.getLogger(__name__)

RAPIDAPI_KEY = os.getenv('RAPIDAPI_KEY')
SPOTIFY_API_HOST = "spotify23.p.rapidapi.com"

def generate_playlist(genre: str) -> list:
    logger.info(f"Generating playlist for genre: {genre}")
    
    # Search for a playlist
    search_url = "https://spotify23.p.rapidapi.com/search/"
    search_querystring = {"q": genre, "type": "playlists", "offset": "0", "limit": "1", "numberOfTopResults": "1"}
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": SPOTIFY_API_HOST
    }
    
    try:
        search_response = requests.get(search_url, headers=headers, params=search_querystring)
        search_response.raise_for_status()
        search_data = search_response.json()
        
        playlist_id = search_data['playlists']['items'][0]['data']['uri'].split(':')[-1]
        
        # Get tracks from the playlist
        tracks_url = f"https://spotify23.p.rapidapi.com/playlist_tracks/?id={playlist_id}&offset=0&limit=5"
        tracks_response = requests.get(tracks_url, headers=headers)
        tracks_response.raise_for_status()
        tracks_data = tracks_response.json()
        
        playlist = [
            {
                "title": track['track']['name'],
                "artist": track['track']['artists'][0]['name']
            }
            for track in tracks_data['items']
        ]
        
        logger.info(f"Successfully generated playlist: {playlist}")
        return playlist
    
    except requests.exceptions.RequestException as e:
        logger.error(f"API request failed: {str(e)}")
        raise ValueError(f"Failed to generate playlist: {str(e)}")
    except (KeyError, IndexError) as e:
        logger.error(f"Error parsing API response: {str(e)}")
        raise ValueError(f"Error parsing playlist data: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}")
        raise ValueError(f"Unexpected error generating playlist: {str(e)}")
