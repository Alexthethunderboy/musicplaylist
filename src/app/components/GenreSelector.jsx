import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const genres = ['Pop', 'Rock', 'Jazz', 'Hip Hop', 'Classical', 'Electronic', 'R&B', 'Country', 'Reggae', 'Latin', 'Blues', 'Folk', 'Afrobeats']

export default function GenreSelector({ onGenreSelect }) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Select onValueChange={onGenreSelect}>
        <SelectTrigger className="w-full bg-white/20 text-white border-none">
          <SelectValue placeholder="Select a genre" />
        </SelectTrigger>
        <SelectContent>
          {genres.map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </motion.div>
  )
}

