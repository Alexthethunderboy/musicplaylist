'use client'

import { useState } from 'react'
import GenreSelector from './components/GenreSelector'
import PlaylistDisplay from './components/PlaylistDisplay'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState('')
  const [playlist, setPlaylist] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const generatePlaylist = async () => {
    if (!selectedGenre) return

    setIsLoading(true)
    try {
      // Replace this URL with your actual API endpoint
      const response = await fetch(`/api/generate-playlist?genre=${selectedGenre}`)
      const data = await response.json()
      setPlaylist(data.playlist)
    } catch (error) {
      console.error('Error generating playlist:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Music Playlist Generator</h1>
      <div className="w-full max-w-md space-y-4">
        <GenreSelector onGenreSelect={setSelectedGenre} />
        <Button 
          onClick={generatePlaylist} 
          disabled={!selectedGenre || isLoading}
          className="w-full"
        >
          {isLoading ? 'Generating...' : 'Generate Playlist'}
        </Button>
        <PlaylistDisplay playlist={playlist} />
      </div>
    </main>
  )
}

