'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GenreSelector from './components/GenreSelector'
import PlaylistDisplay from './components/PlaylistDisplay'
import RecommendedPlaylists from './components/RecommendedPlaylists'
import { Button } from '@/components/ui/button'
import { Disc3 } from 'lucide-react'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState('')
  const [playlist, setPlaylist] = useState([])
  const [recommendedPlaylists, setRecommendedPlaylists] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const generatePlaylist = async () => {
    if (!selectedGenre) return

    setIsLoading(true)
    setError(null)
    try {
      const playlistResponse = await fetch(`${API_BASE_URL}/api/generate-playlist?genre=${encodeURIComponent(selectedGenre)}`)
      const recommendationsResponse = await fetch(`${API_BASE_URL}/api/recommend-playlists?genre=${encodeURIComponent(selectedGenre)}`)
      
      if (!playlistResponse.ok || !recommendationsResponse.ok) {
        throw new Error('Failed to fetch data')
      }
      
      const playlistData = await playlistResponse.json()
      const recommendationsData = await recommendationsResponse.json()
      
      setPlaylist(playlistData.playlist)
      setRecommendedPlaylists(recommendationsData.recommended_playlists)
    } catch (error) {
      console.error('Error generating playlist:', error)
      setError('Failed to generate playlist. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.main 
      className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 bg-gradient-to-br from-purple-700 to-indigo-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Disc3 className="w-16 h-16 mx-auto mb-4" />
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">Music Playlist Generator</h1>
        <p className="text-lg sm:text-xl text-purple-200">Discover your next favorite playlist</p>
      </motion.div>
      <motion.div 
        className="w-full max-w-4xl space-y-6 bg-white/10 backdrop-blur-lg rounded-xl p-6 sm:p-8 shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <GenreSelector onGenreSelect={setSelectedGenre} />
        <Button 
          onClick={generatePlaylist} 
          disabled={!selectedGenre || isLoading}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? 'Generating...' : 'Generate Playlist'}
        </Button>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-400 text-center"
          >
            {error}
          </motion.p>
        )}
        <PlaylistDisplay playlist={playlist} />
        <RecommendedPlaylists playlists={recommendedPlaylists} />
      </motion.div>
    </motion.main>
  )
}

