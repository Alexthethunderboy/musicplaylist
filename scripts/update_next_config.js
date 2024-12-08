const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const nextConfigPath = path.resolve(__dirname, '../next.config.js');

let nextConfig = fs.readFileSync(nextConfigPath, 'utf8');

// Update the RAPIDAPI_KEY
nextConfig = nextConfig.replace(
  /NEXT_PUBLIC_RAPIDAPI_KEY: .*,/,
  `NEXT_PUBLIC_RAPIDAPI_KEY: '${process.env.RAPIDAPI_KEY}',`
);

// Update the FRONTEND_URL
nextConfig = nextConfig.replace(
  /NEXT_PUBLIC_FRONTEND_URL: .*,/,
  `NEXT_PUBLIC_FRONTEND_URL: '${process.env.FRONTEND_URL || 'http://localhost:3000'}',`
);

fs.writeFileSync(nextConfigPath, nextConfig);

console.log('next.config.js has been updated with the latest environment variables.');

