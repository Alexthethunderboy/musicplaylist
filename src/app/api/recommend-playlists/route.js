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
        limit: '5',
        numberOfTopResults: '5'
      },
      headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    });

    const recommendedPlaylists = response.data.playlists.items.map(playlist => ({
      name: playlist.data.name,
      description: playlist.data.description,
      image_url: playlist.data.images.items[0].sources[0].url,
      spotify_url: `https://open.spotify.com/playlist/${playlist.data.uri.split(':').pop()}`
    }));

    return NextResponse.json({ recommended_playlists: recommendedPlaylists });
  } catch (error) {
    console.error('Error recommending playlists:', error);
    return NextResponse.json({ error: 'Failed to recommend playlists' }, { status: 500 });
  }
}

