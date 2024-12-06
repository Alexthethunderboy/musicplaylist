import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Music } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export default function PlaylistDisplay({ playlist }) {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)

  const togglePlay = (previewUrl, index) => {
    if (currentlyPlaying === index) {
      setCurrentlyPlaying(null)
    } else {
      setCurrentlyPlaying(index)
    }
  }

  if (playlist.length === 0) return null

  return (
    <motion.div
      className="mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Generated Playlist</h2>
      <motion.ul className="space-y-4">
        {playlist.map((song, index) => (
          <motion.li
            key={index}
            className="bg-white/10 p-4 rounded-lg backdrop-blur-sm flex items-center space-x-4 hover:bg-white/20 transition-colors duration-200"
            variants={itemVariants}
          >
            <div className="flex-shrink-0">
              {song.preview_url ? (
                <button
                  onClick={() => togglePlay(song.preview_url, index)}
                  className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center hover:bg-purple-600 transition-colors duration-200"
                >
                  {currentlyPlaying === index ? (
                    <Pause className="w-5 h-5 text-white" />
                  ) : (
                    <Play className="w-5 h-5 text-white" />
                  )}
                </button>
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="font-medium text-lg">{song.title}</h3>
              <p className="text-sm text-purple-200">{song.artist}</p>
            </div>
            {currentlyPlaying === index && (
              <audio
                src={song.preview_url}
                autoPlay
                onEnded={() => setCurrentlyPlaying(null)}
              />
            )}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

