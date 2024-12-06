#!/bin/bash

# Start the Python backend
echo "Starting Python backend..."
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m app.main &

# Start the Next.js frontend
echo "Starting Next.js frontend..."
cd ..
npm run dev

