import { motion } from 'framer-motion'
import Image from 'next/image'

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

export default function RecommendedPlaylists({ playlists }) {
  if (playlists.length === 0) return null

  return (
    <motion.div
      className="mt-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Recommended Playlists</h2>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist, index) => (
          <motion.a
            key={index}
            href={playlist.spotify_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 rounded-lg overflow-hidden hover:bg-white/20 transition-colors duration-200"
            variants={itemVariants}
          >
<Image src={playlist.image_url} alt={playlist.name} className="w-full h-48 object-cover" width={192} height={192} />
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2">{playlist.name}</h3>
              <p className="text-sm text-purple-200 line-clamp-2">{playlist.description}</p>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  )
}

