import Image from 'next/image';
import { motion } from 'framer-motion';

const PlaylistDisplay = ({ playlist }) => {
  if (playlist.length === 0) return null;

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-center">Generated Playlist</h2>
      <ul className="space-y-4">
        {playlist.map((song, index) => (
          <motion.li
            key={index}
            className="bg-white/10 p-4 rounded-lg flex items-center space-x-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="flex-shrink-0 w-16 h-16 relative">
              <Image 
                src={`/api/proxy-image?url=${encodeURIComponent(song.album_art)}`}
                alt={`${song.title} album art`} 
                className="rounded-md" 
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-lg">{song.title}</h3>
              <p className="text-sm text-gray-300">{song.artist}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PlaylistDisplay;

