export const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

export function getImageDomains() {
  return [
    'i.scdn.co', // Add any domains that host your images
    'seed-mix-image.spotifycdn.com', // Add the new domain
    'mosaic.scdn.co', // Add the new domain
    'image-cdn-ak.spotifycdn.com', // Add the new domain
    'wrapped-images.spotifycdn.com' // Add the new domain
  ];
}
