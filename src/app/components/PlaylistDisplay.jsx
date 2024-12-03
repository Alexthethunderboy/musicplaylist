import { motion } from 'framer-motion'
import { Music } from 'lucide-react'

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
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
}

export default function PlaylistDisplay({ playlist }) {
  return (
    <motion.div
      className="mt-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Generated Playlist</h2>
      <motion.ul className="space-y-3">
        {playlist.map((song, index) => (
          <motion.li
            key={index}
            className="bg-white/20 p-4 rounded-lg backdrop-blur-sm flex items-center space-x-4"
            variants={itemVariants}
          >
            <Music className="w-6 h-6 text-purple-300" />
            <div>
              <h3 className="font-medium">{song.title}</h3>
              <p className="text-sm text-purple-200">{song.artist}</p>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  )
}

