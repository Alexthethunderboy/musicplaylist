import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const genre = searchParams.get('genre')

  // Here you would typically call your AI service to generate the playlist
  // For now, we'll return a mock playlist
  const mockPlaylist = [
    { title: "Song 1", artist: "Artist 1" },
    { title: "Song 2", artist: "Artist 2" },
    { title: "Song 3", artist: "Artist 3" },
    { title: "Song 4", artist: "Artist 4" },
    { title: "Song 5", artist: "Artist 5" },
  ]

  return NextResponse.json({ playlist: mockPlaylist })
}

