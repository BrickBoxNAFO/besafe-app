/**
 * Song data for Growing Minds courses.
 *
 * Structure:
 *   Key = courseId (e.g. "c26")
 *   Value = object with:
 *     lessons: array of song objects matching lesson index
 *       { title, file, lyrics }
 *     remember: song object for the "Remember This" recap song
 *       { title, file, lyrics }
 *
 * Audio files are served from Supabase Storage:
 *   https://iixjfonhzcipinnznsot.supabase.co/storage/v1/object/public/audio/{path}
 *
 * Lyrics format:
 *   Use [Verse 1], [Chorus], [Bridge] etc. on their own lines
 *   to create section headings. Regular lines are lyrics.
 *
 * To add a song:
 *   1. Upload the MP3 to Supabase Storage under audio/early-years/ or audio/junior/
 *   2. Set the "file" value to the path after "audio/" (e.g. "early-years/road-safety/lesson-1.mp3")
 *   3. Paste the lyrics into the "lyrics" string
 */

const SUPABASE_AUDIO_BASE = 'https://iixjfonhzcipinnznsot.supabase.co/storage/v1/object/public/audio'

export function getAudioUrl(filePath) {
  if (!filePath) return null
  if (filePath.startsWith('http')) return filePath
  return SUPABASE_AUDIO_BASE + '/' + filePath
}

// ============================================================
// EARLY YEARS (ages 4-7) - Course IDs: c26, c27, c28, c29, c30
// ============================================================

// ============================================================
// JUNIOR (ages 8-11) - Course IDs: c1, c2, c3, c4, c5
// ============================================================

const SONGS = {

  // ─── Early Years: Road and Outdoor Safety (c26) ───
  'c26': {
    lessons: [
      // Lesson 0: Crossing Roads Safely
      { title: '', file: '', lyrics: '' },
      // Lesson 1: Playing Outdoors Safely
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Early Years: Anti-Bullying and Kindness (c27) ───
  'c27': {
    lessons: [
      // Lesson 0: What is Bullying?
      { title: '', file: '', lyrics: '' },
      // Lesson 1: Different Kinds of Bullying
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Early Years: Online Safety (c28) ───
  'c28': {
    lessons: [
      // Lesson 0: What is the Internet?
      { title: '', file: '', lyrics: '' },
      // Lesson 1: Keeping Your Name and Details Private
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Early Years: Stranger Danger (c29) ───
  'c29': {
    lessons: [
      // Lesson 0: What is a Stranger?
      { title: '', file: '', lyrics: '' },
      // Lesson 1: Who are Your Safe Grown-ups?
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Early Years: Body Safety and Consent (c30) ───
  'c30': {
    lessons: [
      // Lesson 0: Your Body Belongs to You
      { title: '', file: '', lyrics: '' },
      // Lesson 1: Private Parts are Private
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Junior: Road and Outdoor Safety (c1) ───
  'c1': {
    lessons: [
      // Lesson 0: Crossing Roads Safely and Being Seen by Drivers
      { title: '', file: '', lyrics: '' },
      // Lesson 1: Cycling Safely
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Junior: Anti-Bullying (c2) ───
  'c2': {
    lessons: [
      // Lesson 0: What is Bullying Really?
      { title: '', file: '', lyrics: '' },
      // Lesson 1: What to Do if You're Being Bullied
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Junior: Online Safety (c3) ───
  'c3': {
    lessons: [
      // Lesson 0: What is the Internet and How Does it Work?
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Junior: Stranger Danger (c4) ───
  'c4': {
    lessons: [
      // Lesson 0
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

  // ─── Junior: Body Safety (c5) ───
  'c5': {
    lessons: [
      // Lesson 0
      { title: '', file: '', lyrics: '' },
    ],
    remember: { title: '', file: '', lyrics: '' },
  },

}

export default SONGS
