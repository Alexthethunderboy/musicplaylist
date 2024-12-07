from backend.app.main import app
from mangum import Mangum

# This is for Vercel serverless deployment
handler = Mangum(app)

