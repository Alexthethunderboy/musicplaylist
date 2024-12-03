import { NextResponse } from "next/server";

// Mock function to generate a playlist
function generateMockPlaylist(genre) {
  const playlists = {
    Pop: [
      { title: "Shape of You", artist: "Ed Sheeran" },
      { title: "Blinding Lights", artist: "The Weeknd" },
      { title: "Dance Monkey", artist: "Tones and I" },
      { title: "Shake It Off", artist: "Taylor Swift" },
      { title: "Bad Guy", artist: "Billie Eilish" },
    ],
    Rock: [
      { title: "Stairway to Heaven", artist: "Led Zeppelin" },
      { title: "Bohemian Rhapsody", artist: "Queen" },
      { title: "Smells Like Teen Spirit", artist: "Nirvana" },
      { title: "Sweet Child O' Mine", artist: "Guns N' Roses" },
      { title: "Back in Black", artist: "AC/DC" },
    ],
    Jazz: [
      { title: "Take Five", artist: "Dave Brubeck" },
      { title: "So What", artist: "Miles Davis" },
      { title: "Giant Steps", artist: "John Coltrane" },
      { title: "Sing, Sing, Sing", artist: "Benny Goodman" },
      { title: "What a Wonderful World", artist: "Louis Armstrong" },
    ],
    "Hip Hop": [
      { title: "Sicko Mode", artist: "Travis Scott" },
      { title: "God's Plan", artist: "Drake" },
      { title: "Old Town Road", artist: "Lil Nas X" },
      { title: "Lose Yourself", artist: "Eminem" },
      { title: "HUMBLE.", artist: "Kendrick Lamar" },
    ],
    Classical: [
      { title: "Fur Elise", artist: "Beethoven" },
      { title: "Canon in D", artist: "Pachelbel" },
      { title: "The Four Seasons", artist: "Vivaldi" },
      { title: "Clair de Lune", artist: "Debussy" },
      { title: "The Magic Flute", artist: "Mozart" },
    ],
    Electronic: [
      { title: "Strobe", artist: "Deadmau5" },
      { title: "Levels", artist: "Avicii" },
      { title: "Titanium", artist: "David Guetta" },
      { title: "Scary Monsters and Nice Sprites", artist: "Skrillex" },
      { title: "Closer", artist: "The Chainsmokers" },
    ],
    "R&B": [
      { title: "Blame It", artist: "Jamie Foxx" },
      { title: "Love on Top", artist: "Beyoncé" },
      { title: "Adorn", artist: "Miguel" },
      { title: "Confessions Part II", artist: "Usher" },
      { title: "No Guidance", artist: "Chris Brown" },
    ],
    Country: [
      { title: "Take Me Home, Country Roads", artist: "John Denver" },
      { title: "Jolene", artist: "Dolly Parton" },
      { title: "Tennessee Whiskey", artist: "Chris Stapleton" },
      { title: "Friends in Low Places", artist: "Garth Brooks" },
      { title: "The Gambler", artist: "Kenny Rogers" },
    ],
    Afrobeats: [
      { title: "Ye", artist: "Burna Boy" },
      { title: "Dumebi", artist: "Rema" },
      { title: "Essence", artist: "Wizkid ft. Tems" },
      { title: "On the Low", artist: "Burna Boy" },
      { title: "Joro", artist: "Wizkid" },
    ],
  };

  return playlists[genre] || [];
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");

  if (!genre) {
    return NextResponse.json({ error: "Genre is required" }, { status: 400 });
  }

  const playlist = generateMockPlaylist(genre);

  if (playlist.length === 0) {
    return NextResponse.json(
      { error: "No playlist found for the given genre" },
      { status: 404 }
    );
  }

  return NextResponse.json({ playlist });
}
