import { NextResponse } from 'next/server';
import axios from 'axios'; // Use axios for making API requests
import { RAPIDAPI_KEY } from '@/lib/config'; // Make sure to set this up in your environment variables

const SPOTIFY_API_HOST = "spotify23.p.rapidapi.com";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");

  if (!genre) {
    return NextResponse.json({ error: "Genre is required" }, { status: 400 });
  }

  console.log("RAPIDAPI_KEY:", RAPIDAPI_KEY); // Log the RAPIDAPI_KEY

  try {
    // Search for a playlist
    const searchUrl = `https://${SPOTIFY_API_HOST}/search/`;
    const searchResponse = await axios.get(searchUrl, {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": SPOTIFY_API_HOST,
      },
      params: {
        q: genre,
        type: "playlists",
        offset: "0",
        limit: "1",
        numberOfTopResults: "1",
      },
    });

    const playlistId = searchResponse.data.playlists.items[0].data.uri.split(':').pop();

    // Get tracks from the playlist
    const tracksUrl = `https://${SPOTIFY_API_HOST}/playlist_tracks/`;
    const tracksResponse = await axios.get(tracksUrl, {
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": SPOTIFY_API_HOST,
      },
      params: {
        id: playlistId,
        offset: "0",
        limit: "10",
      },
    });

    const playlist = tracksResponse.data.items.map(track => ({
      title: track.track.name,
      artist: track.track.artists[0].name,
      preview_url: track.track.preview_url,
      album_art: track.track.album.images[0]?.url || null,
    }));

    return NextResponse.json({ playlist });
  } catch (error) {
    console.error("Error generating playlist:", error);
    return NextResponse.json({ error: "Failed to generate playlist" }, { status: 500 });
  }
}
