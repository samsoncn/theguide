# import app object from src/pages/app/app.py
from app.app import app
import uvicorn
import os

# Get the port from the environment variables.
port = int(os.getenv("PORT", "5566"))

# Run the app on the port. host is 0.0.0.0 because we want to run it on the public ip address (docker).
uvicorn.run(app, host="0.0.0.0", port=port)