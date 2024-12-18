import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get('genre');

  if (!genre) {
    return NextResponse.json({ error: 'Genre is required' }, { status: 400 });
  }

  const rapidApiKey = process.env.RAPIDAPI_KEY;
  if (!rapidApiKey) {
    console.error('RAPIDAPI_KEY is not set');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  try {
    const response = await axios.get('https://spotify23.p.rapidapi.com/search/', {
      params: {
        q: genre,
        type: 'playlists',
        offset: '0',
        limit: '1',
        numberOfTopResults: '1'
      },
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    });

    const playlistId = response.data.playlists.items[0].data.uri.split(':').pop();
    const tracksResponse = await axios.get(`https://spotify23.p.rapidapi.com/playlist_tracks/?id=${playlistId}&offset=0&limit=10`, {
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    });

    const playlist = tracksResponse.data.items.map(item => ({
      title: item.track.name,
      artist: item.track.artists[0].name,
      album_art: item.track.album.images[0].url
    }));

    return NextResponse.json({ playlist });
  } catch (error) {
    console.error('Error generating playlist:', error);
    return NextResponse.json({ error: 'Failed to generate playlist' }, { status: 500 });
  }
}

