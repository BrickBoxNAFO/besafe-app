/**
 * Maps music product IDs to their course IDs.
 * Used by the download API to gather all songs for a purchased collection.
 */

export const MUSIC_PRODUCT_COURSES = {
  'growing-early': ['c26', 'c27', 'c28', 'c29', 'c30', 'c35'],
  'growing-junior': ['c1', 'c2', 'c3', 'c4', 'c5', 'c36', 'c39'],
  'street':         ['c31', 'c32', 'c33', 'c34', 'c37', 'c38'],
  'aging':          ['c16', 'c17', 'c18', 'c19', 'c20'],
  'nest':           ['c6', 'c7', 'c8', 'c9'],
  'roaming':        ['c11', 'c12', 'c13', 'c14', 'c15'],
  'parents':        ['c21', 'c22', 'c23', 'c24', 'c25'],
}

export const MUSIC_PRODUCT_NAMES = {
  'growing-early': 'Growing Minds: Early Years Songs',
  'growing-junior': 'Growing Minds: Junior Songs',
  'street': 'Street Smart Songs',
  'aging': 'Aging Wisdom Songs',
  'nest': 'Nest Breaking Songs',
  'roaming': 'Roaming Free Songs',
  'parents': 'Family Anchor Songs',
}
